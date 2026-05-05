/**
 * Reads data/data.csv (or falls back to src/assets/data.csv),
 * parses with PapaParse, and writes src/generated/wheelPages.json for the app bundle.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Papa from "papaparse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const candidates = [
  path.join(root, "data", "data.csv"),
  path.join(root, "src", "assets", "data.csv"),
];

function resolveCsvPath() {
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function parseWheelOptions(raw) {
  if (raw == null || String(raw).trim() === "") return [];
  return String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseFaqsBlock(text) {
  if (text == null || String(text).trim() === "") return [];
  const str = String(text);
  const parts = str.split(/\n\s*Q:\s*/i).filter(Boolean);
  const items = [];
  for (const part of parts) {
    const segments = part.split(/\n\s*A:\s*/i);
    const question = (segments[0] || "")
      .trim()
      .replace(/^\s*Q:\s*/i, "");
    const answer = segments
      .slice(1)
      .join("\n")
      .trim()
      .replace(/^\s*A:\s*/i, "");
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

function trimRow(row) {
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    const key = k.trim();
    out[key] = typeof v === "string" ? v.trim() : v;
  }
  return out;
}

const csvPath = resolveCsvPath();
if (!csvPath) {
  console.error(
    "❌ No CSV found. Add data/data.csv or src/assets/data.csv at project root."
  );
  process.exit(1);
}

const file = fs.readFileSync(csvPath, "utf8");
const parsed = Papa.parse(file, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (h) => h.trim(),
});

if (parsed.errors?.length) {
  console.warn("CSV parse warnings:", parsed.errors.slice(0, 5));
}

const records = (parsed.data || [])
  .map(trimRow)
  .map((row) => {
    const slug = row["Slug (URL)"];
    if (!slug) return null;
    return {
      slug: String(slug).trim(),
      keywordPrimary: row["Keyword (Primary)"] || "",
      keywordSecondary: row["Keyword (Secondary)"] || "",
      title: row["Title"] || "",
      metaDescription: row["Meta Description"] || "",
      h1: row["H1_Heading"] || "",
      introduction: row["Introduction Text"] || "",
      howToUse: row["How To Use"] || "",
      category: row["Category"] || "",
      wheelOptions: parseWheelOptions(row["Wheel Options"]),
      faqs: parseFaqsBlock(row["FAQs"]),
    };
  })
  .filter(Boolean);

const outDir = path.join(root, "src", "generated");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "wheelPages.json");
fs.writeFileSync(outFile, JSON.stringify(records, null, 0), "utf8");

console.log(`✅ Wrote ${records.length} wheel pages → ${path.relative(root, outFile)}`);
console.log(`   Source: ${path.relative(root, csvPath)}`);
