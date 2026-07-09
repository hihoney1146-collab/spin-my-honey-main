import { test, expect } from "@playwright/test";

test("streamer toggle applies green screen and ?stream=1", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const toggle = page.locator("#streamer-mode");
  await expect(toggle).toBeVisible({ timeout: 30_000 });

  await page.locator('label[for="streamer-mode"]').click();

  await expect(page).toHaveURL(/stream=1/);
  await expect
    .poll(async () =>
      page.evaluate(() => {
        const el = document.querySelector(".min-h-screen");
        return el ? getComputedStyle(el).backgroundColor : "";
      }),
    )
    .toBe("rgb(0, 255, 0)");
});
