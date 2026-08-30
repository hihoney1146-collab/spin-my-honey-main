import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

async function openEntriesPanel(page: import("@playwright/test").Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const expand = page.locator("#entries-list-heading");
  if (await expand.isVisible().catch(() => false)) {
    const expanded = await expand.getAttribute("aria-expanded");
    if (expanded !== "true") await expand.click();
  }
  const inputs = page.getByRole("textbox", { name: /Entry name/i });
  await expect(inputs.first()).toBeVisible({ timeout: 30_000 });
  return inputs;
}

test.describe("Mode card ↔ Manage Entries sync", () => {
  test("winner-picker: paste handles updates wheel and panel", async ({ page }) => {
    await page.goto("/winner-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#winner-paste").fill("@alex\n@jordan\n@sam");
    await expect(page.getByText("3 unique entrants on the wheel")).toBeVisible();
    const inputs = await openEntriesPanel(page);
    await expect(inputs).toHaveCount(3);
    await expect(inputs.nth(0)).toHaveValue("@alex");
    await expect(inputs.nth(1)).toHaveValue("@jordan");
    await expect(inputs.nth(2)).toHaveValue("@sam");
  });

  test("winner-picker: panel edit updates mode card", async ({ page }) => {
    await page.goto("/winner-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#winner-paste").fill("@alex\n@jordan\n@sam");
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("@casey");
    await expect(page.locator("#winner-paste")).toHaveValue("@casey\n@jordan\n@sam");
    await expect(page.getByText("3 unique entrants on the wheel")).toBeVisible();
  });

  test("team-generator: mode card and panel stay synced", async ({ page }) => {
    await page.goto("/team-generator-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#team-names").fill("Chris\nDana\nEvan");
    await expect(page.getByText("On the wheel now (3)")).toBeVisible();
    const inputs = await openEntriesPanel(page);
    await expect(inputs).toHaveCount(3);
    await inputs.nth(2).fill("Frank");
    await expect(page.locator("#team-names")).toContainText("Frank");
  });

  test("random-name-picker: live list updates wheel", async ({ page }) => {
    await page.goto("/random-name-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#name-list").fill("Mia\nNoah\nOlivia");
    const inputs = await openEntriesPanel(page);
    await expect(inputs.nth(0)).toHaveValue("Mia");
    await expect(inputs.nth(2)).toHaveValue("Olivia");
  });
});

test.describe("Duplicate entry policies", () => {
  test("winner-picker dedupes duplicate handles", async ({ page }) => {
    await page.goto("/winner-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#winner-paste").fill("@alex\n@alex\n@jordan");
    await expect(page.getByText("2 unique entrants on the wheel")).toBeVisible();
    await expect(page.getByText(/1 duplicate entr/i)).toBeVisible();
  });

  test("team-generator warns on duplicate names but keeps slices", async ({ page }) => {
    await page.goto("/team-generator-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#team-names").fill("Alex\nAlex\nJordan");
    await expect(page.getByText(/1 duplicate name/i)).toBeVisible();
    await expect(page.getByText("On the wheel now (3)")).toBeVisible();
  });

  test("raffle-wheel dedupes pasted ticket numbers", async ({ page }) => {
    await page.goto("/raffle-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#ticket-paste").fill("#001\n#001\n#002");
    await expect(page.getByText(/1 duplicate entr/i)).toBeVisible();
    await expect(page.getByText("2 entrants on the wheel")).toBeVisible();
  });
});

