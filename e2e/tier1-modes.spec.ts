import { test, expect } from "@playwright/test";

test.describe("Tier 1 mode differentiators", () => {
  test("random-name-picker: weights + remove controls", async ({ page }) => {
    await page.goto("/random-name-picker-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#name-remove")).toBeVisible({ timeout: 30_000 });
    await page.locator('label[for="name-weights"]').click();
    await expect(page.locator("#name-weights")).toBeChecked();
    await page.locator("#name-list").fill("Alex:3\nJordan\nSam:2");
    await expect(page.getByText("Alex: weight 3")).toBeVisible();
  });

  test("abcd-spin-wheel: locked letters + projector control", async ({ page }) => {
    await page.goto("/abcd-spin-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Multiple-choice quiz mode")).toBeVisible({
      timeout: 30_000,
    });
    await expect(page.locator("#abcd-remove")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Projector fullscreen/i })
    ).toBeVisible();
  });

  test("chinese-zodiac-wheel: birth-year calculator", async ({ page }) => {
    await page.goto("/chinese-zodiac-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#cn-year")).toBeVisible({ timeout: 30_000 });
    await page.locator("#cn-year").fill("1994");
    await page.getByRole("button", { name: /Show animal/i }).click();
    await expect(page.getByText(/Year 1994/)).toBeVisible();
  });

  test("self-care-wheel: filter chips rebuild pool", async ({ page }) => {
    await page.goto("/self-care-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: "5 minutes" })).toBeVisible({
      timeout: 30_000,
    });
    await page.getByRole("button", { name: "Movement" }).click();
    // Entries list may be collapsed on mobile; pool rebuild still updates inputs.
    await expect(page.locator('input[value="Ten-minute walk"]')).toHaveCount(1);
    await expect(page.locator("canvas").first()).toBeVisible();
  });

  test("outfit-picker-wheel: occasion + weather toggles", async ({ page }) => {
    await page.goto("/outfit-picker-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: "Work" })).toBeVisible({
      timeout: 30_000,
    });
    await page.getByRole("button", { name: "Work" }).click();
    await page.getByRole("button", { name: "Rain" }).click();
    await expect(page.getByText(/looks match/i)).toBeVisible();
  });

  test("pokemon-randomizer-wheel: challenge pools", async ({ page }) => {
    await page.goto("/pokemon-randomizer-wheel", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.getByRole("button", { name: "Nuzlocke-style" })).toBeVisible({
      timeout: 30_000,
    });
    await page.getByRole("button", { name: "Nuzlocke-style" }).click();
    await expect(page.locator("canvas").first()).toBeVisible();
  });

  test("should-i-text-him-wheel: context chips", async ({ page }) => {
    await page.goto("/should-i-text-him-wheel", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.getByRole("button", { name: "High emotion" })).toBeVisible({
      timeout: 30_000,
    });
    await page.getByRole("button", { name: "High emotion" }).click();
    await expect(page.locator('input[value="Do not text tonight"]')).toHaveCount(1);
    await expect(
      page.getByText(/After a spin, a short cooldown locks the wheel/i)
    ).toBeVisible();
  });
});
