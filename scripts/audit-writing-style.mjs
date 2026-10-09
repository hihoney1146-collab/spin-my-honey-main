#!/usr/bin/env node
/**
 * Writing-style audit (advisory, not part of prebuild).
 *
 * Reads the built HTML in dist/ for every sitemap route and reports, per page:
 *   - em dashes (U+2014) and en dashes (U+2013) in visible text, title and meta description
 *   - phrases that commonly make copy read as machine-written
 *
 * It cannot tell whether a page "sounds human". It only finds mechanical tells so a person can edit them.
 *
 * Usage (after a build):  node scripts/audit-writing-style.mjs [--json out.json] [--strict] [--top N]
 *   --strict  exit 1 when any hit exists (default exit 0)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectIndexableRoutes } from "./route-registry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const jsonIdx = args.indexOf("--json");
const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : null;
const topIdx = args.indexOf("--top");
const top = topIdx >= 0 ? Number(args[topIdx + 1]) || 15 : 15;

const EM = "—";
const EN = "–";

/** Whole-word / phrase tells. Kept small and specific on purpose; extend in references/writing-voice.md too. */
const TELLS = [
  "delve", "tapestry", "digital landscape", "ever-evolving", "fast-paced world", "in today's fast-paced",
  "in the realm of", "it's important to note", "it is important to note", "it's worth noting", "it is worth noting",
  "ultimate guide", "comprehensive guide", "look no further", "say goodbye", "take it to the next level",
  "game-changer", "game changer", "revolutionize", "cutting-edge", "state-of-the-art", "unlock the", "unleash",
  "elevate your", "seamless", "seamlessly", "robust", "leverage", "harness the", "dive into", "deep dive",
  "plethora", "myriad", "testament to", "embark", "paramount", "pivotal", "moreover", "furthermore",
  "in conclusion", "to sum up", "at the end of the day", "more than just", "empower", "streamline",
  "supercharge", "holistic", "synergy", "whether you're", "whether you are", "not just", "stands out",
  "a wide range of", "vibrant", "meticulous", "intricate", "navigate the", "journey",
];

function routeFile(route) {
  return route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
}
const strip = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&mdash;|&#8212;|&#x2014;/gi, EM)
    .replace(/&ndash;|&#8211;|&#x2013;/gi, EN)
    .replace(/\s+/g, " ")
    .trim();

const count = (s, ch) => s.split(ch).length - 1;

const routes = collectIndexableRoutes(root).map((r) => r.path);
const rows = [];
for (const route of routes) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const main = html.match(/<main[^>]*id=["']main-content["'][^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const text = strip(main);
  const title = strip(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] ?? "";
  const lower = text.toLowerCase();
  const hits = {};
  for (const t of TELLS) {
    const re = new RegExp(`(^|[^a-z])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`, "g");
    const n = (lower.match(re) || []).length;
    if (n) hits[t] = n;
  }
  rows.push({
    route,
    words: text ? text.split(" ").length : 0,
    emDashes: count(text, EM),
    enDashes: count(text, EN),
    titleDash: count(title, EM) + count(title, EN),
    metaDash: count(desc, EM) + count(desc, EN),
    tells: hits,
    tellTotal: Object.values(hits).reduce((a, b) => a + b, 0),
  });
}

const total = (k) => rows.reduce((s, r) => s + r[k], 0);
const flagged = rows.filter((r) => r.emDashes || r.enDashes || r.titleDash || r.metaDash || r.tellTotal);
console.log(`Writing-style audit: ${rows.length} routes, ${flagged.length} with at least one hit`);
console.log(`  em dashes: ${total("emDashes")}   en dashes: ${total("enDashes")}   in titles/meta: ${total("titleDash") + total("metaDash")}   tell phrases: ${total("tellTotal")}`);
console.log(`\nTop ${top} pages by hits (em + en dashes + tell phrases):`);
flagged
  .sort((a, b) => b.emDashes + b.enDashes + b.tellTotal - (a.emDashes + a.enDashes + a.tellTotal))
  .slice(0, top)
  .forEach((r) => {
    const t = Object.entries(r.tells).map(([k, v]) => `${k}x${v}`).join(", ");
    console.log(`  ${String(r.emDashes).padStart(3)} em ${String(r.enDashes).padStart(3)} en ${String(r.tellTotal).padStart(3)} tells  ${r.route}${t ? "   [" + t + "]" : ""}`);
  });

if (jsonOut) {
  fs.mkdirSync(path.dirname(path.resolve(jsonOut)), { recursive: true });
  fs.writeFileSync(jsonOut, JSON.stringify({ generated: new Date().toISOString(), rows }, null, 2));
  console.log(`\nJSON written to ${jsonOut}`);
}
if (strict && flagged.length) process.exit(1);
