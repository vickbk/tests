import { defineConfig, type OutExtensionContext } from "tsdown";

const shared = {
  dts: true,
  sourcemap: true,
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
  outExtensions({ format }: OutExtensionContext) {
    return { js: format === "cjs" ? ".cjs" : ".mjs" };
  },
};

export default defineConfig([
  {
    ...shared,
    entry: {
      index: "src/index.ts",
      react: "src/features/react/index.ts",
      playwright: "src/features/playwright/index.ts",
      promises: "src/features/promises/index.ts",
    },
    format: ["cjs", "esm"],
    clean: true,
  },
  {
    ...shared,
    entry: {
      vitest: "src/features/vitest/index.ts",
      "vitest/console": "src/features/vitest/modules/console/index.ts",
      "vitest/dom": "src/features/vitest/modules/dom/index.ts",
    },
    format: ["esm"],
    clean: false,
  },
]);
