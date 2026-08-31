import { test, expect } from "@playwright/test";
import path from "path";

async function dismissCookies(page: import("@playwright/test").Page) {
  const accept = page.getByRole("button", { name: "Accept all" });
  await accept.click({ timeout: 8_000 }).catch(() => undefined);
}

async function waitForFlipIdle(page: import("@playwright/test").Page) {
  await expect(page.getByTestId("flip-once")).toBeEnabled({ timeout: 15_000 });
}

test.describe("Coin flip interaction", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/coin-flip-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(page.getByText("Coin flip controls", { exact: true })).toBeVisible({
      timeout: 30_000,
    });
  });

  test("flip via button -> result appears, tally increments", async ({ page }) => {
    await expect(page.getByTestId("coin")).toBeVisible();
    await page.getByTestId("flip-once").click();
    await waitForFlipIdle(page);
    await expect(page.getByTestId("coin-result")).not.toHaveText(
      /Tap the coin or flip button to start/,
    );

    const tally0 = Number(await page.getByTestId("tally-0").locator("p").first().textContent());
    const tally1 = Number(await page.getByTestId("tally-1").locator("p").first().textContent());
    expect(tally0 + tally1).toBe(1);
  });

  test("flip via coin click", async ({ page }) => {
    await page.getByTestId("coin").click();
    await waitForFlipIdle(page);
    const tally0 = Number(await page.getByTestId("tally-0").locator("p").first().textContent());
    const tally1 = Number(await page.getByTestId("tally-1").locator("p").first().textContent());
    expect(tally0 + tally1).toBe(1);
  });

  test("flip via Space keyboard shortcut", async ({ page }) => {
    await page.getByTestId("coin").click();
    await waitForFlipIdle(page);
    await page.keyboard.press("Space");
    await waitForFlipIdle(page);
    const tally0 = Number(await page.getByTestId("tally-0").locator("p").first().textContent());
    const tally1 = Number(await page.getByTestId("tally-1").locator("p").first().textContent());
    expect(tally0 + tally1).toBe(2);
  });

  test("rename both sides -> streak and tally track across several flips", async ({
    page,
  }) => {
    await page.getByTestId("coin-label-0").fill("Team Blue");
    await page.getByTestId("coin-label-1").fill("Team Gold");

    for (let i = 0; i < 3; i++) {
      await page.getByTestId("flip-once").click();
      await waitForFlipIdle(page);
    }

    const result = await page.getByTestId("coin-result").textContent();
    expect(result?.includes("Team Blue") || result?.includes("Team Gold")).toBe(true);

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
      }, { timeout: 30_000 })
      .toBe(5);

    await expect(page.getByTestId("flip-multi")).toBeEnabled();
    const sequence = await page.getByTestId("flip-sequence").textContent();
    const parts = (sequence ?? "").split(" · ").filter(Boolean);
    expect(parts.length).toBe(5);
  });
});

