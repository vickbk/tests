import type { Page } from "@playwright/test";
import type { LABEL_LOCATOR } from "../types";
import { setLocatorValue } from "./setLocatorValue";

/**
 * Sets values for a sequence of label/value pairs in order.
 *
 * @param page The Playwright page to search.
 * @param locatorsAndValues Label text or pattern paired with its value.
 * @returns A promise that resolves after all values are set.
 * @example
 * ```ts
 * await setValueForLocators(page, [
 *   ["Email", "user@example.com"],
 *   ["Name", "Alex"],
 * ]);
 * ```
 */
export async function setValueForLocators(
  page: Page,
  locatorsAndValues: LABEL_LOCATOR[],
) {
  for (const locatorAndValue of locatorsAndValues) {
    await setLocatorValue(page, locatorAndValue);
  }
}
