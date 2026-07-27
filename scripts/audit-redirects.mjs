#!/usr/bin/env node
/**
 * Redirect / sitemap / llms.txt consistency audit + single-hop chain check.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  REDIRECT_PATHS,
  REDIRECT_MAP,
  collectIndexableRoutes,
} from "./route-registry.mjs";
import { SITE } from "./seo-routes.mjs";
import { NOINDEX_WHEEL_SET } from "./wheel-index-policy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const issues = [];

function readXmlLocs(file) {
  const body = fs.readFileSync(file, "utf8");
  return [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function pathFromLoc(loc) {
  return loc.replace(SITE, "") || "/";
}

// Sitemaps
const sitemapFiles = [
  "public/pages-sitemap.xml",
  "public/wheels-sitemap.xml",
  "public/blog-sitemap.xml",
];
const allLocs = [];
for (const f of sitemapFiles) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) {
    issues.push(`${f}: missing`);
    continue;
  }
  allLocs.push(...readXmlLocs(p));
}

for (const loc of allLocs) {
  const p = pathFromLoc(loc);
  if (REDIRECT_PATHS.has(p)) issues.push(`sitemap lists redirect path ${p}`);
  const slug = p.replace(/^\//, "");
  if (NOINDEX_WHEEL_SET.has(slug)) {
    issues.push(`sitemap lists noindex wheel ${p}`);
  }
}

// llms.txt, only flag standalone URL lines, not substrings like /privacy-policy
const llms = fs.readFileSync(path.join(root, "public", "llms.txt"), "utf8");
const llmsLines = llms.split(/\r?\n/).map((l) => l.trim());
for (const rp of REDIRECT_PATHS) {
  const bad = llmsLines.some(
    (line) =>
      line === `${SITE}${rp}` ||
      line.startsWith(`${SITE}${rp} `) ||
      line.startsWith(`${SITE}${rp}\t`) ||
      line.startsWith(`${SITE}${rp}, `),
  );
  if (bad) issues.push(`llms.txt lists redirect path ${rp}`);
}
for (const slug of NOINDEX_WHEEL_SET) {
  const p = `/${slug}`;
  const bad = llmsLines.some(
    (line) =>
      line === `${SITE}${p}` ||
      line.startsWith(`${SITE}${p} `) ||
      line.startsWith(`${SITE}${p}\t`) ||
      line.startsWith(`${SITE}${p}, `),
  );
  if (bad) issues.push(`llms.txt lists noindex wheel ${p}`);
}

// Required featured pages (prize-wheel merged into raffle)
const required = [
  "/raffle-wheel",
  "/classroom-spinner",
  "/wheel-of-names-alternative",
  "/spin-wheel-fairness-study",
];
const indexable = new Set(collectIndexableRoutes(root).map((r) => r.path));
for (const r of required) {
  if (!indexable.has(r)) issues.push(`missing from indexable routes: ${r}`);
  if (!allLocs.some((loc) => pathFromLoc(loc) === r)) {
    issues.push(`missing from child sitemaps: ${r}`);
  }
}

// Single-hop chain audit: every redirect destination must not itself redirect
for (const [src, dest] of Object.entries(REDIRECT_MAP)) {
  if (REDIRECT_MAP[dest] || REDIRECT_PATHS.has(dest)) {
    const next = REDIRECT_MAP[dest] || "(in REDIRECT_PATHS)";
    issues.push(
      `redirect chain: ${src} → ${dest} → ${next} (must be exactly one hop)`,
    );
  }
}

// vercel.json must match REDIRECT_MAP for wheel/legacy paths (spot-check file)
const vercelPath = path.join(root, "vercel.json");
if (fs.existsSync(vercelPath)) {
  const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
  const edge = new Map(
    (vercel.redirects || [])
      .filter((r) => r.source && r.destination && !r.has)
      .map((r) => [
        r.source.startsWith("/") ? r.source : `/${r.source}`,
        r.destination.replace(/^https:\/\/onlinespinwheel\.fun/, "") || "/",
      ]),
  );
  for (const [src, dest] of edge) {
    if (edge.has(dest)) {
      issues.push(
        `vercel.json chain: ${src} → ${dest} → ${edge.get(dest)} (one hop only)`,
      );
    }
    const expected = REDIRECT_MAP[src];
    if (expected && expected !== dest) {
      issues.push(
        `vercel.json mismatch for ${src}: edge=${dest} registry=${expected}`,
      );
    }
  }
}

const out = [
  "# Redirect & Sitemap Consistency",
  "",
  `Issues: **${issues.length}**`,
  "",
];
if (issues.length) {
  for (const i of issues) out.push(`- ${i}`);
} else {
  out.push(
    "**PASS**, no redirect paths or noindex wheels in sitemaps/llms.txt; all redirects are single-hop; featured pages indexed.",
  );
}
fs.writeFileSync(path.join(root, "docs", "REDIRECT_AUDIT.md"), out.join("\n"), "utf8");
console.log(`Redirect audit: ${issues.length} issues`);
if (issues.length) process.exit(1);
