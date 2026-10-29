/**
 * Generate a branded card (initials + name + role) for team members who have no
 * real photo, so each author page carries its own distinct, honest image instead
 * of leaving og:image unset or falling back to a generic site-wide image.
 *
 * This is deliberately not a photo and does not claim to be one: same circle,
 * initials and accent colour already shown on the live page when no photo
 * exists, rendered as a 1200x630 share card. Run after prebuild writes the
 * generated data, same as the wheel OG images.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const ogDir = path.join(root, "public", "og");

const PRIMARY = "rgb(173,43,238)";
const BG = "#121218";
const INK = "#f4f4f5";
const MUTED = "#a1a1aa";

// Only people with no real photo on file. Raja Jahangir already has one
// (public/raja-jahangir.jpg) and keeps using that instead.
const PEOPLE = [
  { slug: "armghana-zeeshan", initials: "AZ", name: "Armghana Zeeshan", role: "CEO" },
  { slug: "zoha-zeeshan", initials: "ZZ", name: "Zoha Zeeshan", role: "Co-Founder" },
  { slug: "faisal-zahir", initials: "FZ", name: "Faisal Zahir", role: "Digital Marketing" },
];

function escSvg(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCardSvg({ initials, name, role }) {
  const cx = 600;
  const cy = 250;
  const r = 140;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${PRIMARY}" stroke-width="4"/>
  <text x="${cx}" y="${cy + 38}" text-anchor="middle" fill="${PRIMARY}" font-family="system-ui,sans-serif" font-size="96" font-weight="700">${escSvg(initials)}</text>
  <text x="600" y="460" text-anchor="middle" fill="${INK}" font-family="system-ui,sans-serif" font-size="44" font-weight="700">${escSvg(name)}</text>
  <text x="600" y="505" text-anchor="middle" fill="${MUTED}" font-family="system-ui,sans-serif" font-size="26">${escSvg(role)}, Online Spin Wheel</text>
  <text x="600" y="600" text-anchor="middle" fill="${MUTED}" font-family="system-ui,sans-serif" font-size="20">onlinespinwheel.fun</text>
</svg>`;
}

async function run() {
  fs.mkdirSync(ogDir, { recursive: true });
  for (const person of PEOPLE) {
    const svg = buildCardSvg(person);
    const outFile = path.join(ogDir, `author-${person.slug}.png`);
    await sharp(Buffer.from(svg)).png().toFile(outFile);
    console.log(`✅ ${path.relative(root, outFile)}`);
  }
}

run();
