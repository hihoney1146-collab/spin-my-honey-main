/**
 * Probe homepage for flash-of-stale-content during load.
 * Usage: node scripts/flash-probe.mjs [url] [reloads]
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://127.0.0.1:4173/";
const reloads = Number(process.argv[3] ?? 6);

const PROBE = `
(() => {
  window.__flashProbe = { frames: [] };
  const iv = setInterval(() => {
    const seo = document.querySelector('[data-static-seo="true"]');
    const sr = seo ? seo.getBoundingClientRect() : { width: 0, height: 0 };
    const seoVis = sr.width > 2 && sr.height > 2;
    const img = document.querySelector('img[src*="spin-wheel-preview"]');
    const ir = img ? img.getBoundingClientRect() : { width: 0, height: 0 };
    const imgVis = ir.width > 2;
    const nav = document.querySelector("header nav");
    const nr = nav ? nav.getBoundingClientRect() : { width: 0 };
    const navVis = nr.width > 50;
    const manage = Array.from(document.querySelectorAll("h2")).some((el) =>
      el.textContent?.includes("Manage Entries"),
    );
    const canvas = document.querySelector("canvas");
    const canvasVis = !!(canvas && canvas.getBoundingClientRect().width > 50);
    const ready =
      document.getElementById("root")?.getAttribute("data-app-ready") === "true";
    const bad =
      seoVis ||
      imgVis ||
      (canvasVis && !navVis) ||
      (canvasVis && !manage);
    if (bad) {
      window.__flashProbe.frames.push({
        t: Math.round(performance.now()),
        seoVis,
        imgVis,
        navVis,
        manage,
        canvasVis,
        ready,
      });
    }
    if (performance.now() > 10000) clearInterval(iv);
  }, 8);
})();
`;

async function snapshot(page) {
  return page.evaluate(() => {
    const entryButtons = Array.from(
      document.querySelectorAll("button"),
    )
      .map((b) => b.textContent?.trim())
      .filter((t) => t && t.length < 20);
    const aliceBobOnWheel = entryButtons.filter((t) =>
      ["Alice", "Bob", "Charlie", "Dana", "Sam", "Jordan"].includes(t),
    );
    const defaultNames = entryButtons.filter((t) =>
      ["Jahangir", "Mudabber", "Adam", "Jacob", "Casey", "Gabriel", "Hanna"].includes(t),
    );
    return {
      flashes: window.__flashProbe?.frames ?? [],
      final: {
        nav: !!document.querySelector("header nav"),
        manage: !!Array.from(document.querySelectorAll("h2")).find((el) =>
          el.textContent?.includes("Manage Entries"),
        ),
        streamer: !!document.querySelector('[role="switch"]'),
        canvas: !!document.querySelector("canvas"),
        seoInDom: !!document.querySelector('[data-static-seo="true"]'),
        seoVisible: (() => {
          const el = document.querySelector('[data-static-seo="true"]');
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.width > 2 && r.height > 2;
        })(),
        previewVisible: (() => {
          const el = document.querySelector('img[src*="spin-wheel-preview"]');
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.width > 2;
        })(),
        appReady:
          document.getElementById("root")?.getAttribute("data-app-ready") === "true",
        aliceBobOnWheel,
        defaultNames,
      },
    };
  });
}

async function loadOnce(page, reloadIndex) {
  await page.goto(url, { waitUntil: "commit", timeout: 60000 });
  // Poll early frames during JS boot
  const early = [];
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(50);
    const snap = await page.evaluate(() => ({
      flashes: window.__flashProbe?.frames ?? [],
      seoVisible: (() => {
        const el = document.querySelector('[data-static-seo="true"]');
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.width > 2 && r.height > 2;
      })(),
      nav: !!document.querySelector("header nav"),
      manage: !!Array.from(document.querySelectorAll("h2")).find((el) =>
        el.textContent?.includes("Manage Entries"),
      ),
      ready:
        document.getElementById("root")?.getAttribute("data-app-ready") === "true",
    }));
    if (snap.flashes.length) early.push(...snap.flashes);
    if (snap.seoVisible || (snap.ready && snap.nav && snap.manage)) break;
  }
  await page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(800);
  const final = await snapshot(page);
  return { reload: reloadIndex, earlyFlashCount: early.length, ...final };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    locale: "en-US",
  });
  await context.addInitScript(() => localStorage.removeItem("spinWheelEntries"));
  await context.addInitScript({ content: PROBE });

  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 400,
    downloadThroughput: (400 * 1024) / 8,
    uploadThroughput: (400 * 1024) / 8,
    connectionType: "cellular3g",
  });

  const results = [];
  for (let i = 0; i < reloads; i++) {
    results.push(await loadOnce(page, i + 1));
    await context.clearCookies();
  }

  // Label orientation: compare pixel variance in label arc (upright text has horizontal stroke energy)
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const labelCheck = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return { ok: false, reason: "no canvas" };
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    // Bottom-half label region (~Adam at ~128deg): expect white label pixels
    const points = [130, 180, 230].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x = Math.round(cx + Math.cos(rad) * canvas.width * 0.2);
      const y = Math.round(cy + Math.sin(rad) * canvas.height * 0.2);
      const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
      return { deg, x, y, r, g, b, a, isLabel: r > 180 && g > 180 && b > 180 && a > 128 };
    });
    return {
      ok: points.filter((p) => p.isLabel).length >= 2,
      points,
    };
  });

  await browser.close();

  const anyFlash = results.some(
    (r) => r.flashes.length > 0 || r.earlyFlashCount > 0 || r.final.seoVisible || r.final.previewVisible,
  );
  const summary = { url, reloads, anyFlash, results, labelCheck };
  console.log(JSON.stringify(summary, null, 2));
  process.exit(anyFlash ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
