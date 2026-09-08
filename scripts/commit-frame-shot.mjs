/** Screenshot at first paint after commit */
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const url = process.argv[2] ?? "http://127.0.0.1:4173/";
mkdirSync("docs/flash-check-screenshots", { recursive: true });

const INIT = `
window.__commitFrame = null;
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const seo = document.querySelector('[data-static-seo="true"]');
    window.__commitFrame = {
      ready: document.getElementById("root")?.getAttribute("data-app-ready"),
      seoH1: seo?.querySelector("h1")?.textContent?.slice(0, 50) ?? null,
      seoVis: seo ? seo.checkVisibility?.() : false,
      nav: !!document.querySelector("header nav"),
      canvas: !!document.querySelector("canvas"),
      imgPreview: !!document.querySelector('img[src*="spin-wheel-preview"]'),
    };
  });
});
`;

const browser = await chromium.launch({ headless: true });

for (let r = 1; r <= 6; r++) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(() => localStorage.clear());
  await ctx.addInitScript({ content: INIT });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 400,
    downloadThroughput: (400 * 1024) / 8,
    uploadThroughput: (400 * 1024) / 8,
    connectionType: "cellular3g",
  });

  await page.goto(url, { waitUntil: "commit" });
  await page.waitForTimeout(30);
  const info = await page.evaluate(() => window.__commitFrame);
  await page.screenshot({ path: `docs/flash-check-screenshots/commit-r${r}.png` });
  console.log(`reload ${r} @ commit+30ms`, JSON.stringify(info));
  await ctx.close();
}

await browser.close();
