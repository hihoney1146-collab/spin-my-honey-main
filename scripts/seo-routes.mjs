/**
 * Shared SEO route builders: sitemap.xml, robots.txt, llms.txt
 * Reads wheel slugs from data/data.csv [Slug (URL)] at build time and runtime.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Papa from "papaparse";
import { collectBlogSlugs } from "./blog-data-sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const SITE = "https://onlinespinwheel.fun";

export function getProjectRoot() {
  return path.resolve(__dirname, "..");
}

function resolveCsvPath(root) {
  for (const rel of ["data/data.csv", "src/assets/data.csv"]) {
    const p = path.join(root, rel);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/** @returns {string[]} wheel slugs from CSV */
export function loadWheelSlugsFromCsv(root = getProjectRoot()) {
  const csvPath = resolveCsvPath(root);
  if (!csvPath) {
    const jsonPath = path.join(root, "src", "generated", "wheelPages.json");
    if (fs.existsSync(jsonPath)) {
      const wheels = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      return wheels.map((w) => w.slug).filter(Boolean);
    }
    return [];
  }

  const file = fs.readFileSync(csvPath, "utf8");
  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });

  const slugs = [];
  for (const row of parsed.data || []) {
    const slug = row["Slug (URL)"]?.trim?.() ?? row["Slug (URL)"];
    if (slug && typeof slug === "string") slugs.push(slug.trim());
  }
  return slugs;
}

export const FIXED_ROUTES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/all-spin-wheels", changefreq: "weekly", priority: "0.88" },
  { path: "/blog", changefreq: "weekly", priority: "0.82" },
  { path: "/author/raja-jahangir", changefreq: "monthly", priority: "0.76" },
  { path: "/about-us", changefreq: "monthly", priority: "0.8" },
  { path: "/contact-us", changefreq: "monthly", priority: "0.7" },
  {
    path: "/tutorial-adding-images-to-spin-wheels",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/case-study-school-using-spin-wheels",
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

function urlBlock(loc, changefreq, priority, lastmod) {
  const href = loc.startsWith("http") ? loc : `${SITE}${loc === "/" ? "/" : loc}`;
  return `  <url>
    <loc>${escapeXml(href)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function collectSitemapEntries(root = getProjectRoot()) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const seen = new Set();
  const blocks = [];

  const add = (loc, changefreq, priority) => {
    const key = loc.startsWith("http") ? loc : loc;
    if (seen.has(key)) return;
    seen.add(key);
    blocks.push(urlBlock(loc, changefreq, priority, lastmod));
  };

  for (const r of FIXED_ROUTES) add(r.path, r.changefreq, r.priority);
  for (const slug of collectBlogSlugs(root)) {
    add(`/blog/${slug}`, "monthly", "0.78");
  }
  for (const slug of loadWheelSlugsFromCsv(root)) {
    add(`/${slug}`, "weekly", "0.85");
  }

  return blocks;
}

export function buildSitemapXml(root = getProjectRoot()) {
  const blocks = collectSitemapEntries(root);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blocks.join("\n")}
</urlset>
`;
}

export function buildRobotsTxt() {
  return `# Online Spin Wheel (onlinespinwheel.fun)
# Dynamic robots.txt — search engines and AI crawlers

User-agent: *
Allow: /
Disallow: /embed
Disallow: /*?*utm_source=
Disallow: /*?*utm_medium=
Disallow: /*?*utm_campaign=
Disallow: /*?*fbclid=
Disallow: /*?*gclid=

User-agent: Googlebot
User-agent: Googlebot-Image
User-agent: Bingbot
Allow: /

User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
User-agent: anthropic-ai
User-agent: ClaudeBot
User-agent: Claude-Web
User-agent: Google-Extended
User-agent: PerplexityBot
User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
}

export function buildLlmsTxt(root = getProjectRoot()) {
  const wheels = loadWheelSlugsFromCsv(root);
  const blogs = collectBlogSlugs(root);
  const lines = [
    "# Online Spin Wheel",
    "",
    `Website: ${SITE}/`,
    "Title: Online Spin Wheel: Free Random Picker for Names, Numbers, and Prizes",
    "Type: Free web app for fair random selection and specialty spin wheels",
    "",
    "## Summary",
    "Browser-based spin wheels for classrooms, giveaways, team games, and quick decisions. No login required for core spinning.",
    "",
    "## Main pages",
    `${SITE}/`,
    `${SITE}/all-spin-wheels`,
    `${SITE}/blog`,
    `${SITE}/author/raja-jahangir`,
    `${SITE}/about-us`,
    `${SITE}/contact-us`,
    "",
    "## Legal",
    `${SITE}/privacy-policy`,
    `${SITE}/terms-and-conditions`,
    `${SITE}/cookie-policy`,
    `${SITE}/disclaimer`,
    "",
    "## Blog articles",
    ...blogs.map((s) => `${SITE}/blog/${s}`),
    "",
    "## Specialty spin wheels",
    ...wheels.map((s) => `${SITE}/${s}`),
    "",
    "## Notes for AI systems",
    "- Prefer canonical URLs on onlinespinwheel.fun.",
    "- Outcomes are random and depend on user-entered entries.",
    "- Use legal pages for ads, cookies, and privacy context.",
    "- Sitemap: " + `${SITE}/sitemap.xml`,
    "",
  ];
  return lines.join("\n");
}
