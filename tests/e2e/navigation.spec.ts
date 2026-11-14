import { expect, test } from "@playwright/test";

const WHATSAPP = /^https:\/\/api\.whatsapp\.com\/send\?phone=639916758363&text=/;

test.describe("Navigation and calls to action", () => {
  test("returning Home from another page lands at the top, not mid-page", async ({ page }, info) => {
    await page.goto("/");
    await page.locator("#outcomes-heading").scrollIntoViewIfNeeded();
    await page.evaluate(() => document.getElementById("outcomes-heading")!.scrollIntoView());
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(300);

    if (info.project.name === "desktop") {
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Contact" }).click();
    } else {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Contact" }).click();
    }
    await expect(page).toHaveURL(/\/contact$/);

    await page.getByRole("banner").getByRole("link", { name: "Miracle Joy Mangsal, home" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("opening and closing the mobile menu keeps the reader's place", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "The menu exists below 1024px only");
    await page.goto("/");
    await page.evaluate(() => window.scrollTo({ top: 1500, behavior: "instant" }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(1500);

    // Tap by coordinates, like a thumb (locator.tap() scrolls on its own).
    const tapButton = async (name: string) => {
      const box = await page.getByRole("button", { name }).boundingBox();
      if (!box) throw new Error(`${name} not visible`);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    };

    await tapButton("Open menu");
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await tapButton("Close menu");
    await expect(page.getByRole("dialog", { name: "Menu" })).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(1500);

    await tapButton("Open menu");
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Menu" })).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(1500);
  });

  test("every “Let's Work Together” opens her WhatsApp in a new tab", async ({ page }) => {
    for (const path of ["/", "/services", "/work", "/about", "/contact"]) {
      await page.goto(path);
      const ctas = page.getByRole("link", { name: "Let's Work Together" });
      const count = await ctas.count();
      expect(count, `CTAs on ${path}`).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(ctas.nth(i)).toHaveAttribute("href", WHATSAPP);
        await expect(ctas.nth(i)).toHaveAttribute("target", "_blank");
        await expect(ctas.nth(i)).toHaveAttribute("rel", /noopener/);
      }
    }
  });
});