test.describe("Random number wheel unified pool", () => {
  test("min/max change updates wheel entries immediately", async ({ page }) => {
    await page.goto("/random-number-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#num-max").fill("5");
    await expect(page.getByText("On the wheel now (5)")).toBeVisible();
    const inputs = await openEntriesPanel(page);
    await expect(inputs).toHaveCount(5);
    await expect(inputs.nth(0)).toHaveValue("1");
    await expect(inputs.nth(4)).toHaveValue("5");
  });

  test("panel edit updates mode card counter", async ({ page }) => {
    await page.goto("/random-number-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#num-max").fill("4");
    const inputs = await openEntriesPanel(page);
    await inputs.nth(3).fill("99");
    await expect(page.getByText("On the wheel now (4)")).toBeVisible();
    await expect(inputs.nth(3)).toHaveValue("99");
  });

  test("no-repeat shrinks shared pool for button pick", async ({ page }) => {
    await page.goto("/random-number-wheel", { waitUntil: "domcontentloaded" });
    await page.locator("#num-max").fill("3");
    await page.locator("#no-repeat").click();
    await page.getByRole("button", { name: /Pick random number/i }).click();
    await expect(page.getByText("On the wheel now (2)")).toBeVisible();
    const inputs = await openEntriesPanel(page);
    await expect(inputs).toHaveCount(2);
  });
});

async function expectOnWheelCount(
  page: import("@playwright/test").Page,
  count: number,
) {
  await expect(page.getByText(`On the wheel now (${count})`)).toBeVisible();
}

