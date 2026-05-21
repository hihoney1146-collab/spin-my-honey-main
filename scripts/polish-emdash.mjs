/**
 * Replace editorial em-dashes (—) with human-style periods or commas in user-facing source.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SCAN_DIRS = [
  path.join(root, "src", "pages"),
  path.join(root, "src", "components"),
  path.join(root, "src", "data"),
  path.join(root, "public"),
];

const SKIP_FILES = new Set([
  "SpinWheel.tsx", // code comments use em-dash in technical notes
]);

function capitalizeAfterPeriod(text) {
  return text.replace(/\.\s+([a-z])/g, (_, c) => `. ${c.toUpperCase()}`);
}

function polishEmDash(text) {
  let out = text;
  // Do not alter JSX block comments (polish script previously broke Layout.tsx)
  out = out.replace(/\{\/\*[\s\S]*?\*\/\}/g, (comment) =>
    comment.replace(/\s—\s/g, ", ").replace(/—/g, ", "),
  );
  // "word — word" -> "word. Word" when second part is a clause
  out = out.replace(/\s—\s/g, (match, offset, full) => {
    const after = full.slice(offset + match.length);
    if (/^[\s]*[a-z]/.test(after)) {
      const next = after.trimStart();
      const cap = next.charAt(0).toUpperCase() + next.slice(1);
      return `. ${cap}`;
    }
    return ", ";
  });
  out = out.replace(/—/g, ", ");
  return capitalizeAfterPeriod(out);
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(tsx?|txt|md)$/.test(name)) files.push(p);
  }
  return files;
}

let changed = 0;
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    if (SKIP_FILES.has(path.basename(file))) continue;
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
