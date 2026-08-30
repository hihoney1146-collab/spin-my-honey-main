import { test, expect } from "@playwright/test";
import path from "path";

async function dismissCookies(page: import("@playwright/test").Page) {
  const accept = page.getByRole("button", { name: "Accept all" });
  await accept.click({ timeout: 8_000 }).catch(() => undefined);
}

test.describe("Coin flip power features", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/coin-flip-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(page.getByText("Coin flip controls", { exact: true })).toBeVisible({
      timeout: 30_000,
    });
  });

  test("labels + question -> flip -> result card -> proof link matches", async ({
    page,
  }) => {
    await page.getByTestId("coin-label-0").fill("Alpha");
    await page.getByTestId("coin-label-1").fill("Beta");
    await page.getByTestId("coin-question").fill("Who goes first?");

    await page.getByTestId("flip-once").click();
    await expect(page.getByTestId("flip-once")).toBeEnabled({ timeout: 10_000 });
    await expect(page.getByTestId("coin-result-card")).toBeVisible();

    await expect(page.getByTestId("result-card-question")).toHaveText(
      "Who goes first?",
    );
    await expect(page.getByTestId("result-card-label-0")).toHaveText("Alpha");
    await expect(page.getByTestId("result-card-label-1")).toHaveText("Beta");

    const winner = await page.getByTestId("result-card-winner").textContent();
    expect(winner === "Alpha" || winner === "Beta").toBe(true);

    await page.getByTestId("coin-proof-link").click();
    const proofUrl = await page.getByTestId("coin-proof-url").textContent();
    expect(proofUrl).toMatch(/\/result\//);

    await page.goto(proofUrl!.trim(), { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Coin flip proof record")).toBeVisible();
    await expect(page.getByText("Who goes first?")).toBeVisible();
    await expect(page.locator('dt:text("Side A") + dd')).toHaveText("Alpha");
    await expect(page.locator('dt:text("Side B") + dd')).toHaveText("Beta");
    await expect(page.locator('dt:text("Winner") + dd')).toHaveText(winner!.trim());
  });

  test("face image upload stays local — no upload network calls", async ({
    page,
  }) => {
    const uploads: string[] = [];
    page.on("request", (req) => {
      if (!["POST", "PUT", "PATCH"].includes(req.method())) return;
      const url = new URL(req.url());
      if (/gstatic|google|doubleclick|googlesyndication/i.test(url.hostname)) {
        return;
      }
      uploads.push(req.url());
    });

    const pngPath = path.join(process.cwd(), "public", "logo.png");
    await page.getByTestId("coin-face-input-0").setInputFiles(pngPath);
    await page.getByTestId("flip-once").click();
    await expect(page.getByTestId("flip-once")).toBeEnabled({ timeout: 10_000 });

    expect(uploads).toHaveLength(0);
  });

  test("weighted odds text updates with slider", async ({ page }) => {
    const slider = page.getByTestId("coin-weight-slider");
    const box = await slider.boundingBox();
    expect(box).not.toBeNull();
    await slider.click({
      position: { x: Math.floor(box!.width * 0.7), y: Math.floor(box!.height / 2) },
    });
    await expect(page.getByTestId("coin-odds")).toContainText("%");
    await expect(page.getByTestId("coin-odds")).not.toHaveText(
      "50% Heads / 50% Tails",
    );
  });
});