test.describe("Coin flip advanced features", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/coin-flip-wheel", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
  });

  test("toss mode announces toss winner", async ({ page }) => {
    await page.getByTestId("coin-label-0").fill("Team A");
    await page.getByTestId("coin-label-1").fill("Team B");
    await page.getByTestId("toss-mode").click();
    await page.getByTestId("toss-caller").selectOption("0");
    await page.getByTestId("toss-call").selectOption("0");
    await page.getByTestId("flip-once").click();
    await waitForFlipIdle(page);

    const result = await page.getByTestId("coin-result").textContent();
    expect(result).toMatch(/wins the toss!/);
    expect(result === "Team A wins the toss!" || result === "Team B wins the toss!").toBe(true);
    await expect(page.getByTestId("coin-journal")).toBeVisible();
  });

  test("journal records flips and can be cleared", async ({ page }) => {
    await page.getByTestId("flip-once").click();
    await waitForFlipIdle(page);
    await page.getByTestId("flip-once").click();
    await waitForFlipIdle(page);
    await expect(page.getByTestId("coin-journal")).toContainText("2 decisions");
    await page.getByRole("button", { name: "Clear" }).click();
    await expect(page.getByTestId("coin-journal")).toHaveCount(0);
  });

  test("edge landing does not increment tally", async ({ page }) => {
    await page.addInitScript(() => {
      window.__COIN_FLIP_FORCE_EDGE__ = true;
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await page.getByTestId("flip-once").click();
    await expect(page.getByTestId("coin-result")).toHaveText("It landed on its edge!", {
      timeout: 15_000,
    });
    const tally0 = Number(await page.getByTestId("tally-0").locator("p").first().textContent());
    const tally1 = Number(await page.getByTestId("tally-1").locator("p").first().textContent());
    expect(tally0 + tally1).toBe(0);
  });

  test("face image upload via visible button stays local", async ({ page }) => {
    const uploads: string[] = [];
    page.on("request", (req) => {
      if (!["POST", "PUT", "PATCH"].includes(req.method())) return;
      const url = new URL(req.url());
      if (/gstatic|google|doubleclick|googlesyndication/i.test(url.hostname)) {
        return;
      }
      uploads.push(req.url());
    });

    await expect(page.getByTestId("coin-face-upload-0")).toBeVisible();
    const pngPath = path.join(process.cwd(), "public", "logo.png");
    await page.getByTestId("coin-face-input-0").setInputFiles(pngPath);
    await page.getByTestId("flip-once").click();
    await waitForFlipIdle(page);

    expect(uploads).toHaveLength(0);
  });

  test("uploaded face images render on the coin — not only in upload preview", async ({
    page,
  }) => {
    const pngPath = path.join(process.cwd(), "public", "logo.png");

    await page.getByTestId("coin-face-input-0").setInputFiles(pngPath);
    await expect(page.getByTestId("coin-face-remove-0")).toBeVisible({ timeout: 10_000 });
    const coinFaceA = page.getByTestId("coin").getByTestId("coin-face-image-0");
    await expect(coinFaceA).toBeVisible();
    await expect(coinFaceA).toHaveAttribute("src", /^blob:/);

    await page.getByTestId("coin-face-input-1").setInputFiles(pngPath);
    await expect(page.getByTestId("coin-face-remove-1")).toBeVisible({ timeout: 10_000 });
    const coinFaceB = page.getByTestId("coin").getByTestId("coin-face-image-1");
    await expect(coinFaceB).toBeVisible();
    await expect(coinFaceB).toHaveAttribute("src", /^blob:/);

    await page.getByTestId("flip-once").click();
    await waitForFlipIdle(page);
    await expect(page.getByTestId("coin").getByTestId("coin-face-image-0")).toBeVisible();
    await expect(page.getByTestId("coin").getByTestId("coin-face-image-1")).toBeVisible();

    await page.getByTestId("coin-face-remove-0").click();
    await expect(page.getByTestId("coin").getByTestId("coin-face-image-0")).toHaveCount(0);
    await expect(page.getByTestId("coin").getByTestId("coin-face-0")).toBeVisible();
    await expect(page.getByTestId("coin").getByTestId("coin-face-image-1")).toBeVisible();
  });

  test("mixed face state: image on one side, preset on the other", async ({ page }) => {
    const pngPath = path.join(process.cwd(), "public", "logo.png");
    await page.getByTestId("coin-face-input-0").setInputFiles(pngPath);
    await expect(page.getByTestId("coin-face-remove-0")).toBeVisible({ timeout: 10_000 });

    await expect(page.getByTestId("coin").getByTestId("coin-face-image-0")).toBeVisible();
    await expect(page.getByTestId("coin").getByTestId("coin-face-image-1")).toHaveCount(0);
    await expect(page.getByTestId("coin").getByTestId("coin-face-1")).toBeVisible();
  });

  test("face images are excluded from proof links", async ({ page }) => {
    const pngPath = path.join(process.cwd(), "public", "logo.png");
    await page.getByTestId("coin-face-input-0").setInputFiles(pngPath);
    await page.getByTestId("flip-once").click();
    await waitForFlipIdle(page);
    await expect(page.getByTestId("coin-result-card")).toBeVisible();

    await page.getByTestId("coin-proof-link").click();
    const proofUrl = await page.getByTestId("coin-proof-url").textContent();
    expect(proofUrl).toBeTruthy();
    expect(proofUrl).not.toMatch(/blob:/);

    await page.goto(proofUrl!.trim(), { waitUntil: "domcontentloaded" });
    const html = await page.content();
    expect(html).not.toMatch(/blob:/);
  });

  test("AudioContext initializes only after user interaction", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __coinAudioContextCount: number }).__coinAudioContextCount =
        0;
      const Orig =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Orig) return;
      const Patched = function (
        this: AudioContext,
        ...args: ConstructorParameters<typeof AudioContext>
      ) {
        (window as unknown as { __coinAudioContextCount: number }).__coinAudioContextCount +=
          1;
        return new Orig(...args);
      };
      Patched.prototype = Orig.prototype;
      window.AudioContext = Patched as typeof AudioContext;
    });

    await page.reload({ waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await expect(page.getByText("Coin flip controls", { exact: true })).toBeVisible({
      timeout: 30_000,
    });

    const before = await page.evaluate(
      () =>
        (window as unknown as { __coinAudioContextCount?: number })
          .__coinAudioContextCount ?? 0,
    );
    expect(before).toBe(0);

    await page.getByTestId("coin-sound-toggle").click();

    const after = await page.evaluate(
      () =>
        (window as unknown as { __coinAudioContextCount?: number })
          .__coinAudioContextCount ?? 0,
    );
    expect(after).toBeGreaterThanOrEqual(1);
  });

  test("sound toggle defaults off and can enable", async ({ page }) => {
    await expect(page.getByTestId("coin-sound-toggle")).toContainText("Sound off");
    await page.getByTestId("coin-sound-toggle").click();
    await expect(page.getByTestId("coin-sound-toggle")).toContainText("Sound on");
  });
});
