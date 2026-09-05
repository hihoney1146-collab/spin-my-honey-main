/**
 * Ensure every indexed blog post has a 1200×630 featured JPEG + WebP in
 * src/assets/blog-featured/ (used for og:image via generate-public-images).
 * Generates SVG art when no hand-made source exists.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { collectBlogPostsFull } from "./blog-data-sources.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "src", "assets", "blog-featured");

const FEATURED_WIDTH = 1200;
const FEATURED_HEIGHT = 630;

function escXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title, maxLen = 42) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function ogSvg(title, accent) {
  const lines = wrapTitle(title);
  const textY = lines.length === 1 ? 320 : lines.length === 2 ? 300 : 280;
  const textLines = lines
    .map((ln, i) => {
      const y = textY + i * 44;
      return `<text x="600" y="${y}" fill="#f7fafc" font-family="Segoe UI,Arial,sans-serif" font-size="42" font-weight="700" text-anchor="middle">${escXml(ln)}</text>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${FEATURED_WIDTH}" height="${FEATURED_HEIGHT}" viewBox="0 0 ${FEATURED_WIDTH} ${FEATURED_HEIGHT}">
  <rect width="${FEATURED_WIDTH}" height="${FEATURED_HEIGHT}" fill="#121218"/>
  <rect x="48" y="48" width="1104" height="534" rx="24" fill="#1e1e28" stroke="#333" stroke-width="2"/>
  <text x="72" y="96" fill="${accent}" font-family="Segoe UI,Arial,sans-serif" font-size="16" font-weight="600">ONLINE SPIN WHEEL BLOG</text>
  ${textLines}
  <circle cx="600" cy="470" r="72" fill="none" stroke="${accent}" stroke-width="6"/>
  <polygon points="600,388 588,418 612,418" fill="${accent}"/>
  <text x="600" y="580" fill="#718096" font-family="Segoe UI,Arial,sans-serif" font-size="14" text-anchor="middle">onlinespinwheel.fun</text>
</svg>`;
}

/** Rich wheel scene for posts without a hand-made PNG source. */
function featuredWheelSceneSvg({ title, subtitle, accent, slices }) {
  const n = slices.length;
  const cx = 600;
  const cy = 360;
  const r = 188;
  const slicePaths = slices
    .map((label, i) => {
      const a0 = (i / n) * 360;
      const a1 = ((i + 1) / n) * 360;
      const x1 = cx + r * Math.cos((Math.PI * a0) / 180);
      const y1 = cy + r * Math.sin((Math.PI * a0) / 180);
      const x2 = cx + r * Math.cos((Math.PI * a1) / 180);
      const y2 = cy + r * Math.sin((Math.PI * a1) / 180);
      const large = a1 - a0 > 180 ? 1 : 0;
      const fill = i % 2 === 0 ? "#2d3748" : "#4a5568";
      const mid = (Math.PI * (a0 + a1)) / 360;
      const tx = cx + r * 0.58 * Math.cos(mid);
      const ty = cy + r * 0.58 * Math.sin(mid);
      return `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z" fill="${fill}"/>
      <text x="${tx}" y="${ty}" fill="#fff" font-family="Segoe UI,Arial,sans-serif" font-size="18" font-weight="600" text-anchor="middle" dominant-baseline="middle">${escXml(label)}</text>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${FEATURED_WIDTH}" height="${FEATURED_HEIGHT}" viewBox="0 0 ${FEATURED_WIDTH} ${FEATURED_HEIGHT}">
  <rect width="${FEATURED_WIDTH}" height="${FEATURED_HEIGHT}" fill="#121218"/>
  <rect x="32" y="32" width="1136" height="566" rx="24" fill="#1e1e28" stroke="#333" stroke-width="2"/>
  <text x="56" y="78" fill="${accent}" font-family="Segoe UI,Arial,sans-serif" font-size="16" font-weight="600">ONLINE SPIN WHEEL BLOG</text>
  <text x="56" y="118" fill="#f7fafc" font-family="Segoe UI,Arial,sans-serif" font-size="34" font-weight="700">${escXml(title)}</text>
  <text x="56" y="152" fill="#a0aec0" font-family="Segoe UI,Arial,sans-serif" font-size="18">${escXml(subtitle)}</text>
  <circle cx="${cx}" cy="${cy}" r="${r + 8}" fill="none" stroke="${accent}" stroke-width="5"/>
  ${slicePaths}
  <polygon points="${cx},${cy - r - 18} ${cx - 14},${cy - r + 8} ${cx + 14},${cy - r + 8}" fill="${accent}"/>
  <rect x="500" y="548" width="200" height="44" rx="10" fill="${accent}"/>
  <text x="600" y="577" fill="#121218" font-family="Segoe UI,Arial,sans-serif" font-size="18" font-weight="700" text-anchor="middle">SPIN</text>
</svg>`;
}

/** Posts that use programmatic art instead of optimize-blog-featured-images PNGs. */
const RICH_FEATURED = {
  "spin-wheel-team-building-activities": {
    title: "Team building spin wheel",
    subtitle: "Standup rotation · project roles · breakout groups",
    accent: "#f6ad55",
    slices: ["Standup", "Roles", "Groups", "Vote", "Draw", "Teams"],
  },
};

const ACCENTS = ["#48bb78", "#63b3ed", "#f6ad55", "#fc8181", "#b794f4"];

const forceArg = process.argv.find((a) => a.startsWith("--force="));
const forceSlugs = forceArg
  ? forceArg
      .slice("--force=".length)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : [];

fs.mkdirSync(outDir, { recursive: true });

const posts = collectBlogPostsFull(root).filter((p) => p.indexed !== false);
let generated = 0;

for (let i = 0; i < posts.length; i++) {
  const post = posts[i];
  const jpgPath = path.join(outDir, `${post.slug}.jpg`);
  const webpPath = path.join(outDir, `${post.slug}.webp`);
  const rich = RICH_FEATURED[post.slug];
  const force = forceSlugs.includes(post.slug);

  if (!force && fs.existsSync(jpgPath) && fs.existsSync(webpPath)) continue;

  const shortTitle = String(post.title || post.slug).split("|")[0].trim();
  const accent = rich?.accent ?? ACCENTS[i % ACCENTS.length];
  const svg = rich
    ? featuredWheelSceneSvg(rich)
    : ogSvg(shortTitle, accent);
  const base = sharp(Buffer.from(svg)).resize(FEATURED_WIDTH, FEATURED_HEIGHT, {
    fit: "cover",
  });

  await base.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(jpgPath);
  await base.clone().webp({ quality: 82 }).toFile(webpPath);
  generated++;
  console.log(`✅ blog OG featured: ${post.slug}${force ? " (forced)" : ""}`);
}

if (generated === 0) {
  console.log("✅ blog featured images already present for all indexed posts");
} else {
  console.log(`✅ generated ${generated} blog featured image pair(s)`);
}
