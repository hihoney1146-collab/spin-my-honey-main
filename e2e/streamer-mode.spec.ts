import { test, expect } from "@playwright/test";
import { contrastRatio } from "../src/lib/contrastColor";

function parseRgb(css: string): [number, number, number] | null {
  const m = css.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

test("stream layout strips marketing, supports chroma picker, meets contrast", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const toggle = page.locator("#streamer-mode");
  await expect(toggle).toBeVisible({ timeout: 30_000 });
  await page.locator('label[for="streamer-mode"]').click();

  await expect(page).toHaveURL(/stream=1/);
  await expect(page.locator("#how-to-spin")).toHaveCount(0);
  await expect(page.locator("#why-fair")).toHaveCount(0);
  await expect(page.locator("#homepage-faq")).toHaveCount(0);
  await expect(page.locator("header")).toHaveCount(0);
  await expect(page.locator("footer")).toHaveCount(0);
  await expect(page.locator("canvas")).toBeVisible();

  await expect
    .poll(async () =>
      page.evaluate(() => {
        const el = document.querySelector("[data-stream-layout]");
        return el ? getComputedStyle(el).backgroundColor : "";
      }),
    )
    .toBe("rgb(0, 255, 0)");

  await page.locator("#stream-chroma-color").fill("#0047FF");
  await expect(page).toHaveURL(/bg=0047FF/i);

  await expect
    .poll(async () =>
      page.evaluate(() => {
        const el = document.querySelector("[data-stream-layout]");
        return el ? getComputedStyle(el).backgroundColor : "";
      }),
    )
    .toBe("rgb(0, 71, 255)");

  const { fg, bg } = await page.evaluate(() => {
    const layout = document.querySelector("[data-stream-layout]");
    const bgCss = layout ? getComputedStyle(layout).backgroundColor : "";
    const fgCss = getComputedStyle(document.documentElement)
      .getPropertyValue("--stream-fg")
      .trim();
    return { fg: fgCss, bg: bgCss };
  });

  const bgRgb = parseRgb(bg);
  expect(bgRgb).not.toBeNull();
  const bgHex = rgbToHex(...bgRgb!);
  expect(contrastRatio(fg, bgHex)).toBeGreaterThanOrEqual(4.5);
});
