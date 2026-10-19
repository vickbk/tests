import type { Page } from "@playwright/test";
import type { TEXT_PATTERN } from "../types";
import { clickLabelInput } from "./clickLabelInput";

/**
 * Clicks each matching label in the supplied order.
 *
 * @param page The Playwright page to search.
 * @param labelTexts Text or regular expressions for the labels to click.
 * @returns A promise that resolves after all labels are clicked.
 * @example
 * ```ts
 * await clickMultipleLabelInputs(page, ["Email", "Subscribe"]);
 * ```
 */
export async function clickMultipleLabelInputs(
  page: Page,
  labelTexts: TEXT_PATTERN[],
) {
  for (const labelText of labelTexts) {
    await clickLabelInput(page, labelText);
  }
}
