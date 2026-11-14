import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

/**
 * E2E suite, against a production build. The site has no form (client
 * decision, 2026-11-13), so the mandatory coverage is its contact actions:
 * every WhatsApp and email link, plus navigation and accessibility.
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 240_000,
    reuseExistingServer: false,
    env: {
      NEXT_PUBLIC_SITE_URL: `http://localhost:${PORT}`,
    },
  },
});
