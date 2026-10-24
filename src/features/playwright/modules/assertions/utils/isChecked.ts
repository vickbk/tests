import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Asserts that the element selected by the CSS selector is checked.
 *
 * @param page The Playwright page to search.
 * @param selector CSS selector for a checkbox or radio input.
 * @returns The checked locator.
 * @example
 * ```ts
 * const checkbox = await isChecked(page, "#terms");
 * ```
 */
export async function isChecked(
  page: Page,
  selector: string,
): Promise<Locator> {
  const locator = page.locator(selector);
  await expect(locator).toBeChecked();
  return locator;
}
