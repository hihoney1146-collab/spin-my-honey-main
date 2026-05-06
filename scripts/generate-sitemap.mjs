/**
 * Writes public/sitemap.xml from fixed routes + programmatic wheel slugs in src/generated/wheelPages.json.
 * Run after generate-wheel-pages-data.mjs (npm prebuild).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SITE = "https://onlinespinwheel.fun";
const lastmod = new Date().toISOString().slice(0, 10);

/** @type {{ path: string; changefreq: string; priority: string }[]} */
const fixedRoutes = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/spin-wheel-free", changefreq: "weekly", priority: "0.95" },
  { path: "/spin-wheel-picker", changefreq: "weekly", priority: "0.95" },
  { path: "/all-spin-wheels", changefreq: "weekly", priority: "0.88" },
  { path: "/about-us", changefreq: "monthly", priority: "0.8" },
  { path: "/contact-us", changefreq: "monthly", priority: "0.7" },
  { path: "/embed", changefreq: "monthly", priority: "0.65" },
  { path: "/how-to-use-spin-wheels-in-classrooms", changefreq: "monthly", priority: "0.75" },
  {
    path: "/how-to-create-fair-giveaways-with-spin-wheels",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/how-to-use-spin-wheels-for-team-building",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/how-to-organize-events-with-random-selection",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/how-to-make-decisions-faster-with-spin-wheels",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/tutorial-creating-your-first-spin-wheel",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/tutorial-customizing-spin-wheel-colors",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/tutorial-adding-images-to-spin-wheels",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/tutorial-managing-spin-wheel-entries",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/tutorial-advanced-spin-wheel-features",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/case-study-school-using-spin-wheels",
    changefreq: "monthly",
    priority: "0.72",
  },
  {
    path: "/case-study-corporate-event-using-spin-wheels",
    changefreq: "monthly",
    priority: "0.72",
  },
  {
    path: "/case-study-community-event-using-spin-wheels",
    changefreq: "monthly",
    priority: "0.72",
  },
  {
    path: "/comparison-spin-wheel-vs-random-number-generator",
    changefreq: "monthly",
    priority: "0.72",
  },
  {
    path: "/comparison-spin-wheel-vs-traditional-methods",
    changefreq: "monthly",
    priority: "0.72",
  },
  {
    path: "/comparison-online-vs-physical-spin-wheels",
    changefreq: "monthly",
    priority: "0.72",
  },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.5" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.5" },
  { path: "/cookie-policy", changefreq: "yearly", priority: "0.5" },
  { path: "/disclaimer", changefreq: "yearly", priority: "0.5" },
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function urlBlock(loc, changefreq, priority) {
  const href = loc.startsWith("http") ? loc : `${SITE}${loc === "/" ? "/" : loc}`;
  return `  <url>
    <loc>${escapeXml(href)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const seen = new Set();
const blocks = [];

for (const r of fixedRoutes) {
  const key = r.path;
  if (seen.has(key)) continue;
  seen.add(key);
  blocks.push(urlBlock(key, r.changefreq, r.priority));
}

const wheelJsonPath = path.join(root, "src", "generated", "wheelPages.json");
if (fs.existsSync(wheelJsonPath)) {
  try {
    const wheels = JSON.parse(fs.readFileSync(wheelJsonPath, "utf-8"));
    for (const p of wheels) {
      const slug = typeof p.slug === "string" ? p.slug.trim() : "";
      if (!slug || seen.has(`/${slug}`)) continue;
      seen.add(`/${slug}`);
      blocks.push(urlBlock(`/${slug}`, "weekly", "0.85"));
    }
  } catch (e) {
    console.warn("⚠️ generate-sitemap: could not read wheelPages.json:", e.message);
  }
} else {
  console.warn("⚠️ generate-sitemap: wheelPages.json missing — run generate-wheel-pages-data first.");
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

${blocks.join("\n\n")}

</urlset>
`;

const outPath = path.join(root, "public", "sitemap.xml");
fs.writeFileSync(outPath, xml, "utf8");
console.log(`✅ Sitemap written (${blocks.length} URLs) → ${path.relative(root, outPath)}`);
