import { getLabel } from "@/features/playwright/shared/locators";
import type { Page } from "@playwright/test";
import type { TEXT_PATTERN } from "../types";

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
