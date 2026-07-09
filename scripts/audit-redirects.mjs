#!/usr/bin/env node
/**
 * Redirect / sitemap / llms.txt consistency audit.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { REDIRECT_PATHS, collectIndexableRoutes } from "./route-registry.mjs";
import { SITE } from "./seo-routes.mjs";

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
}

// llms.txt — only flag standalone URL lines, not substrings like /privacy-policy
const llms = fs.readFileSync(path.join(root, "public", "llms.txt"), "utf8");
const llmsLines = llms.split(/\r?\n/).map((l) => l.trim());
for (const rp of REDIRECT_PATHS) {
  const bad = llmsLines.some(
    (line) =>
      line === `${SITE}${rp}` ||
      line.startsWith(`${SITE}${rp} `) ||
      line.startsWith(`${SITE}${rp}\t`) ||
      line.startsWith(`${SITE}${rp}—`),
  );
  if (bad) issues.push(`llms.txt lists redirect path ${rp}`);
}

// Required new pages
const required = [
  "/raffle-wheel",
  "/prize-wheel",
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

const out = [
  "# Redirect & Sitemap Consistency",
  "",
  `Issues: **${issues.length}**`,
  "",
];
if (issues.length) {
  for (const i of issues) out.push(`- ${i}`);
} else {
  out.push("**PASS** — no redirect paths in sitemaps/llms.txt; all Phase 6+ pages indexed.");
}
fs.writeFileSync(path.join(root, "docs", "REDIRECT_AUDIT.md"), out.join("\n"), "utf8");
console.log(`Redirect audit: ${issues.length} issues`);
if (issues.length) process.exit(1);
