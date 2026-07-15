import { test, expect } from "@playwright/test";

test("embed wheel remains frameable in an iframe", async ({ page }) => {
  await page.setContent(`
    <!DOCTYPE html>
    <html><body style="margin:0">
      <iframe
        id="embed"
        title="Embed wheel"
        src="http://127.0.0.1:4173/embed/yes-or-no-wheel"
        width="800"
        height="600"
      ></iframe>
    </body></html>
  `);

  const frame = page.frameLocator("#embed");
  await expect(frame.getByRole("button", { name: /spin/i }).first()).toBeVisible({
    timeout: 30_000,
  });
});
