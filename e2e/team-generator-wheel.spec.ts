import { test, expect } from "@playwright/test";

test.describe("Team generator wheel + assignment mode", () => {
  test("participants drive wheel; spin and generate teams both work", async ({
    page,
  }) => {
    await page.goto("/team-generator-wheel", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByText("Balanced team generator", { exact: true }),
    ).toBeVisible({ timeout: 30_000 });
    await page.locator("#team-names").fill("Pat\nQuinn\nRiley\nSam");
    await expect(page.getByText(/On the wheel now \(4\)/)).toBeVisible();
    await expect(page.locator("canvas").first()).toBeVisible();
    await expect(page.locator('input[value="Pat"]')).toHaveCount(1);

    await page.getByRole("button", { name: "SPIN THE WHEEL", exact: true }).click();
    await expect(
      page.getByRole("button", { name: /Remove Winner/i }),
    ).toBeVisible({ timeout: 25_000 });
    await page.getByRole("button", { name: "Close", exact: true }).first().click();

    await page.getByRole("button", { name: /Generate teams/i }).click();
    await expect(page.getByText(/Team 1/)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/Team 2/)).toBeVisible();
  });
});
