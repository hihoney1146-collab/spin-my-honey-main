import { test, expect } from "@playwright/test";

async function dismissCookies(page: import("@playwright/test").Page) {
  const accept = page.getByRole("button", { name: "Accept all" });
  await accept.click({ timeout: 8_000 }).catch(() => undefined);
}

test.describe("Production Tier 1 click-test", () => {
  test("random-name-picker: list, weights, remove, history", async ({ page }) => {
    await page.goto("/random-name-picker-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(page.locator("#name-remove")).toBeVisible({ timeout: 30_000 });
    await expect(page.locator("#name-list")).toBeVisible();
    await page.locator('label[for="name-weights"]').click();
    await page.locator("#name-list").fill("Alex:3\nJordan\nSam:2");
    await page.getByRole("button", { name: /Update wheel from list/i }).click();
    await expect(page.getByText("Alex: weight 3")).toBeVisible();
    await page.getByRole("button", { name: "SPIN THE WHEEL", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Session history" })).toBeVisible({
      timeout: 25_000,
    });
  });

  test("abcd: projector button is visible without extra clicks", async ({ page }) => {
    await page.goto("/abcd-spin-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(
      page.getByRole("button", { name: /Projector fullscreen/i })
    ).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: /Projector fullscreen/i }).click();
    await expect(page.getByRole("button", { name: /Exit projector/i })).toBeVisible();
  });

  test("chinese-zodiac: 1994 highlights Dog", async ({ page }) => {
    await page.goto("/chinese-zodiac-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(page.locator("#cn-year")).toBeVisible({ timeout: 30_000 });
    await page.locator("#cn-year").fill("1994");
    await page.getByRole("button", { name: /Show animal/i }).click();
    await expect(page.getByText(/Year 1994/)).toBeVisible();
    await expect(page.getByText("Dog", { exact: true })).toBeVisible();
  });

  test("self-care + outfit: chips change visible pool", async ({ page }) => {
    await page.goto("/self-care-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(page.getByText("On the wheel now")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText("Drink a full glass of water")).toBeVisible();
    await page.getByRole("button", { name: "Movement" }).click();
    await expect(page.getByText("Ten-minute walk")).toBeVisible();

    await page.goto("/outfit-picker-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await page.getByRole("button", { name: "Work" }).click();
    await page.getByRole("button", { name: "Rain" }).click();
    await expect(page.getByText(/looks match/i)).toBeVisible();
    await expect(page.getByText("Waterproof shell + jeans")).toBeVisible();
  });

  test("pokemon: generation filter changes pool list", async ({ page }) => {
    await page.goto("/pokemon-randomizer-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(page.getByText("Grass starter run")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Generation vibe" }).click();
    await expect(page.getByText("Gen 1 ruleset feel")).toBeVisible();
  });

  test("should-i-text: cooldown blocks immediate re-spin", async ({ page }) => {
    await page.goto("/should-i-text-him-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await page.getByRole("button", { name: "High emotion" }).click();
    await expect(page.getByText("Do not text tonight")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "SPIN THE WHEEL", exact: true }).click();
    await expect(page.getByText(/Cooldown:/i)).toBeVisible({ timeout: 20_000 });
    await expect(page.locator(".pointer-events-none").first()).toBeVisible();
  });
});
