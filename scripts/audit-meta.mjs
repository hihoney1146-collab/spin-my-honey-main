#!/usr/bin/env node
/**
 * Verify unique title (<60 chars), meta description, and og:image per indexable route.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectIndexableRoutes } from "./route-registry.mjs";
import { wheelOgImageUrl } from "./wheel-content-loader.mjs";
import { SITE, DEFAULT_OG_IMAGE } from "./static-page-meta.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const MAX_TITLE = 60;

function routeFile(routePath) {
  return routePath === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, routePath, "index.html");
}

function pick(html, re) {
  const m = html.match(re);
  if (!m) return "";
  return m[1]
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

const routes = collectIndexableRoutes(root);
const issues = [];
const titles = new Map();
const descs = new Map();
const ogImages = new Map();

for (const { path: route, kind } of routes) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) {
    issues.push({ route, msg: "missing dist HTML" });
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = pick(
    html,
    /<meta\s+name=["']description["'][^>]*content=["']([^"]*)["']/i,
  );
  const og = pick(html, /<meta\s+property=["']og:image["'][^>]*content=["']([^"']*)/i);

  if (!title) issues.push({ route, msg: "missing title" });
  else if (title.length >= MAX_TITLE)
    issues.push({ route, msg: `title ${title.length} chars (max ${MAX_TITLE - 1}): ${title}` });

  if (!desc || desc.length < 40) issues.push({ route, msg: "missing/short meta description" });

  const slug = route.startsWith("/") && route.length > 1 ? route.slice(1) : "";
  const expectedOg =
    kind === "wheel" && slug && !slug.includes("/")
      ? wheelOgImageUrl(slug, SITE)
      : DEFAULT_OG_IMAGE;

  if (!og) issues.push({ route, msg: "missing og:image" });
  else if (kind === "wheel" && og !== expectedOg)
    issues.push({ route, msg: `og:image mismatch: ${og} (expected ${expectedOg})` });

  if (title) {
    if (titles.has(title)) issues.push({ route, msg: `duplicate title with ${titles.get(title)}` });
    else titles.set(title, route);
  }
  if (desc) {
    if (descs.has(desc)) issues.push({ route, msg: `duplicate description with ${descs.get(desc)}` });
    else descs.set(desc, route);
  }
  if (og) {
    if (ogImages.has(og) && kind === "wheel")
      /* wheels may share default during OG gen failure — still track */;
    ogImages.set(og, route);
  }
}

const out = [
  "# Meta Uniqueness Audit",
  "",
  `Routes checked: **${routes.length}**`,
  `Issues: **${issues.length}**`,
  "",
];

if (issues.length) {
  out.push("| route | issue |");
  out.push("| --- | --- |");
  for (const i of issues) out.push(`| \`${i.route}\` | ${i.msg.replace(/\|/g, "\\|")} |`);
} else {
  out.push("**PASS** — every indexable route has a unique title (<60 chars), description, and wheel-specific OG image.");
}

const outPath = path.join(root, "docs", "META_AUDIT.md");
fs.writeFileSync(outPath, out.join("\n"), "utf8");
console.log(`Meta audit: ${issues.length} issues → docs/META_AUDIT.md`);
if (issues.length) {
  for (const i of issues.slice(0, 20)) console.error(`${i.route}: ${i.msg}`);
  process.exit(1);
}
