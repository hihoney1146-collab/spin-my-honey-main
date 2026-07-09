/**
 * Phase 7 — reject AI-boilerplate strings in blog source files.
 * Run: npm run lint:blog-copy
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BLOG_DATA_FILES } from "./blog-data-sources.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Banned patterns — headings/openers that read as generic AI filler. */
const BANNED = [
  { pattern: /^\s*Understanding\s+/im, label: 'Heading/opener starting with "Understanding"' },
  { pattern: /^\s*Exploring\s+/im, label: 'Heading/opener starting with "Exploring"' },
  { pattern: /In today['']s fast-paced world/gi, label: '"In today\'s fast-paced world"' },
  { pattern: /In today['']s fast-paced corporate/gi, label: '"In today\'s fast-paced corporate"' },
  { pattern: /In today['']s fast-paced digital/gi, label: '"In today\'s fast-paced digital"' },
  { pattern: /Meet the Maker Behind Online Spin Wheel/g, label: '"Meet the Maker Behind Online Spin Wheel" boilerplate section' },
  { pattern: /Proudly Powered by/g, label: '"Proudly Powered by" footer leak' },
];

let failed = false;

for (const file of [...BLOG_DATA_FILES, "blogPostsDrafts.ts"]) {
  const filePath = path.join(root, "src", "data", file);
  if (!fs.existsSync(filePath)) continue;
  const src = fs.readFileSync(filePath, "utf8");
  for (const { pattern, label } of BANNED) {
    if (pattern.test(src)) {
      console.error(`❌ ${file}: banned string — ${label}`);
      failed = true;
    }
  }
}

// Also scan imported blog content modules
const contentDir = path.join(root, "src", "data", "blogContent");
if (fs.existsSync(contentDir)) {
  for (const name of fs.readdirSync(contentDir)) {
    if (!name.endsWith(".ts")) continue;
    const src = fs.readFileSync(path.join(contentDir, name), "utf8");
    for (const { pattern, label } of BANNED) {
      if (pattern.test(src)) {
        console.error(`❌ blogContent/${name}: banned string — ${label}`);
        failed = true;
      }
    }
  }
}

if (failed) {
  console.error("\nBlog copy lint failed. Remove banned boilerplate before publishing.");
  process.exit(1);
}

console.log("✅ Blog copy lint passed (no banned AI-boilerplate strings).");
