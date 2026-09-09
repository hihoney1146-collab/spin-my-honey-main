/**
 * Verify every blog post slug shares the same featured image on listing + post pages.
 * Checks: slug map, src/assets JPEG+WebP, public/blog-featured JPEG parity.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { collectBlogPostsFull } from "./blog-data-sources.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mapFile = path.join(root, "src", "lib", "blogFeaturedImages.ts");
const srcDir = path.join(root, "src", "assets", "blog-featured");
const pubDir = path.join(root, "public", "blog-featured");

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const mapSrc = fs.readFileSync(mapFile, "utf8");
const mappedSlugs = [...mapSrc.matchAll(/"([a-z0-9-]+)":\s*\{\s*jpg:/g)].map((m) => m[1]);
const posts = collectBlogPostsFull(root);

const issues = [];
const report = [];

for (const post of posts) {
  const slug = post.slug;
  const inMap = mappedSlugs.includes(slug);
  const jpg = path.join(srcDir, `${slug}.jpg`);
  const webp = path.join(srcDir, `${slug}.webp`);
  const pubJpg = path.join(pubDir, `${slug}.jpg`);

  const row = {
    slug,
    indexed: post.indexed !== false,
    inMap,
    srcJpg: fs.existsSync(jpg),
    srcWebp: fs.existsSync(webp),
    pubJpg: fs.existsSync(pubJpg),
    srcPubMatch: null,
  };

  if (!inMap) issues.push(`${slug}: missing from blogFeaturedImages.ts map`);
  if (!fs.existsSync(jpg)) issues.push(`${slug}: missing src/assets/blog-featured/${slug}.jpg`);
  if (!fs.existsSync(webp)) issues.push(`${slug}: missing src/assets/blog-featured/${slug}.webp`);
  if (post.indexed !== false && !fs.existsSync(pubJpg)) {
    issues.push(`${slug}: missing public/blog-featured/${slug}.jpg (indexed post)`);
  }
  if (fs.existsSync(jpg) && fs.existsSync(pubJpg)) {
    row.srcPubMatch = sha256(jpg) === sha256(pubJpg);
    if (!row.srcPubMatch) {
      issues.push(`${slug}: src vs public JPEG checksum mismatch`);
    }
  }

  report.push(row);
}

const unmapped = mappedSlugs.filter((s) => !posts.some((p) => p.slug === s));
for (const slug of unmapped) {
  issues.push(`${slug}: in map but no blog post`);
}

console.log(JSON.stringify({ ok: issues.length === 0, report, issues }, null, 2));
process.exit(issues.length === 0 ? 0 : 1);
