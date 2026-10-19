import { type LABEL_LOCATOR, patternToRegex } from "@/shared/regex";
import type { Page } from "@playwright/test";

/**
 * Clicks the label matching the pattern and fills it with the supplied value.
 *
 * @param page The Playwright page to search.
 * @param locatorAndValue Label text or pattern paired with the value to fill.
 * @returns A promise that resolves after the matching label is filled.
 * @example
 * ```ts
 * await setLocatorValue(page, ["Email", "user@example.com"]);
 * ```
 */
export async function setLocatorValue(
  page: Page,
  [locator, value]: LABEL_LOCATOR,
) {
  const element = page.locator("label", { hasText: patternToRegex(locator) });
  await element.click();
  await element.fill(value);
}
