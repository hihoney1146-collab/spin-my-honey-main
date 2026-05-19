/**
 * Copy logo to public/ and generate 1200x630 og-image.png for social previews.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const logoSrc = path.join(root, "src", "assets", "logo.png");
const logoDest = path.join(publicDir, "logo.png");
const ogDest = path.join(publicDir, "og-image.png");

if (!fs.existsSync(logoSrc)) {
  console.error("❌ Missing src/assets/logo.png");
  process.exit(1);
}

fs.mkdirSync(publicDir, { recursive: true });
fs.copyFileSync(logoSrc, logoDest);

const logo = sharp(logoSrc);
const meta = await logo.metadata();
const logoW = meta.width || 512;
const logoH = meta.height || 512;
const maxLogo = 420;
const scale = Math.min(maxLogo / logoW, maxLogo / logoH, 1);
const resizedW = Math.round(logoW * scale);
const resizedH = Math.round(logoH * scale);
const left = Math.floor((1200 - resizedW) / 2);
const top = Math.floor((630 - resizedH) / 2);

const resizedLogo = await logo
  .resize(resizedW, resizedH, { fit: "inside" })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 18, g: 18, b: 24, alpha: 1 },
  },
})
  .composite([{ input: resizedLogo, left, top }])
  .png()
  .toFile(ogDest);

console.log("✅ public/logo.png");
console.log("✅ public/og-image.png (1200×630)");
