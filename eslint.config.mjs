import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

// jsx-a11y is registered by eslint-config-next; raise every rule its
// recommended set enables to error level (build-system/03, Accessibility
// Implementation). Rules the set deliberately turns off (deprecated ones such
// as label-has-for) stay off.
const a11yAsErrors = Object.fromEntries(
  Object.entries(jsxA11y.flatConfigs.recommended.rules)
    .filter(([, setting]) => (Array.isArray(setting) ? setting[0] : setting) !== "off")
    .map(([rule, setting]) => [rule, Array.isArray(setting) ? ["error", ...setting.slice(1)] : "error"]),
);

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      ...a11yAsErrors,
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
