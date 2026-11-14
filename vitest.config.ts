import path from "node:path";
import { defineConfig } from "vitest/config";

/** Unit tests (build-system/03: Vitest + Playwright). E2E lives in tests/e2e. */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
    restoreMocks: true,
  },
});
