import { expect, test } from "@playwright/test";

test.describe("Home", () => {
  test("the services marquee loops and has a working pause control", async ({ page }) => {
    await page.goto("/");
    const band = page.locator("[data-marquee]");
    await band.scrollIntoViewIfNeeded();
    const track = band.locator(".marquee-track");
    await expect(track).toHaveCSS("animation-name", "marquee");

    const pause = band.getByRole("button", { name: "Pause the services ticker" });
    await expect(pause).toHaveAttribute("aria-pressed", "false");
    await pause.click();
    await expect(band).toHaveAttribute("data-paused", "");
    await expect(track).toHaveCSS("animation-play-state", "paused");

    const play = band.getByRole("button", { name: "Play the services ticker" });
    await play.click();
    await expect(band).not.toHaveAttribute("data-paused", "");
  });

  test("testimonials are text, never screenshots", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section", { has: page.getByRole("heading", { name: "In my clients' words" }) });
    await expect(section.locator("blockquote")).toHaveCount(7);
    await expect(section.locator("img")).toHaveCount(0);
  });

  test("photos can't be right-clicked or dragged; text can", async ({ page }) => {
    await page.goto("/about");
    const blocked = await page.evaluate(() => {
      const fire = (el: Element, type: string) => {
        const ev = new MouseEvent(type, { bubbles: true, cancelable: true });
        el.dispatchEvent(ev);
        return ev.defaultPrevented;
      };
      const img = document.querySelector("main img")!;
      const text = document.querySelector("main p")!;
      return { menu: fire(img, "contextmenu"), drag: fire(img, "dragstart"), text: fire(text, "contextmenu") };
    });
    expect(blocked).toEqual({ menu: true, drag: true, text: false });
  });
});
