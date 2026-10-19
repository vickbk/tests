import { getLabel } from "@/features/playwright/shared/locators";
import { TEXT_PATTERN } from "@/shared/regex";
import type { Page } from "@playwright/test";

/**
 * Clicks the label matching the supplied text.
 *
 * @param page The Playwright page to search.
 * @param labelText Text or regular expression contained by the label.
 * @returns A promise that resolves after the label is clicked.
 * @example
 * ```ts
 * await clickLabelInput(page, "Subscribe");
 * ```
 */
export async function clickLabelInput(page: Page, labelText: TEXT_PATTERN) {
  await getLabel(page, labelText).click();
}
