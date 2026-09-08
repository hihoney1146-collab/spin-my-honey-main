import { chromium } from "playwright";

const url = "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true });
const results = [];

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

  let captured = null;
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(10);
    captured = await page.evaluate(() => {
      const seo = document.querySelector('[data-static-seo="true"]');
      const ready = document.getElementById("root")?.getAttribute("data-app-ready");
      if (!seo || ready) return null;
      const canvas = document.createElement("canvas");
      canvas.width = 390;
      canvas.height = 844;
      const ctx2 = canvas.getContext("2d");
      // sample multiple viewport points
      const points = [
        [195, 100], [195, 300], [195, 500], [50, 400], [340, 400],
      ];
      const samples = points.map(([x, y]) => {
        const el = document.elementFromPoint(x, y);
        return {
          x, y,
          tag: el?.tagName,
          id: el?.id,
          cls: el?.className?.toString?.().slice(0, 40),
          text: el?.textContent?.slice(0, 30),
          isSeo: !!el?.closest?.('[data-static-seo="true"]'),
        };
      });
      const bg = getComputedStyle(document.documentElement).backgroundColor;
      return {
        ready,
        seoClip: getComputedStyle(seo).clip,
        samples,
        bg,
        bodyChildCount: document.getElementById("root")?.childElementCount,
      };
    });
    if (captured) break;
  }

  if (captured) {
    await page.screenshot({ path: `docs/flash-check-screenshots/seo-flash-r${r}.png` });
    results.push({ reload: r, ...captured });
  } else {
    results.push({ reload: r, missed: true });
  }
  await ctx.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
