#!/usr/bin/env node
/**
 * Validate built static HTML has crawler-visible content.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const requiredRoutes = [
  "/",
  "/all-spin-wheels",
  "/blog",
  "/blog/random-name-picker-fair-fun-easy",
  "/random-name-picker-wheel",
  "/yes-or-no-wheel",
];

let failed = 0;

function routeFile(route) {
  return route === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, route, "index.html");
}

function visibleBodyText(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "";
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleText(html) {
  return (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "")
    .replace(/\s+/g, " ")
    .trim();
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .map((raw) => JSON.parse(raw));
}

function fail(route, message) {
  console.error(`FAIL ${route}: ${message}`);
  failed++;
}

console.log("=== SEO HTML ===\n");

for (const route of requiredRoutes) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) {
    fail(route, "missing built HTML file");
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const title = titleText(html);
  const text = visibleBodyText(html);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const linkCount = (html.match(/<a\b[^>]*href=/gi) || []).length;
  const hasCanonical = /<link\s+rel=["']canonical["'][^>]+href=["']https:\/\/onlinespinwheel\.fun/gi.test(html);
  const hasDescription = /<meta\s+name=["']description["'][^>]+content=(["'])(?=.{40,})[\s\S]*?\1/gi.test(html);

  if (title.length === 0) fail(route, "missing title");
  if (title.length > 65) fail(route, `title too long (${title.length} chars): ${title}`);
  if (!hasCanonical) fail(route, "missing canonical URL");
  if (!hasDescription) fail(route, "missing useful meta description");
  if (h1Count < 1) fail(route, "missing raw HTML H1");
  if (text.length < 350) fail(route, `raw body text too short (${text.length} chars)`);
  if (linkCount < 3) fail(route, `too few raw HTML links (${linkCount})`);

  try {
    const blocks = jsonLdBlocks(html);
    if (blocks.length < 1) fail(route, "missing JSON-LD");
  } catch (error) {
    fail(route, `invalid JSON-LD: ${error.message}`);
  }

  console.log(`OK  ${route}`);
  console.log(`    Title: ${title.length} chars`);
  console.log(`    Body text: ${text.length} chars`);
  console.log(`    H1: ${h1Count}, links: ${linkCount}`);
}

if (failed > 0) {
  console.error(`\n${failed} SEO HTML check(s) failed.`);
  process.exit(1);
}

console.log("\nAll SEO HTML checks passed.");
