#!/usr/bin/env node
/**
 * Duplicate-sentence scan across prerendered HTML.
 * Flags any sentence (>8 words) that appears verbatim on two or more indexable routes.
 *
 * Usage (after build):  node scripts/dup-check.mjs
 * Output: docs/DUP_CHECK.md + exit 1 on duplicates
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectIndexableRoutes } from "./route-registry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const MIN_WORDS = 9; // "more than 8 words" => >= 9

function routeFile(routePath) {
  return routePath === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, routePath, "index.html");
}

function extractSeoText(html) {
  let main =
    html.match(/<main[^>]*data-static-seo[^>]*>([\s\S]*?)<\/main>/i)?.[1] ||
    html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ||
    "";
  // Drop site-wide footer nav duplicated on every page.
  main = main.replace(/<nav[^>]*aria-label=["']Explore more["'][\s\S]*?<\/nav>/i, "");
  return main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[""''']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const routes = collectIndexableRoutes(root).map((r) => r.path);
/** @type {Map<string, { sentence: string; routes: Set<string> }>} */
const index = new Map();

for (const route of routes) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) continue;
  const text = extractSeoText(fs.readFileSync(file, "utf8"));
  const seenOnRoute = new Set();
  for (const raw of splitSentences(text)) {
    const norm = normalize(raw);
    const wc = norm.split(/\s+/).filter(Boolean).length;
    if (wc < MIN_WORDS) continue;
    // Author byline repeated on specialty wheel pages.
    if (/^reviewed by raja jahangir/i.test(norm)) continue;
    if (seenOnRoute.has(norm)) continue;
    seenOnRoute.add(norm);
    const entry = index.get(norm) || { sentence: raw, routes: new Set() };
    entry.routes.add(route);
    index.set(norm, entry);
  }
}

const duplicates = [...index.values()]
  .filter((e) => e.routes.size >= 2)
  .sort((a, b) => b.routes.size - a.routes.size || a.sentence.localeCompare(b.sentence));

const now = new Date().toISOString().slice(0, 10);
const lines = [
  "# Duplicate Sentence Scan",
  "",
  `Generated ${now} from \`dist/\` prerendered HTML (${routes.length} indexable routes).`,
  "",
  `Rule: flag sentences with **≥ ${MIN_WORDS} words** shared verbatim between **≥ 2** pages.`,
  "",
  `- Duplicate sentences found: **${duplicates.length}**`,
  "",
];

if (duplicates.length === 0) {
  lines.push("**PASS** — no duplicate long sentences across indexable routes.");
} else {
  lines.push("| routes | words | sentence (truncated) |");
  lines.push("| --- | ---: | --- |");
  for (const dup of duplicates.slice(0, 200)) {
    const routeList = [...dup.routes].sort().join(", ");
    const wc = normalize(dup.sentence).split(/\s+/).length;
    const preview =
      dup.sentence.length > 120 ? `${dup.sentence.slice(0, 117)}…` : dup.sentence;
    lines.push(`| \`${routeList}\` | ${wc} | ${preview.replace(/\|/g, "\\|")} |`);
  }
  if (duplicates.length > 200) {
    lines.push("");
    lines.push(`_… and ${duplicates.length - 200} more._`);
  }
}

lines.push("");
const outPath = path.join(root, "docs", "DUP_CHECK.md");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");

console.log(`Duplicate scan: ${duplicates.length} shared sentences → docs/DUP_CHECK.md`);

if (duplicates.length > 0) {
  console.error(`${duplicates.length} duplicate sentence(s) exceed the 8-word threshold.`);
  process.exit(1);
}
console.log("PASS: no duplicate long sentences.");
