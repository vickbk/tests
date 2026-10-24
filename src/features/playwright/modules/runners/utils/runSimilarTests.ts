import test from "@playwright/test";
import type { SimpleTest } from "../types";

/**
 * Registers tests that share the same page navigation and setup.
 *
 * @param tests Tuples of test names followed by page callbacks.
 * @returns Nothing; registers one Playwright test for each tuple.
 * @example
 * ```ts
 * runSimilarTests([
 *   ["shows the home page", async (page) => {
 *     await page.getByRole("heading", { name: "Home" }).waitFor();
 *   }],
 * ]);
 * ```
 */
export function runSimilarTests(...tests: SimpleTest[]) {
  tests.forEach(([testName, ...testFunctions]) =>
    test(testName, async ({ page }) => {
      await page.goto("/");
      for (const testFunction of testFunctions) await testFunction(page);
    }),
  );
}
