import { test, expect } from "@playwright/test";

/** base64url of "Alpha|Bravo|Charlie" — same encoding as wheelShareUrl.encodeWheelEntries */
const SHARE_E = "QWxwaGF8QnJhdm98Q2hhcmxpZQ";

test.describe("URL hygiene — share params", () => {
  test("homepage stays clean through edits; inbound ?e= hydrates then strips", async ({
    page,
  }) => {
    await page.goto(`/?e=${SHARE_E}&d=5`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("canvas").first()).toBeVisible({ timeout: 30_000 });
    await expect
      .poll(() => new URL(page.url()).searchParams.has("e"), { timeout: 10_000 })
      .toBe(false);
    await expect
      .poll(() => new URL(page.url()).searchParams.has("d"))
      .toBe(false);
    await expect(page.locator('input[value="Alpha"]')).toHaveCount(1);

    const alpha = page.locator('input[value="Alpha"]');
    if (!(await alpha.isVisible())) {
      await page.getByRole("button", { name: /Expand entries list/i }).click();
    }
    await alpha.fill("AlphaEdit");
    await page.waitForTimeout(600);
    expect(new URL(page.url()).search).not.toMatch(/[?&]e=/);
    expect(new URL(page.url()).pathname).toBe("/");
  });

  test("wheel page does not write e= on weight change", async ({ page }) => {
    await page.goto("/yes-or-no-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.locator("canvas").first()).toBeVisible({ timeout: 30_000 });
    await page.locator("#w-yes").fill("4");
    await page.waitForTimeout(600);
    expect(new URL(page.url()).search).not.toMatch(/[?&]e=/);
    expect(new URL(page.url()).pathname).toBe("/yes-or-no-wheel");
  });
});

test.describe("Secret Santa wheel + assignment mode", () => {
  test("participants drive wheel; spin and generate assignments both work", async ({
    page,
  }) => {
    await page.goto("/secret-santa-wheel-generator", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByText("Secret Santa assignment mode", { exact: true }),
    ).toBeVisible({ timeout: 30_000 });
    await page.locator("#santa-names").fill("Pat\nQuinn\nRiley\nSam");
    await expect(page.getByText(/On the wheel now \(4\)/)).toBeVisible();
    await expect(page.locator("canvas").first()).toBeVisible();
    await expect(page.locator('input[value="Pat"]')).toHaveCount(1);

    await page.getByRole("button", { name: "SPIN THE WHEEL", exact: true }).click();
    await expect(
      page.getByRole("button", { name: /Remove Winner/i }),
    ).toBeVisible({ timeout: 25_000 });
    await page.getByRole("button", { name: "Close", exact: true }).first().click();

    await page.getByRole("button", { name: /Generate assignments/i }).click();
    await expect(
      page.getByRole("heading", { name: "Per-person reveal links", exact: true }),
    ).toBeVisible({ timeout: 10_000 });
    await expect(
      page.getByRole("button", { name: /Copy reveal link/i }).first(),
    ).toBeVisible();
  });
});
