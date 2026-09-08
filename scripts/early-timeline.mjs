/** Capture screenshots at multiple early timestamps during throttled load */
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const url = process.argv[2] ?? "http://127.0.0.1:4173/";
mkdirSync("docs/flash-check-screenshots", { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
await ctx.addInitScript(() => localStorage.clear());
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 400,
  downloadThroughput: (400 * 1024) / 8,
  uploadThroughput: (400 * 1024) / 8,
  connectionType: "cellular3g",
});

const stamps = [50, 200, 400, 600, 800, 1000, 1500];
for (let r = 1; r <= 5; r++) {
  await page.goto(url, { waitUntil: "commit" });
  let elapsed = 0;
  for (const target of stamps) {
    await page.waitForTimeout(target - elapsed);
    elapsed = target;
    const info = await page.evaluate(() => ({
      ready: document.getElementById("root")?.getAttribute("data-app-ready"),
      seo: !!document.querySelector('[data-static-seo="true"]'),
      nav: !!document.querySelector("header nav"),
      canvas: !!document.querySelector("canvas"),
      seoVis: (() => {
        const el = document.querySelector('[data-static-seo="true"]');
        return el ? el.checkVisibility?.() : false;
      })(),
      textSnippet: document.body.innerText.slice(0, 80).replace(/\n/g, " "),
    }));
    await page.screenshot({
      path: `docs/flash-check-screenshots/r${r}-t${target}ms.png`,
    });
    console.log(`reload ${r} @ ${target}ms`, JSON.stringify(info));
  }
}
await browser.close();
