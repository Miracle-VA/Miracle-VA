import { expect, test } from "@playwright/test";

test.describe("Case samples", () => {
  test("real estate case shows its graphics and reels, protected", async ({ page }) => {
    await page.goto("/work/real-estate-construction");
    const samples = page.locator("section", { has: page.getByRole("heading", { name: "Samples", exact: true }) });
    await expect(samples.locator("img")).toHaveCount(4);
    const videos = samples.locator("video");
    await expect(videos).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      const v = videos.nth(i);
      await expect(v).toHaveAttribute("controlslist", /nodownload/);
      await expect(v).toHaveAttribute("preload", "none");
      await expect(v).toHaveAttribute("poster", /-poster\.jpg$/);
      await expect(v).toHaveAttribute("aria-label", /.+/);
    }
    const res = await page.request.get((await videos.first().getAttribute("src"))!);
    expect(res.ok()).toBe(true);
    expect(res.headers()["content-type"]).toContain("video/mp4");
  });

  test("social media case shows its samples", async ({ page }) => {
    await page.goto("/work/social-media-content");
    const samples = page.locator("section", { has: page.getByRole("heading", { name: "Samples", exact: true }) });
    await expect(samples.locator("img")).toHaveCount(3);
    await expect(samples.locator("video")).toHaveCount(2);
  });

  test("cases without samples show no samples section", async ({ page }) => {
    await page.goto("/work/google-ads-booked-appointments");
    await expect(page.getByRole("heading", { name: "Samples", exact: true })).toHaveCount(0);
  });
});
