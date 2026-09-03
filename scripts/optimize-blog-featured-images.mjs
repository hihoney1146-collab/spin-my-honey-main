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
  {
    slug: "classroom-spinner-beyond-name-picking",
    src: "Classroom_Spinner_Beyond_Name_Picking.png",
  },
  {
    slug: "fair-raffle-without-paper-tickets",
    src: "Raffle_Wheel.png",
  },
];

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const onlySlugs = onlyArg
  ? onlyArg
      .slice("--only=".length)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : null;
const activeJobs = onlySlugs?.length
  ? jobs.filter((j) => onlySlugs.includes(j.slug))
  : jobs;

if (onlySlugs?.length && activeJobs.length !== onlySlugs.length) {
  const known = new Set(jobs.map((j) => j.slug));
  const missing = onlySlugs.filter((s) => !known.has(s));
  console.error(`❌ Unknown slug(s) for --only: ${missing.join(", ")}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

for (const { slug, src } of activeJobs) {
  const inputPath = path.join(assetsDir, src);
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Missing source: ${src}`);
    process.exit(1);
  }

  const srcBytes = fs.statSync(inputPath).size;
  const srcKb = (srcBytes / 1024).toFixed(1);
  const srcMeta = await sharp(inputPath).metadata();
  console.log(
    `\n📷 ${slug}\n   source: ${src} (${srcKb} KB, ${srcMeta.width ?? "?"}×${srcMeta.height ?? "?"})`,
  );

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
  const outMeta = await sharp(jpgPath).metadata();
  const savedPct = ((1 - fs.statSync(jpgPath).size / srcBytes) * 100).toFixed(0);
  console.log(
    `   output: webp ${wKb} KB, jpg ${jKb} KB (${outMeta.width ?? "?"}×${outMeta.height ?? "?"}, −${savedPct}% vs source)`,
  );
}

console.log(`\n✅ Wrote optimized assets → ${path.relative(root, outDir)}`);
