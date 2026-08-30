#!/usr/bin/env node
/**
 * Fail when src/data/wheelModeFeatures.ts and scripts/static-content.mjs
 * WHEEL_MODE_FEATURES twins diverge for any slug.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TS_FILE = path.join(root, "src", "data", "wheelModeFeatures.ts");
const STATIC_FILE = path.join(root, "scripts", "static-content.mjs");

function extractLiteral(src, name, open, close) {
  const openEsc = open === "[" ? "\\[" : "\\{";
  const declRe = new RegExp(`${name}\\s*(?::[^=]*)?=\\s*${openEsc}`);
  const m = declRe.exec(src);
  if (!m) return null;
  const start = m.index + m[0].length - 1;
  let depth = 0;
  let inStr = null;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (ch === "\\") {
        i++;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "/" && src[i + 1] === "/") {
      const nl = src.indexOf("\n", i);
      if (nl === -1) break;
      i = nl;
      continue;
    }
    if (ch === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      if (end === -1) break;
      i = end + 1;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inStr = ch;
      continue;
    }
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return null;
}

function loadModeFeatures(filePath, exportName) {
  const src = fs.readFileSync(filePath, "utf8");
  const lit = extractLiteral(src, exportName, "{", "}");
  if (!lit) {
    throw new Error(`Could not parse ${exportName} in ${filePath}`);
  }
  return new Function(`"use strict";return (${lit});`)();
}

const tsFeatures = loadModeFeatures(TS_FILE, "WHEEL_MODE_FEATURES");
const staticFeatures = loadModeFeatures(STATIC_FILE, "WHEEL_MODE_FEATURES");

const slugs = new Set([
  ...Object.keys(tsFeatures),
  ...Object.keys(staticFeatures),
]);

const issues = [];

for (const slug of [...slugs].sort()) {
  const ts = tsFeatures[slug];
  const stat = staticFeatures[slug];
  if (ts === undefined) {
    issues.push(`${slug}: missing in src/data/wheelModeFeatures.ts`);
    continue;
  }
  if (stat === undefined) {
    issues.push(`${slug}: missing in scripts/static-content.mjs WHEEL_MODE_FEATURES`);
    continue;
  }
  if (ts !== stat) {
    issues.push(`${slug}: TS and static twin differ`);
  }
}

if (issues.length) {
  console.error("Mode-feature twin audit: FAIL");
  for (const issue of issues) {
    console.error(`  - ${issue}`);
  }
  process.exit(1);
}

console.log(
  `Mode-feature twin audit: PASS (${slugs.size} slugs synced between TS and static-content.mjs)`,
);
