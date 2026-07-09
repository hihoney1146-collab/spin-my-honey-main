/**
 * Load per-wheel unique SEO content from src/data/wheelUniqueContent.ts
 * (build-time only — mirrors client bundle data).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const UNIQUE_FILE = path.join(root, "src", "data", "wheelUniqueContent.ts");

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

let _cache = null;

/** @returns {Record<string, import('../src/data/wheelUniqueContent.ts').WheelUniqueContent>} */
export function loadWheelUniqueContent() {
  if (_cache) return _cache;
  if (!fs.existsSync(UNIQUE_FILE)) {
    _cache = {};
    return _cache;
  }
  const src = fs.readFileSync(UNIQUE_FILE, "utf8");
  const lit = extractLiteral(src, "WHEEL_UNIQUE_CONTENT", "{", "}");
  if (!lit) {
    console.warn("⚠️  Could not parse WHEEL_UNIQUE_CONTENT");
    _cache = {};
    return _cache;
  }
  try {
    _cache = new Function(`"use strict";return (${lit});`)();
    return _cache;
  } catch (err) {
    console.warn(`⚠️  WHEEL_UNIQUE_CONTENT parse error: ${err.message}`);
    _cache = {};
    return _cache;
  }
}

export function getWheelUniqueContent(slug) {
  return loadWheelUniqueContent()[slug] ?? null;
}

export function wheelOgImagePath(slug) {
  return `/og/${slug}.png`;
}

export function wheelOgImageUrl(slug, site = "https://onlinespinwheel.fun") {
  return `${site}${wheelOgImagePath(slug)}`;
}
