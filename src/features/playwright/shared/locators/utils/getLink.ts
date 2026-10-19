import type { Page } from "@playwright/test";
import type { TEXT_PATTERN } from "../types";

/**
 * Locates a link by its accessible name.
 *
 * @param page The Playwright page to search.
 * @param hasText Text or regular expression matching the link's accessible name.
 * @returns A locator for the matching link.
 * @example
 * ```ts
 * const documentationLink = getLink(page, "Documentation");
 * ```
 */
export function getLink(page: Page, hasText: TEXT_PATTERN) {
  return page.getByRole("link", { name: hasText });
}
