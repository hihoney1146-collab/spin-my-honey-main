/**
 * Resizes/compresses blog hero images from src/assets into src/assets/blog-featured/
 * (WebP + JPEG, max 1200px wide). Run when source art changes:
 *   npm run optimize:blog-images
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsDir = path.join(root, "src", "assets");
const outDir = path.join(assetsDir, "blog-featured");

/** Source filename in src/assets → output basename (no extension) */
const jobs = [
  {
    slug: "random-name-picker-fair-fun-easy",
    src: "How a Random Name Picker Makes Decisions Fair, Fun & Easy.jpeg",
  },
  {
    slug: "best-icebreaker-games-office-meetings",
    src: "10 Best Icebreaker Games for Office Meetings to Energize Your Team.png",
  },
  {
    slug: "best-spin-wheel-games-for-students",
    src: "7 Best Spin the Wheel Games for Students to Boost Engagement.png",
  },
  {
    slug: "fun-ways-decide-where-to-eat-couples",
    src: "7 Fun Ways to Decide Where to Eat for Couples (No More Arguments!).png",
  },
  {
    slug: "virtual-secret-santa-online",
    src: "How to Organize a Virtual Secret Santa Online.png",
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const { slug, src } of jobs) {
  const inputPath = path.join(assetsDir, src);
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Missing source: ${src}`);
    process.exit(1);
  }

  const base = sharp(inputPath).rotate();
  const resized = base.resize({
    width: 1200,
    height: 675,
    fit: "inside",
    withoutEnlargement: true,
  });

  const webpPath = path.join(outDir, `${slug}.webp`);
  const jpgPath = path.join(outDir, `${slug}.jpg`);

  await resized
    .clone()
    .webp({ quality: 82, effort: 5, smartSubsample: true })
    .toFile(webpPath);

  await resized
    .clone()
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(jpgPath);

  const wKb = (fs.statSync(webpPath).size / 1024).toFixed(1);
  const jKb = (fs.statSync(jpgPath).size / 1024).toFixed(1);
  console.log(`✅ ${slug}  →  webp ${wKb} KB, jpg ${jKb} KB`);
}

console.log(`\n✅ Wrote optimized assets → ${path.relative(root, outDir)}`);
