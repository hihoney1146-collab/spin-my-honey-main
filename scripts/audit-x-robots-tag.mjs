#!/usr/bin/env node
/**
 * Fail if X-Robots-Tag: noindex is mis-scoped — especially on /ads.txt or indexable routes.
 * Also verifies dist HTML robots meta when dist/ exists.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectIndexableRoutes } from "./route-registry.mjs";
import {
  ROOT_CRAWLER_PATHS,
  NOINDEX_WHEEL_SLUGS,
  LEGACY_NOINDEX_PATHS,
  NOINDEX_BLOG_SLUGS,
  auditSamplePaths,
} from "./robots-header-policy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const vercelPath = path.join(root, "vercel.json");
const adsApiPath = path.join(root, "api", "ads.js");
const outPath = path.join(root, "docs", "X_ROBOTS_AUDIT.md");

const args = new Set(process.argv.slice(2));
const checkDist = args.has("--dist") || fs.existsSync(dist);
const liveFetch = args.has("--live") || process.env.AUDIT_X_ROBOTS_LIVE === "1";
const ORIGIN = process.env.SITE_ORIGIN || "https://onlinespinwheel.fun";

const MUST_NOT_NOINDEX = new Set([
  ...ROOT_CRAWLER_PATHS,
  "/",
  ...collectIndexableRoutes(root).map((r) => r.path),
]);

const MUST_NOINDEX = new Set([
  ...NOINDEX_WHEEL_SLUGS.map((s) => `/${s}`),
  ...LEGACY_NOINDEX_PATHS,
  ...NOINDEX_BLOG_SLUGS.map((s) => `/blog/${s}`),
]);

function headerHasNoindex(headers) {
  const tag = headers?.find((h) => h.key?.toLowerCase() === "x-robots-tag");
  return tag?.value?.toLowerCase().includes("noindex") ?? false;
}

function htmlHasNoindexMeta(html) {
  return /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
}

const issues = [];
const notes = [];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function auditVercelConfig() {
  if (!fs.existsSync(vercelPath)) {
    issues.push("vercel.json missing");
    return;
  }
  const cfg = readJson(vercelPath);
  for (const block of cfg.headers ?? []) {
    if (!headerHasNoindex(block.headers)) continue;
    if (block.source.includes("ads.txt") || block.source === "/ads.txt") {
      issues.push(
        `vercel.json explicitly sets X-Robots-Tag noindex on ads.txt (source: ${block.source})`,
      );
    }
    for (const protectedPath of ROOT_CRAWLER_PATHS) {
      const bare = protectedPath.replace(/^\//, "");
      if (
        block.source === bare ||
        block.source === protectedPath ||
        (block.source.includes("ads.txt") && protectedPath === "/ads.txt")
      ) {
        issues.push(
          `vercel.json headers source "${block.source}" sets X-Robots-Tag noindex on crawler path ${protectedPath}`,
        );
      }
    }
  }
}

function auditAdsApi() {
  if (!fs.existsSync(adsApiPath)) return;
  const src = fs.readFileSync(adsApiPath, "utf8");
  if (/X-Robots-Tag.*noindex/i.test(src)) {
    issues.push("api/ads.js sets X-Robots-Tag: noindex — AdSense crawlers must not see this");
  }
}

function htmlPathFor(routePath) {
  return routePath === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, routePath.replace(/^\//, ""), "index.html");
}

function auditDistMeta() {
  if (!checkDist || !fs.existsSync(dist)) {
    notes.push("dist/ not present — skipped HTML robots meta checks");
    return;
  }

  for (const routePath of MUST_NOT_NOINDEX) {
    const file = htmlPathFor(routePath);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (htmlHasNoindexMeta(html)) {
      issues.push(`dist HTML ${routePath} has meta robots noindex but route is indexable/crawler`);
    }
  }

  for (const routePath of MUST_NOINDEX) {
    const file = htmlPathFor(routePath);
    if (!fs.existsSync(file)) {
      notes.push(`dist missing prerender for noindex route ${routePath} (SPA may still set meta client-side)`);
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    if (!htmlHasNoindexMeta(html)) {
      issues.push(`dist HTML ${routePath} missing meta robots noindex`);
    }
  }

  const resultHtml = htmlPathFor("/result");
  if (fs.existsSync(resultHtml)) {
    const html = fs.readFileSync(resultHtml, "utf8");
    if (!htmlHasNoindexMeta(html)) {
      issues.push("dist HTML /result missing meta robots noindex");
    }
  }
}

async function auditLiveHeaders() {
  if (!liveFetch) {
    notes.push("live header fetch skipped (pass --live or AUDIT_X_ROBOTS_LIVE=1)");
    return;
  }

  const samples = auditSamplePaths();
  const noindexSamples = new Set([
    "/random-country-wheel",
    "/result/test",
    "/embed/random-name-picker-wheel",
  ]);

  for (const p of samples) {
    try {
      const res = await fetch(`${ORIGIN}${p}`, {
        redirect: "follow",
        headers: { "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" },
      });
      const tag = res.headers.get("x-robots-tag") ?? "";
      const hasNoindex = tag.toLowerCase().includes("noindex");

      if (MUST_NOT_NOINDEX.has(p) && hasNoindex) {
        issues.push(`LIVE ${p}: X-Robots-Tag contains noindex (${tag})`);
      }
      if (noindexSamples.has(p) && !hasNoindex) {
        const file = htmlPathFor(p);
        if (fs.existsSync(file) && htmlHasNoindexMeta(fs.readFileSync(file, "utf8"))) {
          notes.push(`LIVE ${p}: no X-Robots-Tag header (noindex via HTML meta only)`);
        } else {
          issues.push(`LIVE ${p}: expected noindex signal missing (header and dist meta)`);
        }
      }
    } catch (err) {
      notes.push(`LIVE fetch ${p} failed: ${err.message}`);
    }
  }
}

auditVercelConfig();
auditAdsApi();
auditDistMeta();
await auditLiveHeaders();

const lines = [
  "# X-Robots-Tag audit",
  "",
  `- Config issues: **${issues.length}**`,
  `- Notes: ${notes.length}`,
  "",
];

if (issues.length) {
  lines.push("## Failures");
  for (const i of issues) lines.push(`- ${i}`);
} else {
  lines.push("**PASS**, no mis-scoped X-Robots-Tag noindex in config or indexable dist HTML.");
}

if (notes.length) {
  lines.push("");
  lines.push("## Notes");
  for (const n of notes) lines.push(`- ${n}`);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log(`X-Robots-Tag audit: ${issues.length} issue(s) → docs/X_ROBOTS_AUDIT.md`);

if (issues.length) {
  console.error("X-Robots-Tag audit FAILED");
  process.exit(1);
}
console.log("PASS: X-Robots-Tag scope clean.");
