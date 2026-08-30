#!/usr/bin/env node
/**
 * Fail when any indexed wheel lacks a bulk placeholder or two routes share
 * the same sample text (excluding the generic homepage fallback).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isWheelIndexableSlug } from "./wheel-index-policy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TS_FILE = path.join(root, "src", "data", "wheelBulkPlaceholders.ts");
const WHEEL_PAGES = path.join(root, "src", "generated", "wheelPages.json");

const MAX_ENTRY_TEXT_LEN = 20;
const MIN_SAMPLE_LINES = 4;
const MAX_SAMPLE_LINES = 6;

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

function loadPlaceholders() {
  const src = fs.readFileSync(TS_FILE, "utf8");
  const lit = extractLiteral(src, "WHEEL_BULK_PLACEHOLDERS", "{", "}");
  if (!lit) {
    throw new Error(`Could not parse WHEEL_BULK_PLACEHOLDERS in ${TS_FILE}`);
  }
  return new Function(`"use strict";return (${lit});`)();
}

const wheelPages = JSON.parse(fs.readFileSync(WHEEL_PAGES, "utf8"));
const indexedSlugs = wheelPages
  .map((p) => p.slug)
  .filter((slug) => isWheelIndexableSlug(slug))
  .sort();

const placeholders = loadPlaceholders();
const issues = [];

for (const slug of indexedSlugs) {
  if (!placeholders[slug]) {
    issues.push(`${slug}: missing in WHEEL_BULK_PLACEHOLDERS`);
  }
}

const sampleToSlugs = new Map();
for (const [slug, cfg] of Object.entries(placeholders)) {
  if (!cfg?.sample || !cfg?.hint) {
    issues.push(`${slug}: must define sample and hint`);
    continue;
  }
  const lines = cfg.sample.split("\n");
  if (lines.length < MIN_SAMPLE_LINES || lines.length > MAX_SAMPLE_LINES) {
    issues.push(
      `${slug}: sample must be ${MIN_SAMPLE_LINES}-${MAX_SAMPLE_LINES} lines (has ${lines.length})`,
    );
  }
  for (const line of lines) {
    if (line.length > MAX_ENTRY_TEXT_LEN) {
      issues.push(
        `${slug}: sample line "${line}" exceeds ${MAX_ENTRY_TEXT_LEN} characters`,
      );
    }
  }
  const list = sampleToSlugs.get(cfg.sample) ?? [];
  list.push(slug);
  sampleToSlugs.set(cfg.sample, list);
}

for (const [sample, slugs] of sampleToSlugs) {
  if (slugs.length > 1) {
    issues.push(`duplicate sample shared by: ${slugs.join(", ")}`);
  }
}

if (issues.length) {
  console.error("Bulk-placeholder audit: FAIL");
  for (const issue of issues) {
    console.error(`  - ${issue}`);
  }
  process.exit(1);
}

console.log(
  `Bulk-placeholder audit: PASS (${indexedSlugs.length} indexed wheels, unique samples)`,
);
