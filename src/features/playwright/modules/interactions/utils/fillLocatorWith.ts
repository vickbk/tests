import type { Locator } from "@playwright/test";

/**
 * Clicks a locator and fills it with the supplied value.
 *
 * @param locator The input-like locator to fill.
 * @param value The value to enter.
 * @returns A promise that resolves after the locator is filled.
 * @example
 * ```ts
 * await fillLocatorWith(page.getByLabel("Email"), "user@example.com");
 * ```
 */
export async function fillLocatorWith(locator: Locator, value: string) {
  await locator.click();
  await locator.fill(value);
}
