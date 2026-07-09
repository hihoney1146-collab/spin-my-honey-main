#!/usr/bin/env node
/**
 * JSON-LD validation: parse all blocks, ban Review/AggregateRating on tool routes,
 * flag Auroxa Tech references in structured data.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectIndexableRoutes } from "./route-registry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const BANNED_TYPES = new Set(["Review", "AggregateRating"]);

function routeFile(routePath) {
  return routePath === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, routePath, "index.html");
}

function jsonLdBlocks(html) {
  return [
    ...html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((m) => m[1].trim());
}

function walkTypes(node, types = new Set()) {
  if (!node || typeof node !== "object") return types;
  if (Array.isArray(node)) {
    for (const item of node) walkTypes(item, types);
    return types;
  }
  if (node["@type"]) {
    const t = node["@type"];
    if (Array.isArray(t)) t.forEach((x) => types.add(x));
    else types.add(t);
  }
  for (const v of Object.values(node)) {
    if (v && typeof v === "object") walkTypes(v, types);
  }
  return types;
}

const routes = collectIndexableRoutes(root);
const issues = [];

for (const { path: route, kind } of routes) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const rawBlocks = jsonLdBlocks(html);

  if (rawBlocks.length === 0) {
    issues.push({ route, msg: "no JSON-LD blocks" });
    continue;
  }

  for (let i = 0; i < rawBlocks.length; i++) {
    let parsed;
    try {
      parsed = JSON.parse(rawBlocks[i]);
    } catch (e) {
      issues.push({ route, msg: `JSON-LD block ${i + 1} invalid: ${e.message}` });
      continue;
    }
    const items = Array.isArray(parsed) ? parsed : [parsed];
    for (const item of items) {
      const types = walkTypes(item);
      if (/auroxa/i.test(JSON.stringify(item))) {
        issues.push({ route, msg: "Auroxa Tech reference in JSON-LD" });
      }
      if (kind === "wheel" || route === "/") {
        for (const t of types) {
          if (BANNED_TYPES.has(t)) {
            issues.push({ route, msg: `banned @type ${t} on tool/home route` });
          }
        }
      }
    }
  }
}

const out = [
  "# JSON-LD Audit",
  "",
  `Routes checked: **${routes.length}**`,
  `Issues: **${issues.length}**`,
  "",
];

if (issues.length) {
  out.push("| route | issue |");
  out.push("| --- | --- |");
  for (const i of issues) out.push(`| \`${i.route}\` | ${i.msg} |`);
} else {
  out.push("**PASS** — all JSON-LD parses; no Review/AggregateRating on tools; no Auroxa references.");
}

fs.writeFileSync(path.join(root, "docs", "JSONLD_AUDIT.md"), out.join("\n"), "utf8");
console.log(`JSON-LD audit: ${issues.length} issues`);
if (issues.length) process.exit(1);
