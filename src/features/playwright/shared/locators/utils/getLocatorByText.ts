import type { Page } from "@playwright/test";
import type { LocatorWithText } from "../types";

/**
 * Locates elements matching a selector and text pattern.
 *
 * @param page The Playwright page to search.
 * @param locator Selector paired with text that the element must contain.
 * @returns A locator matching the selector and text.
 * @example
 * ```ts
 * const save = getLocatorByText(page, ["button", "Save"]);
 * ```
 */
export function getLocatorByText(
  page: Page,
  [locator, hasText]: LocatorWithText,
) {
  return page.locator(locator, { hasText });
}
