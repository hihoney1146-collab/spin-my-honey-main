import { chromium } from "playwright";

const url = "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true });

for (let attempt = 1; attempt <= 10; attempt++) {
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
  for (const ms of [20, 40, 60, 80, 100]) {
    await page.waitForTimeout(ms === 20 ? 20 : 20);
    const data = await page.evaluate((t) => {
      const seo = document.querySelector('[data-static-seo="true"]');
      if (!seo) return null;
      const cs = getComputedStyle(seo);
      const rect = seo.getBoundingClientRect();
      return {
        t,
        clip: cs.clip,
        width: cs.width,
        height: cs.height,
        position: cs.position,
        rect: { w: rect.width, h: rect.height },
        checkVis: seo.checkVisibility?.(),
        rootReady: document.getElementById("root")?.getAttribute("data-app-ready"),
      };
    }, ms);
    if (data) {
      console.log(`attempt ${attempt} @ ~${ms}ms cumulative`, JSON.stringify(data));
    }
  }
  await ctx.close();
}
await browser.close();
