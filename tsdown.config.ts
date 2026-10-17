import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    regex: "src/shared/regex/index.ts",
    vitest: "src/features/vitest/index.ts",
    playwright: "src/features/playwright/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "node20",
  treeshake: true,
  deps: {
    neverBundle: [
      "vitest",
      "@testing-library/jest-dom",
      "@testing-library/react",
      "@testing-library/user-event",
      "react",
      "react-dom",
      "@playwright/test",
    ],
  },
  outExtensions({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".mjs" };
  },
});
