import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "fs";
import { join } from "path";

const url = process.argv[2] ?? "http://127.0.0.1:4173/";
const outDir = "docs/flash-check-screenshots";
mkdirSync(outDir, { recursive: true });

function sampleImage(path) {
  // PNG RGBA sampling via raw decode is heavy; use playwright evaluate on loaded image
  return path;
}

const browser = await chromium.launch({ headless: true });
const findings = [];

for (let r = 1; r <= 8; r++) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(() => localStorage.clear());
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false, latency: 400,
    downloadThroughput: (400 * 1024) / 8,
    uploadThroughput: (400 * 1024) / 8,
    connectionType: "cellular3g",
  });

  await page.goto(url, { waitUntil: "commit" });
  await page.waitForTimeout(50);
  const snap50 = await page.evaluate(() => ({
    ms: 50,
    ready: document.getElementById("root")?.getAttribute("data-app-ready"),
    seoVis: document.querySelector('[data-static-seo="true"]')?.checkVisibility?.() ?? false,
    nav: !!document.querySelector("header nav"),
    canvas: !!document.querySelector("canvas"),
    h1: document.querySelector("h1")?.textContent?.slice(0, 60),
    bodyText: document.body?.innerText?.slice(0, 100) ?? "",
  }));
  const shot50 = join(outDir, `probe-r${r}-50ms.png`);
  await page.screenshot({ path: shot50 });
  
  await page.waitForTimeout(150);
  const snap200 = await page.evaluate(() => ({
    ms: 200,
    ready: document.getElementById("root")?.getAttribute("data-app-ready"),
    nav: !!document.querySelector("header nav"),
    canvas: !!document.querySelector("canvas"),
    h1: document.querySelector("h1")?.textContent?.slice(0, 60),
  }));

  findings.push({ reload: r, at50: snap50, at200: snap200, shot50 });
  await ctx.close();
}

// label orientation on stable page
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
await ctx.addInitScript(() => localStorage.clear());
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const labels = await page.evaluate(() => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return { ok: false };
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height, cx = w/2, cy = h/2;
  const names = ["Jahangir", "Mudabber", "Adam", "Jacob", "Casey", "Gabriel", "Hanna"];
  // scan for white text pixels in outer ring
  const regions = {};
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      const dx = x - cx, dy = y - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < w * 0.25 || dist > w * 0.42) continue;
      const [R,G,B,A] = ctx.getImageData(x,y,1,1).data;
      if (R > 210 && G > 210 && B > 210 && A > 200) {
        const ang = ((Math.atan2(dy, dx) * 180 / Math.PI) + 360) % 360;
        const bucket = Math.round(ang / 30) * 30;
        regions[bucket] = (regions[bucket] || 0) + 1;
      }
    }
  }
  return { ok: Object.keys(regions).length >= 5, regions, canvas: { w, h } };
});
await page.screenshot({ path: join(outDir, "labels-final.png") });
await browser.close();

console.log(JSON.stringify({ findings, labels }, null, 2));
