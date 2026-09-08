/**
 * Visual flash check: screenshots at commit + early paint, plus label orientation.
 * Usage: node scripts/flash-visual-check.mjs [url] [reloads]
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const url = process.argv[2] ?? "http://127.0.0.1:4173/";
const reloads = Number(process.argv[3] ?? 6);
const outDir = join("docs", "flash-check-screenshots");

const EARLY_PROBE = `
(() => {
  window.__earlyFrames = [];
  const sample = () => {
    const root = document.getElementById("root");
    const ready = root?.getAttribute("data-app-ready") === "true";
    const seo = document.querySelector('[data-static-seo="true"]');
    const seoVis = seo ? seo.checkVisibility?.() ?? false : false;
    const img = document.querySelector('img[src*="spin-wheel-preview"]');
    const imgVis = img ? img.checkVisibility?.() ?? false : false;
    const nav = document.querySelector("header nav");
    const navVis = nav ? nav.checkVisibility?.() ?? false : false;
    const manage = Array.from(document.querySelectorAll("h2")).some((el) =>
      el.textContent?.includes("Manage Entries"),
    );
    const canvas = document.querySelector("canvas");
    const canvasVis = canvas ? canvas.checkVisibility?.() ?? false : false;
    const bad = seoVis || imgVis || (canvasVis && !navVis);
    if (bad) {
      window.__earlyFrames.push({
        t: Math.round(performance.now()),
        seoVis, imgVis, navVis, manage, canvasVis, ready,
      });
    }
  };
  sample();
  const iv = setInterval(sample, 4);
  setTimeout(() => clearInterval(iv), 8000);
})();
`;

async function checkLabels(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return { ok: false, reason: "no canvas" };
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.35;

    function whiteAt(deg) {
      const rad = (deg * Math.PI) / 180;
      let count = 0;
      for (let dr = -8; dr <= 8; dr += 2) {
        for (let da = -6; da <= 6; da += 2) {
          const a = rad + (da * Math.PI) / 180;
          const rr = r + dr;
          const x = Math.round(cx + Math.cos(a) * rr);
          const y = Math.round(cy + Math.sin(a) * rr);
          const [R, G, B, A] = ctx.getImageData(x, y, 1, 1).data;
          if (R > 200 && G > 200 && B > 200 && A > 200) count++;
        }
      }
      return count;
    }

    const left = whiteAt(180);
    const bottom = whiteAt(90);
    const right = whiteAt(0);
    const top = whiteAt(270);
    return {
      ok: left >= 3 && bottom >= 3,
      samples: { left, bottom, right, top },
    };
  });
}

async function oneReload(page, i, cdp) {
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 400,
    downloadThroughput: (400 * 1024) / 8,
    uploadThroughput: (400 * 1024) / 8,
    connectionType: "cellular3g",
  });

  await page.goto(url, { waitUntil: "commit", timeout: 60000 });
  await page.waitForTimeout(120);
  const early = await page.evaluate(() => window.__earlyFrames ?? []);
  await page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(600);

  const final = await page.evaluate(() => {
    const entryTexts = Array.from(document.querySelectorAll("canvas"))
      .length;
    const buttons = Array.from(document.querySelectorAll("button"))
      .map((b) => b.textContent?.trim())
      .filter(Boolean);
    const stale = buttons.filter((t) =>
      ["Alice", "Bob", "Charlie"].includes(t),
    );
    return {
      nav: !!document.querySelector("header nav"),
      manage: !!Array.from(document.querySelectorAll("h2")).find((el) =>
        el.textContent?.includes("Manage Entries"),
      ),
      canvas: !!document.querySelector("canvas"),
      staleAliceBob: stale,
      defaultNames: buttons.filter((t) =>
        ["Jahangir", "Mudabber", "Adam"].includes(t),
      ),
      seoVisible: (() => {
        const el = document.querySelector('[data-static-seo="true"]');
        return el ? el.checkVisibility?.() ?? false : false;
      })(),
      previewVisible: (() => {
        const el = document.querySelector('img[src*="spin-wheel-preview"]');
        return el ? el.checkVisibility?.() ?? false : false;
      })(),
    };
  });

  const shotPath = join(outDir, `reload-${i}-final.png`);
  await page.screenshot({ path: shotPath, fullPage: false });

  return { reload: i, earlyBadFrames: early.length, early, final, shotPath };
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    locale: "en-US",
  });
  await context.addInitScript(() => localStorage.removeItem("spinWheelEntries"));
  await context.addInitScript({ content: EARLY_PROBE });

  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);

  const results = [];
  for (let i = 1; i <= reloads; i++) {
    results.push(await oneReload(page, i, cdp));
  }

  const labelCheck = await checkLabels(page);
  await page.screenshot({ path: join(outDir, "label-check.png") });
  await browser.close();

  const anyFlash = results.some(
    (r) =>
      r.earlyBadFrames > 0 ||
      r.final.seoVisible ||
      r.final.previewVisible ||
      r.final.staleAliceBob.length > 0,
  );

  const summary = { url, reloads, anyFlash, labelCheck, results: results.map((r) => ({
    reload: r.reload,
    earlyBadFrames: r.earlyBadFrames,
    earlySample: r.early.slice(0, 3),
    final: r.final,
    shot: r.shotPath,
  }))};

  writeFileSync(join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  process.exit(anyFlash ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
