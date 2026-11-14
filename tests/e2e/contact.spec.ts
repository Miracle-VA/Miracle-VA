import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const GMAIL = /^https:\/\/mail\.google\.com\/mail\/\?view=cm&fs=1&to=mangsalmiracle%40gmail\.com&/;
const WHATSAPP = /^https:\/\/api\.whatsapp\.com\/send\?phone=639916758363&text=/;

/**
 * Contact without a form (client decision, 2026-11-13): every email action
 * opens Gmail compose addressed to her, in a new tab.
 */
test.describe("Contact actions", () => {
  test("every email link opens Gmail compose with her address", async ({ page }) => {
    for (const path of ["/", "/services", "/work", "/about", "/contact", "/privacy"]) {
      await page.goto(path);
      const links = page.locator('a[href*="mail.google.com"]');
      const count = await links.count();
      expect(count, `email links on ${path}`).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(links.nth(i)).toHaveAttribute("href", GMAIL);
        await expect(links.nth(i)).toHaveAttribute("target", "_blank");
        await expect(links.nth(i)).toHaveAttribute("rel", /noopener/);
      }
      expect(await page.locator('a[href^="mailto:"]').count(), `mailto links on ${path}`).toBe(0);
    }
  });

  test("the contact page offers WhatsApp and email, and no form", async ({ page }) => {
    await page.goto("/contact");
    const main = page.getByRole("main");
    await expect(main.getByRole("link", { name: "Let's Work Together" })).toHaveAttribute("href", WHATSAPP);
    await expect(main.getByRole("link", { name: "Email me" })).toHaveAttribute("href", GMAIL);
    await expect(page.locator("form")).toHaveCount(0);
  });

  test("the old thank-you page is gone", async ({ page }) => {
    const res = await page.goto("/contact/thank-you");
    expect(res?.status()).toBe(404);
  });

  test("contact page has no serious accessibility violations", async ({ page }) => {
    await page.goto("/contact");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, JSON.stringify(serious.map((v) => [v.id, v.nodes.length]), null, 2)).toEqual([]);
  });
});
