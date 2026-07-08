#!/usr/bin/env node
/**
 * Phase 1.1 — SSR audit.
 *
 * Reads the built static HTML for every indexable route (the exact bytes Vercel
 * serves to a no-JS crawler / curl), counts crawler-visible words, and writes
 * docs/SSR_AUDIT.md as a table of: route | ssr_words | status.
 *
 * Run after `npm run build`:  node scripts/audit-ssr.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fixedRouteMeta, canonicalUrl, SITE } from "./static-page-meta.mjs";
import { collectBlogRouteMeta } from "./blog-data-sources.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const MIN_WORDS = 400;
const LEGAL_ROUTES = new Set([
  "/privacy-policy",
  "/cookie-policy",
  "/terms-and-conditions",
  "/disclaimer",
]);

function loadWheelSlugs() {
  const p = path.join(root, "src", "generated", "wheelPages.json");
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf-8")).map((w) => w.slug);
}

function routeFile(route) {
  return route === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, route, "index.html");
}

function visibleWords(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "";
  const text = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").length : 0;
}

const routes = [
  ...fixedRouteMeta.map((r) => r.path),
  ...collectBlogRouteMeta(root, { canonicalUrl, SITE }).map((r) => r.path),
  ...loadWheelSlugs().map((s) => `/${s}`),
];

const rows = [];
let missing = 0;
let below = 0;

for (const route of routes) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) {
    rows.push({ route, words: 0, status: "MISSING" });
    missing++;
    continue;
  }
  const words = visibleWords(fs.readFileSync(file, "utf8"));
  let status;
  if (words >= MIN_WORDS) status = "PASS";
  else if (LEGAL_ROUTES.has(route)) status = "PASS (legal)";
  else {
    status = "BELOW 400";
    below++;
  }
  rows.push({ route, words, status });
}

const now = new Date().toISOString().slice(0, 10);
const lines = [];
lines.push("# SSR Content Audit");
lines.push("");
lines.push(
  `Generated ${now} from built \`dist/\` HTML — the exact bytes served to a` +
    " no-JS crawler (equivalent to `curl` against production).",
);
lines.push("");
lines.push(`- Routes audited: **${routes.length}**`);
lines.push(`- Threshold: **${MIN_WORDS}** crawler-visible words`);
lines.push(`- Below threshold: **${below}**, Missing HTML: **${missing}**`);
lines.push("");
lines.push("| route | ssr_words | status |");
lines.push("| --- | ---: | --- |");
for (const r of rows) {
  lines.push(`| \`${r.route}\` | ${r.words} | ${r.status} |`);
}
lines.push("");

const outPath = path.join(root, "docs", "SSR_AUDIT.md");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");

console.log(`SSR audit written to docs/SSR_AUDIT.md`);
console.log(
  `Routes: ${routes.length} | below 400: ${below} | missing: ${missing}`,
);

if (missing > 0 || below > 0) {
  console.error(
    "Some routes are missing HTML or below the 400-word SSR threshold.",
  );
  process.exit(1);
}
console.log("All indexable routes meet the SSR word threshold.");
