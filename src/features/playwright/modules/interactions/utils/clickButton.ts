import { getButton } from "@/features/playwright/shared/locators";
import type { Page } from "@playwright/test";
import type { TEXT_PATTERN } from "../types";

/**
 * Clicks a button matching the supplied text.
 *
 * @param page The Playwright page to search.
 * @param hasText Text or regular expression contained by the button.
 * @returns A promise that resolves after the button is clicked.
 * @example
 * ```ts
 * await clickButton(page, "Save");
 * ```
 */
export async function clickButton(page: Page, hasText: TEXT_PATTERN) {
  await getButton(page, hasText).click();
}
