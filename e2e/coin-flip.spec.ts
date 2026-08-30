import { test, expect } from "@playwright/test";

async function dismissCookies(page: import("@playwright/test").Page) {
  const accept = page.getByRole("button", { name: "Accept all" });
  await accept.click({ timeout: 8_000 }).catch(() => undefined);
}

test.describe("Coin flip interaction", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/coin-flip-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(page.getByText("Coin flip controls", { exact: true })).toBeVisible({
      timeout: 30_000,
    });
  });

  test("flip once -> result appears, tally increments", async ({ page }) => {
    await expect(page.getByTestId("coin")).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);

    await page.getByTestId("flip-once").click();
    await expect(page.getByTestId("coin-result")).not.toHaveText(
      "Tap flip to start",
      { timeout: 10_000 },
    );

    const tally0 = Number(await page.getByTestId("tally-0").locator("p").first().textContent());
    const tally1 = Number(await page.getByTestId("tally-1").locator("p").first().textContent());
    expect(tally0 + tally1).toBe(1);
  });

  test("rename both sides -> streak and tally track across several flips", async ({
    page,
  }) => {
    await page.getByTestId("coin-label-0").fill("Team Blue");
    await page.getByTestId("coin-label-1").fill("Team Gold");

    for (let i = 0; i < 3; i++) {
      await page.getByTestId("flip-once").click();
      await expect(page.getByTestId("flip-once")).toBeDisabled();
      await expect(page.getByTestId("flip-once")).toBeEnabled({ timeout: 10_000 });
    }

    const result = await page.getByTestId("coin-result").textContent();
    expect(result === "Team Blue" || result === "Team Gold").toBe(true);

    const tally0 = Number(await page.getByTestId("tally-0").locator("p").first().textContent());
    const tally1 = Number(await page.getByTestId("tally-1").locator("p").first().textContent());
    expect(tally0 + tally1).toBe(3);

    const streak = Number(await page.getByTestId("streak").locator("p").first().textContent());
    expect(streak).toBeGreaterThanOrEqual(1);
    expect(streak).toBeLessThanOrEqual(3);
  });

  test("multi-flip returns the requested count", async ({ page }) => {
    await page.getByTestId("multi-count").fill("5");
    await expect(page.getByTestId("flip-multi")).toContainText("Flip 5 times");
    await page.getByTestId("flip-multi").click();
    await expect(page.getByTestId("flip-multi")).toBeDisabled();

    await expect
      .poll(async () => {
        const t0 = Number(
          await page.getByTestId("tally-0").locator("p").first().textContent(),
        );
        const t1 = Number(
          await page.getByTestId("tally-1").locator("p").first().textContent(),
        );
        return t0 + t1;
      }, { timeout: 20_000 })
      .toBe(5);

    await expect(page.getByTestId("flip-multi")).toBeEnabled();
    const sequence = await page.getByTestId("flip-sequence").textContent();
    const parts = (sequence ?? "").split(" · ").filter(Boolean);
    expect(parts.length).toBe(5);
  });
});
