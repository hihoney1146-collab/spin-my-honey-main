import { test, expect } from "@playwright/test";

const cases = [
  {
    path: "/random-student-picker",
    sampleSnippet: "Emma",
    hintSnippet: "class roster",
  },
  {
    path: "/winner-picker-wheel",
    sampleSnippet: "@alex_reads",
    hintSnippet: "commenter @handles",
  },
  {
    path: "/raffle-wheel",
    sampleSnippet: "1042",
    hintSnippet: "ticket numbers",
  },
  {
    path: "/dinner-picker-wheel",
    sampleSnippet: "Tacos",
    hintSnippet: "meals or cuisines",
  },
  {
    path: "/movie-picker-wheel",
    sampleSnippet: "Coco",
    hintSnippet: "watchlist",
  },
] as const;

test.describe("Per-wheel bulk-add placeholders", () => {
  for (const { path, sampleSnippet, hintSnippet } of cases) {
    test(`${path} shows page-specific placeholder and hint`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const textarea = page.getByLabel("Paste multiple wheel entries, one per line");
      await expect(textarea).toBeVisible({ timeout: 30_000 });
      await expect(textarea).toHaveAttribute("placeholder", new RegExp(sampleSnippet));
      const hintLine = textarea.locator("xpath=preceding-sibling::p[1]");
      await expect(hintLine).toContainText(new RegExp(hintSnippet, "i"));
    });
  }
});
