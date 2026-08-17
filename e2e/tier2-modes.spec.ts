import { test, expect } from "@playwright/test";

test.describe("Tier 2 mode differentiators", () => {
  test("yes-or-no-wheel: default weights own the pool + Best of 3", async ({
    page,
  }) => {
    await page.goto("/yes-or-no-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("On the wheel now (5 slices)")).toBeVisible({
      timeout: 30_000,
    });
    await expect(page.getByText("Yes ×2")).toBeVisible();
    await expect(page.getByText("Maybe ×1")).toBeVisible();
    await page.locator("#w-yes").fill("4");
    await expect(page.getByText("Yes ×4")).toBeVisible();
    await page.locator('label[for="best-of-3"]').click();
    await expect(page.locator("#best-of-3")).toBeChecked();
  });

  test("dinner-picker-wheel: default cuisine pool + chains absorb", async ({
    page,
  }) => {
    await page.goto("/dinner-picker-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Italian pasta")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Fast-casual / chains" }).click();
    await expect(page.getByText("Burger chain")).toBeVisible();
    await page.getByRole("button", { name: "Leftovers" }).click();
    await expect(page.getByText("Fried rice with leftovers")).toBeVisible();
  });

  test("movie-picker-wheel: horror mood + watchlist paste", async ({ page }) => {
    await page.goto("/movie-picker-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Feel-good comedy")).toBeVisible({
      timeout: 30_000,
    });
    await page.getByRole("button", { name: "Horror / thriller" }).click();
    await expect(page.getByText("Classic horror")).toBeVisible();
    await page.getByRole("button", { name: "Paste my watchlist" }).click();
    await page.locator("#movie-list").fill("Dune\nArrival");
    await expect(page.getByText("Dune", { exact: true })).toBeVisible();
  });

  test("date-night-wheel: location + budget rebuild pool", async ({ page }) => {
    await page.goto("/date-night-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Cook together")).toBeVisible({
      timeout: 30_000,
    });
    await page.getByRole("button", { name: "At home" }).click();
    await page.getByRole("button", { name: "Treat night" }).click();
    await expect(page.getByText("Spa-style night in")).toBeVisible();
  });

  test("zodiac-sign-wheel: 7/27 highlights Leo", async ({ page }) => {
    await page.goto("/zodiac-sign-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#zodiac-month")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByRole("listitem").filter({ hasText: /^Aries$/ })).toBeVisible();
    await page.locator("#zodiac-month").fill("7");
    await page.locator("#zodiac-day").fill("27");
    await page.getByRole("button", { name: /Show sign/i }).click();
    await expect(page.getByText(/7\/27/)).toBeVisible();
    await expect(page.getByText("Leo (highlighted)")).toBeVisible();
  });
});
