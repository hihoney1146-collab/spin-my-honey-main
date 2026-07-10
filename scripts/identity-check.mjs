#!/usr/bin/env node
/**
 * Fail the build if banned solo-operator / agency-disclaimer phrases appear
 * in prerendered HTML, llms.txt, or key source content files.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectIndexableRoutes } from "./route-registry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const BANNED = [
  /\bsolo project\b/i,
  /\bindependent creator\b/i,
  /\bnot a company\b/i,
  /\bnot an agency\b/i,
  /\bindependent project built and maintained by me\b/i,
  /\bI design it, write the code\b/i,
  /\banswer the emails\b/i,
  /\bone-person project\b/i,
  /\bauroxa\b/i,
];

const SOURCE_FILES = [
  "public/llms.txt",
  "scripts/static-content.mjs",
  "scripts/seo-routes.mjs",
  "scripts/static-page-meta.mjs",
  "src/pages/About.tsx",
  "src/pages/AuthorRajaJahangir.tsx",
  "src/pages/AuthorArmghanaZeeshan.tsx",
  "src/pages/AuthorZohaZeeshan.tsx",
  "src/pages/Privacy.tsx",
  "src/pages/Terms.tsx",
  "src/pages/Disclaimer.tsx",
  "src/pages/CookiePolicy.tsx",
  "src/pages/Contact.tsx",
  "src/lib/schema.ts",
];

function routeFile(routePath) {
  return routePath === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, routePath, "index.html");
}

const hits = [];

function scan(label, text) {
  for (const re of BANNED) {
    if (re.test(text)) {
      hits.push({ label, pattern: re.source });
    }
  }
}

for (const rel of SOURCE_FILES) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  scan(rel, fs.readFileSync(file, "utf8"));
}

if (fs.existsSync(dist)) {
  for (const { path: route } of collectIndexableRoutes(root)) {
    const file = routeFile(route);
    if (!fs.existsSync(file)) continue;
    scan(`dist${route === "/" ? "/index.html" : `${route}/index.html`}`, fs.readFileSync(file, "utf8"));
  }
}

const outPath = path.join(root, "docs", "IDENTITY_CHECK.md");
const lines = [
  "# Team Identity Phrase Check",
  "",
  `Scanned ${SOURCE_FILES.length} source files${fs.existsSync(dist) ? " + built dist HTML" : ""}.`,
  "",
  `- Banned phrase hits: **${hits.length}**`,
  "",
];

if (hits.length === 0) {
  lines.push("**PASS** — no banned solo-operator or Auroxa phrases found.");
} else {
  lines.push("| location | pattern |");
  lines.push("| --- | --- |");
  for (const h of hits) {
    lines.push(`| \`${h.label}\` | \`${h.pattern}\` |`);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");

console.log(`Identity check: ${hits.length} hit(s) → docs/IDENTITY_CHECK.md`);

if (hits.length > 0) {
  console.error("Banned identity phrases found. See docs/IDENTITY_CHECK.md");
  process.exit(1);
}
console.log("PASS: team identity phrases clean.");
