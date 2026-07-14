/**
 * Replace editorial em-dashes (—) with commas in user-facing source.
 * Safe: never duplicates surrounding text.
 * Run: npm run polish:emdash
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SCAN_DIRS = [
  path.join(root, "src", "pages"),
  path.join(root, "src", "components"),
  path.join(root, "src", "data"),
  path.join(root, "src", "lib"),
  path.join(root, "public"),
  path.join(root, "scripts"),
];

const SKIP_BASENAMES = new Set(["polish-emdash.mjs", "lint-blog-copy.mjs"]);
const SKIP_DIR_NAMES = new Set(["node_modules", "dist", "generated"]);

/** Only swap the em dash character; keep surrounding text intact. */
function polishEmDash(text) {
  return text
    .replace(/\s*—\s*/g, ", ")
    .replace(/,—/g, ",")
    .replace(/,\s+,/g, ",");
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIR_NAMES.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(tsx?|mjs|js|txt)$/.test(name)) files.push(p);
  }
  return files;
}

let changed = 0;
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    if (SKIP_BASENAMES.has(path.basename(file))) continue;
    const src = fs.readFileSync(file, "utf8");
    if (!src.includes("—")) continue;
    const next = polishEmDash(src);
    if (next !== src) {
      fs.writeFileSync(file, next, "utf8");
      changed++;
      console.log("✓", path.relative(root, file));
    }
  }
}
console.log(`\n✅ Polished ${changed} file(s).`);
