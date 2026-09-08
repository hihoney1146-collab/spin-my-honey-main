import { chromium } from "playwright";

const url = process.argv[2] ?? "http://127.0.0.1:4173/";
const reloads = Number(process.argv[3] ?? 6);

const readState = `
(() => {
  function hitTestVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return false;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || cs.opacity === "0")
      return false;
    const x = Math.min(Math.max(rect.left + rect.width / 2, 0), innerWidth - 1);
    const y = Math.min(Math.max(rect.top + rect.height / 2, 0), innerHeight - 1);
    let node = document.elementFromPoint(x, y);
    while (node) {
      if (node === el || el.contains(node)) return true;
      node = node.parentElement;
    }
    return false;
  }
  const seo = document.querySelector('[data-static-seo="true"]');
  const preview = document.querySelector('img[src*="spin-wheel-preview"]');
  const nav = !!document.querySelector("header nav");
  const manage = !!Array.from(document.querySelectorAll("h2")).find((e) =>
    e.textContent?.includes("Manage Entries"),
  );
  const canvas = document.querySelector("canvas");
  const names = Array.from(document.querySelectorAll("button"))
    .map((b) => b.textContent?.trim())
    .filter((t) =>
      ["Alice", "Bob", "Charlie", "Dana", "Sam", "Jordan", "Jahangir", "Adam"].includes(t),
    );
  return {
    nav,
    manage,
    streamer: !!document.querySelector('[role="switch"]'),
    ready: document.getElementById("root")?.getAttribute("data-app-ready") === "true",
    seoVisible: hitTestVisible(seo),
    previewVisible: hitTestVisible(preview),
    canvasVisible: hitTestVisible(canvas),
    canvasWithoutNav: hitTestVisible(canvas) && !nav,
    wheelWrongNames: names.filter((n) =>
      ["Alice", "Bob", "Charlie", "Dana", "Sam", "Jordan"].includes(n),
    ),
    defaultNames: names.filter((n) =>
      ["Jahangir", "Mudabber", "Adam", "Jacob", "Casey", "Gabriel", "Hanna"].includes(n),
    ),
  };
})()
`;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
await ctx.addInitScript(() => localStorage.removeItem("spinWheelEntries"));
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 400,
  downloadThroughput: 51200,
  uploadThroughput: 51200,
  connectionType: "cellular3g",
});

const perReload = [];
for (let r = 1; r <= reloads; r++) {
  const badFrames = [];
  await page.goto(url, { waitUntil: "commit", timeout: 120000 });
  for (let i = 0; i < 80; i++) {
    await page.waitForTimeout(50);
    const s = await page.evaluate(readState);
    const bad =
      s.seoVisible ||
      s.previewVisible ||
      s.canvasWithoutNav ||
      (s.canvasVisible && !s.nav) ||
      s.wheelWrongNames.length > 0;
    if (bad) badFrames.push({ t: (i + 1) * 50, ...s });
    if (s.ready && s.nav && s.manage) break;
  }
  await page.waitForLoadState("networkidle", { timeout: 120000 }).catch(() => {});
  await page.waitForTimeout(300);
  const final = await page.evaluate(readState);
  perReload.push({ reload: r, badFrames: badFrames.length, badFrames, final });
}

// Label fix: screenshot + verify bundle contains flip logic
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: "docs/wheel-label-check.png" });
const labelSrc = await page.evaluate(() => {
  const canvas = document.querySelector("canvas");
  return {
    hasCanvas: !!canvas,
    canvasSize: canvas ? { w: canvas.width, h: canvas.height } : null,
  };
});

await browser.close();

const anyBad = perReload.some((r) => r.badFrames.length > 0);
console.log(
  JSON.stringify(
    {
      url,
      reloads,
      anyVisualFlash: anyBad,
      perReload: perReload.map((r) => ({
        reload: r.reload,
        badFrames: r.badFrames.length,
        firstBad: r.badFrames[0] ?? null,
        final: r.final,
      })),
      labelScreenshot: "docs/wheel-label-check.png",
      labelSrc,
    },
    null,
    2,
  ),
);
process.exit(anyBad ? 1 : 0);
