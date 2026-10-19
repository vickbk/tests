import type { Page } from "@playwright/test";
import type { TEXT_PATTERN } from "../types";
import { getLocatorByText } from "./getLocatorByText";

/**
 * Locates a button by its contained text.
 *
 * @param page The Playwright page to search.
 * @param hasText Text or regular expression contained by the button.
 * @returns A locator for the matching button.
 * @example
 * ```ts
 * const saveButton = getButton(page, "Save");
 * ```
 */
export function getButton(page: Page, hasText: TEXT_PATTERN) {
  return getLocatorByText(page, ["button", hasText]);
}
