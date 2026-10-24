import type { Page } from "@playwright/test";
import type { TEXT_MATCHER } from "../types";
import { getMatcher } from "./getMatcher";

/**
 * Asserts that each text matcher is not visible on the page.
 *
 * @param page The Playwright page to inspect.
 * @param textes Text strings, regular expressions, or `[matcher, occurrenceIndex]` pairs.
 * @returns A promise that resolves when every matching element is not visible.
 * @example
 * ```ts
 * await shouldNotSee(page, "Error message");
 * ```
 */
export async function shouldNotSee(page: Page, ...textes: TEXT_MATCHER[]) {
  const matchers = getMatcher(page, ...textes);
  for (let i = 0; i < matchers.length; i++) {
    await matchers[i].not.toBeVisible();
  }
}
