import { getLink } from "@/features/playwright/shared/locators";
import type { Page } from "@playwright/test";
import type { TEXT_PATTERN } from "../types";

/**
 * Clicks a link matching the supplied accessible name.
 *
 * @param page The Playwright page to search.
 * @param hasText Text or regular expression matching the link name.
 * @returns A promise that resolves after the link is clicked.
 * @example
 * ```ts
 * await clickLink(page, "Documentation");
 * ```
 */
export async function clickLink(page: Page, hasText: TEXT_PATTERN) {
  await getLink(page, hasText).click();
}