test.describe("Filter/chip wheel ↔ Manage Entries sync", () => {
  test("self-care: chip rebuilds pool and panel", async ({ page }) => {
    await page.goto("/self-care-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: "5 minutes" })).toBeVisible({
      timeout: 30_000,
    });
    await page.getByRole("button", { name: "Movement" }).click();
    await expectOnWheelCount(page, 6);
    const inputs = await openEntriesPanel(page);
    await expect(inputs).toHaveCount(6);
    await expect(inputs.nth(0)).toHaveValue("Ten-minute walk");
  });

  test("self-care: panel edit updates wheel preview list", async ({ page }) => {
    await page.goto("/self-care-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Movement" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("Custom stretch break");
    await expect(inputs.nth(0)).toHaveValue("Custom stretch break");
    await expect(page.getByText("Custom stretch break")).toBeVisible();
    await expectOnWheelCount(page, 6);
  });

  test("self-care: chip switch replaces manual edits", async ({ page }) => {
    await page.goto("/self-care-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Movement" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("Custom stretch break");
    await page.getByRole("button", { name: "No spend" }).click();
    await expect(inputs.nth(0)).toHaveValue("Free walk around the block");
    await expect(page.getByText("Custom stretch break")).toHaveCount(0);
  });

  test("dinner-picker: chip rebuilds pool and panel", async ({ page }) => {
    await page.goto("/dinner-picker-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Italian pasta")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Leftovers" }).click();
    await expectOnWheelCount(page, 6);
    const inputs = await openEntriesPanel(page);
    await expect(inputs.nth(0)).toHaveValue("Remix leftovers into a bowl");
    await expect(page.getByText("Fried rice with leftovers")).toBeVisible();
  });

  test("dinner-picker: panel edit updates wheel preview list", async ({ page }) => {
    await page.goto("/dinner-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Leftovers" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("My leftover stew");
    await expect(page.getByText("My leftover stew")).toBeVisible();
    await expectOnWheelCount(page, 6);
  });

  test("dinner-picker: chip switch replaces manual edits", async ({ page }) => {
    await page.goto("/dinner-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Leftovers" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("My leftover stew");
    await page.getByRole("button", { name: "Cuisine" }).click();
    await expect(inputs.nth(0)).toHaveValue("Italian pasta");
    await expect(page.getByText("My leftover stew")).toHaveCount(0);
  });

  test("outfit-picker: filters rebuild pool and panel", async ({ page }) => {
    await page.goto("/outfit-picker-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: "Work" })).toBeVisible({
      timeout: 30_000,
    });
    await page.getByRole("button", { name: "Work" }).click();
    await page.getByRole("button", { name: "Rain" }).click();
    const inputs = await openEntriesPanel(page);
    await expect(inputs.first()).toBeVisible();
    expect(await inputs.count()).toBeGreaterThanOrEqual(2);
    await expect(page.getByText("Waterproof shell + jeans")).toBeVisible();
  });

  test("outfit-picker: panel edit updates preview list", async ({ page }) => {
    await page.goto("/outfit-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Work" }).click();
    await page.getByRole("button", { name: "Rain" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("Custom rain look");
    await expect(page.getByText("Custom rain look")).toBeVisible();
  });

  test("outfit-picker: filter switch replaces manual edits", async ({ page }) => {
    await page.goto("/outfit-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Work" }).click();
    await page.getByRole("button", { name: "Rain" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("Custom rain look");
    await page.getByRole("button", { name: "Casual" }).click();
    await expect(page.getByText("Custom rain look")).toHaveCount(0);
    await expect(inputs.first()).not.toHaveValue("Custom rain look");
  });

  test("movie-picker: mood chip rebuilds pool and panel", async ({ page }) => {
    await page.goto("/movie-picker-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Feel-good comedy")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "Horror / thriller" }).click();
    const inputs = await openEntriesPanel(page);
    await expect(inputs.nth(0)).toHaveValue("Classic horror");
    await expect(page.getByText("Classic horror")).toBeVisible();
  });

  test("movie-picker: panel edit updates wheel preview list", async ({ page }) => {
    await page.goto("/movie-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Horror / thriller" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("My scary pick");
    await expect(inputs.nth(0)).toHaveValue("My scary pick");
    await expect(page.locator("li").filter({ hasText: "My scary pick" })).toBeVisible();
  });

  test("movie-picker: mood chip replaces manual edits", async ({ page }) => {
    await page.goto("/movie-picker-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Horror / thriller" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("My scary pick");
    await page.getByRole("button", { name: "Cozy" }).click();
    await expect(page.getByText("My scary pick")).toHaveCount(0);
    await expect(inputs.nth(0)).toHaveValue("Feel-good comedy");
  });

  test("date-night: filters rebuild pool and panel", async ({ page }) => {
    await page.goto("/date-night-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Cook together")).toBeVisible({ timeout: 30_000 });
    await page.getByRole("button", { name: "At home" }).click();
    await page.getByRole("button", { name: "Treat night" }).click();
    await expect(page.getByText("Spa-style night in")).toBeVisible();
    const inputs = await openEntriesPanel(page);
    await expect(inputs.nth(0)).toHaveValue("Spa-style night in");
  });

  test("date-night: panel edit updates wheel preview list", async ({ page }) => {
    await page.goto("/date-night-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "At home" }).click();
    await page.getByRole("button", { name: "Treat night" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("Custom treat night");
    await expect(page.getByText("Custom treat night")).toBeVisible();
  });

  test("date-night: filter switch replaces manual edits", async ({ page }) => {
    await page.goto("/date-night-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "At home" }).click();
    await page.getByRole("button", { name: "Treat night" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("Custom treat night");
    await page.getByRole("button", { name: "Go out" }).click();
    await expect(page.getByText("Custom treat night")).toHaveCount(0);
    await expect(inputs.first()).not.toHaveValue("Custom treat night");
  });

  test("pokemon-randomizer: chip rebuilds pool and panel", async ({ page }) => {
    await page.goto("/pokemon-randomizer-wheel", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("button", { name: "Nuzlocke-style" })).toBeVisible({
      timeout: 30_000,
    });
    await page.getByRole("button", { name: "Nuzlocke-style" }).click();
    await expectOnWheelCount(page, 6);
    const inputs = await openEntriesPanel(page);
    await expect(inputs.nth(0)).toHaveValue("First encounter only");
  });

  test("pokemon-randomizer: panel edit updates wheel preview list", async ({ page }) => {
    await page.goto("/pokemon-randomizer-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Nuzlocke-style" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("Hardcore nuzlocke");
    await expect(page.getByText("Hardcore nuzlocke")).toBeVisible();
  });

  test("pokemon-randomizer: chip switch replaces manual edits", async ({ page }) => {
    await page.goto("/pokemon-randomizer-wheel", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Nuzlocke-style" }).click();
    const inputs = await openEntriesPanel(page);
    await inputs.nth(0).fill("Hardcore nuzlocke");
    await page.getByRole("button", { name: "Starters" }).click();
    await expect(inputs.nth(0)).toHaveValue("Grass starter run");
    await expect(page.getByText("Hardcore nuzlocke")).toHaveCount(0);
  });
});
