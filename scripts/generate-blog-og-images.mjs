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

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#121218"/>
  <rect x="48" y="48" width="1104" height="534" rx="24" fill="#1e1e28" stroke="#333" stroke-width="2"/>
  <text x="72" y="96" fill="${accent}" font-family="Segoe UI,Arial,sans-serif" font-size="16" font-weight="600">ONLINE SPIN WHEEL BLOG</text>
  ${textLines}
  <circle cx="600" cy="470" r="72" fill="none" stroke="${accent}" stroke-width="6"/>
  <polygon points="600,388 588,418 612,418" fill="${accent}"/>
  <text x="600" y="580" fill="#718096" font-family="Segoe UI,Arial,sans-serif" font-size="14" text-anchor="middle">onlinespinwheel.fun</text>
</svg>`;
}

const ACCENTS = ["#48bb78", "#63b3ed", "#f6ad55", "#fc8181", "#b794f4"];

fs.mkdirSync(outDir, { recursive: true });

const posts = collectBlogPostsFull(root).filter((p) => p.indexed !== false);
let generated = 0;

for (let i = 0; i < posts.length; i++) {
  const post = posts[i];
  const jpgPath = path.join(outDir, `${post.slug}.jpg`);
  const webpPath = path.join(outDir, `${post.slug}.webp`);
  if (fs.existsSync(jpgPath) && fs.existsSync(webpPath)) continue;

  const shortTitle = String(post.title || post.slug).split("|")[0].trim();
  const accent = ACCENTS[i % ACCENTS.length];
  const svg = ogSvg(shortTitle, accent);
  const base = sharp(Buffer.from(svg)).resize(1200, 630, { fit: "cover" });

  await base.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(jpgPath);
  await base.clone().webp({ quality: 82 }).toFile(webpPath);
  generated++;
  console.log(`✅ blog OG featured: ${post.slug}`);
}

if (generated === 0) {
  console.log("✅ blog featured images already present for all indexed posts");
} else {
  console.log(`✅ generated ${generated} blog featured image pair(s)`);
}
