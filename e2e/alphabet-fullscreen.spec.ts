import { test, expect } from "@playwright/test";

async function dismissCookies(page: import("@playwright/test").Page) {
  const accept = page.getByRole("button", { name: "Accept all" });
  await accept.click({ timeout: 8_000 }).catch(() => undefined);
}

test.describe("Alphabet spinner projector fullscreen", () => {
  test("open fullscreen -> wheel visible and spinnable -> exit", async ({
    page,
  }) => {
    await page.goto("/alphabet-spinner-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(page.getByText("Exclude letters", { exact: true })).toBeVisible({
      timeout: 30_000,
    });
    await expect(page.locator("canvas").first()).toBeVisible();

    await page.getByRole("button", { name: /Projector fullscreen/i }).click();
    await expect(page.getByRole("button", { name: /Exit projector/i })).toBeVisible();
    await expect(page.locator("canvas").first()).toBeVisible();

    await page.getByRole("button", { name: "TAP TO SPIN", exact: true }).click();
    await expect(
      page.getByRole("button", { name: /Remove Winner/i }),
    ).toBeVisible({ timeout: 25_000 });
    await page.getByRole("button", { name: "Close", exact: true }).first().click();

    await page.getByRole("button", { name: /Exit projector/i }).click();
    await expect(
      page.getByRole("button", { name: /Projector fullscreen/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "SPIN THE WHEEL", exact: true })).toBeVisible();
  });
});
