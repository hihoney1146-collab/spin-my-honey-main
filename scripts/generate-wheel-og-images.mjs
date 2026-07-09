/**
 * Generate unique 1200×630 OG images per wheel slug → public/og/<slug>.png
 *
 * Uses Playwright to screenshot the live wheel when dist/ exists and playwright
 * is installed; otherwise falls back to sharp SVG pie charts from wheel options.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distPath = path.join(root, "dist");
const ogDir = path.join(root, "public", "og");
const wheelJsonPath = path.join(root, "src", "generated", "wheelPages.json");

const WHEEL_COLORS = [
  "#e74c3c",
  "#e67e22",
  "#f39c12",
  "#2ecc71",
  "#1abc9c",
  "#3498db",
  "#9b59b6",
  "#e91e63",
];

function loadWheels() {
  if (!fs.existsSync(wheelJsonPath)) {
    console.error("❌ Missing wheelPages.json — run prebuild first.");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(wheelJsonPath, "utf8"));
}

function escSvg(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildWheelSvg(options, title) {
  const labels =
    options.length > 0
      ? options.slice(0, 12)
      : ["Option 1", "Option 2", "Option 3", "Option 4"];
  const n = labels.length;
  const cx = 600;
  const cy = 280;
  const r = 200;
  let paths = "";
  for (let i = 0; i < n; i++) {
    const start = (i / n) * 2 * Math.PI - Math.PI / 2;
    const end = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const large = end - start > Math.PI ? 1 : 0;
    const color = WHEEL_COLORS[i % WHEEL_COLORS.length];
    paths += `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z" fill="${color}" stroke="#fff" stroke-width="2"/>`;
  }
  const pointer = `<polygon points="${cx + r + 20},${cy} ${cx + r + 55},${cy - 18} ${cx + r + 55},${cy + 18}" fill="#ef4444"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#121218"/>
  ${paths}
  <circle cx="${cx}" cy="${cy}" r="28" fill="#fff" stroke="#333" stroke-width="3"/>
  ${pointer}
  <text x="600" y="560" text-anchor="middle" fill="#f4f4f5" font-family="system-ui,sans-serif" font-size="36" font-weight="700">${escSvg(title)}</text>
  <text x="600" y="600" text-anchor="middle" fill="#a1a1aa" font-family="system-ui,sans-serif" font-size="20">onlinespinwheel.fun</text>
</svg>`;
}

async function generateSharpOg(wheel, outFile) {
  const svg = buildWheelSvg(wheel.wheelOptions || [], wheel.h1 || wheel.title);
  await sharp(Buffer.from(svg)).png().toFile(outFile);
}

function waitForServer(url, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        /* retry */
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Server not ready: ${url}`));
        return;
      }
      setTimeout(tick, 400);
    };
    tick();
  });
}

function startPreview(port) {
  const cmd = process.platform === "win32" ? "npx.cmd" : "npx";
  return spawn(cmd, ["vite", "preview", "--port", String(port), "--host", "127.0.0.1"], {
    cwd: root,
    stdio: "pipe",
  });
}

async function compositeOg(wheelShot, title, outFile) {
  const titleBar = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#121218"/>
      <text x="600" y="580" text-anchor="middle" fill="#f4f4f5" font-family="system-ui,sans-serif" font-size="32" font-weight="700">${escSvg(title)}</text>
      <text x="600" y="615" text-anchor="middle" fill="#a1a1aa" font-family="system-ui,sans-serif" font-size="18">onlinespinwheel.fun</text>
    </svg>`,
  );
  const resized = await sharp(wheelShot)
    .resize(520, 520, { fit: "contain", background: { r: 18, g: 18, b: 24, alpha: 1 } })
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
    .composite([
      { input: resized, top: 40, left: 340 },
      { input: await sharp(titleBar).png().toBuffer(), top: 0, left: 0 },
    ])
    .png()
    .toFile(outFile);
}

async function generatePlaywrightOg(wheels) {
  const { chromium } = await import("playwright");
  const port = 5199;
  const base = `http://127.0.0.1:${port}`;
  const preview = startPreview(port);

  try {
    await waitForServer(base);
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    for (const wheel of wheels) {
      const outFile = path.join(ogDir, `${wheel.slug}.png`);
      await page.goto(`${base}/${wheel.slug}`, { waitUntil: "networkidle" });
      await page.waitForSelector("canvas", { timeout: 15000 });
      await page.waitForTimeout(800);
      const canvas = page.locator("canvas").first();
      const shot = await canvas.screenshot({ type: "png" });
      await compositeOg(shot, wheel.h1 || wheel.title, outFile);
      console.log(`  ✅ ${wheel.slug}.png (Playwright)`);
    }

    await browser.close();
  } finally {
    preview.kill("SIGTERM");
  }
}

async function main() {
  const wheels = loadWheels();
  fs.mkdirSync(ogDir, { recursive: true });

  let playwrightOk = false;
  if (fs.existsSync(distPath)) {
    try {
      await import("playwright");
      playwrightOk = true;
    } catch {
      console.warn("⚠️  playwright not installed — using sharp SVG fallback.");
    }
  } else {
    console.warn("⚠️  dist/ missing — using sharp SVG fallback for OG images.");
  }

  if (playwrightOk) {
    try {
      console.log(`Generating ${wheels.length} wheel OG images via Playwright…`);
      await generatePlaywrightOg(wheels);
      console.log(`✅ OG images → public/og/ (${wheels.length} files)`);
      return;
    } catch (err) {
      console.warn(`⚠️  Playwright OG failed (${err.message}) — falling back to sharp.`);
    }
  }

  console.log(`Generating ${wheels.length} wheel OG images via sharp SVG…`);
  for (const wheel of wheels) {
    const outFile = path.join(ogDir, `${wheel.slug}.png`);
    await generateSharpOg(wheel, outFile);
    console.log(`  ✅ ${wheel.slug}.png`);
  }
  console.log(`✅ OG images → public/og/ (${wheels.length} files)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
