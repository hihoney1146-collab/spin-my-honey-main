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
