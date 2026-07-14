/**
 * Phase 9.2, tool pages: directAnswer ≤ 100 words, declarative tone.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(
  path.join(root, "src", "data", "wheelUniqueContent.ts"),
  "utf8",
);

const BANNED = [
  /in today['']s fast-paced/gi,
  /\brevolutionary\b/gi,
  /\bgame[- ]changing\b/gi,
  /\bunlock the power\b/gi,
  /\bultimate solution\b/gi,
  /\bdiscover how\b/gi,
  /\bleverage\b/gi,
];

const re = /directAnswer:\s*\n?\s*"((?:\\.|[^"\\])*)"/g;
let m;
let failed = false;
let count = 0;

while ((m = re.exec(src))) {
  count++;
  const text = m[1].replace(/\\"/g, '"');
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length > 100) {
    console.error(`❌ directAnswer ${words.length} words (max 100): ${text.slice(0, 80)}…`);
    failed = true;
  }
  for (const pattern of BANNED) {
    if (pattern.test(text)) {
      console.error(`❌ directAnswer banned phrase (${pattern}): ${text.slice(0, 80)}…`);
      failed = true;
    }
  }
}

if (failed) {
  console.error("\nDirect-answer lint failed.");
  process.exit(1);
}

console.log(`✅ Direct-answer lint passed (${count} wheel pages, ≤100 words each).`);
