import type { Page } from "@playwright/test";
import type { TEXT_MATCHER } from "../types";
import { getMatcher } from "./getMatcher";

/**
 * Asserts that each text matcher is visible on the page.
 *
 * @param page The Playwright page to inspect.
 * @param textes Text strings, regular expressions, or `[matcher, occurrenceIndex]` pairs.
 * @returns A promise that resolves when every matching element is visible.
 * @example
 * ```ts
 * await shouldSee(page, "Welcome", [/Saved/i, 0]);
 * ```
 */
export async function shouldSee(page: Page, ...textes: TEXT_MATCHER[]) {
  const matchers = getMatcher(page, ...textes);
  for (let i = 0; i < matchers.length; i++) {
    await matchers[i].toBeVisible();
  }
}
