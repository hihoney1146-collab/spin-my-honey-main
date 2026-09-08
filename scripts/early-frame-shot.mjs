/** Capture screenshot 80ms after navigation commit */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true });
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
await page.waitForTimeout(80);
await page.screenshot({ path: "docs/flash-check-screenshots/early-80ms.png" });
const info = await page.evaluate(() => {
  const seo = document.querySelector('[data-static-seo="true"]');
  const cs = seo ? getComputedStyle(seo) : null;
  return {
    rootReady: document.getElementById("root")?.getAttribute("data-app-ready"),
    seoExists: !!seo,
    seoCheckVis: seo?.checkVisibility?.(),
    seoClip: cs?.clip,
    seoWidth: cs?.width,
    seoPosition: cs?.position,
    seoOverflow: cs?.overflow,
    bodyText: document.body.innerText.slice(0, 200),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
