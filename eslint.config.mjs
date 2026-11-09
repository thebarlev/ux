import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".contentlayer/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 052: Node check scripts run by hand against the site, not site code
    "scripts/checks/**",
  ]),
]);

export default eslintConfig;
