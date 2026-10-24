import { TEXT_PATTERN } from "@/shared/regex";
import type { Page } from "@playwright/test";
import { getLocatorByText } from "./getLocatorByText";

/**
 * Locates a label by its contained text.
 *
 * @param page The Playwright page to search.
 * @param hasText Text or regular expression contained by the label.
 * @returns A locator for the matching label.
 * @example
 * ```ts
 * const emailLabel = getLabel(page, "Email");
 * ```
 */
export function getLabel(page: Page, hasText: TEXT_PATTERN) {
  return getLocatorByText(page, ["label", hasText]);
}
