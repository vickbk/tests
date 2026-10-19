import type { Page } from "@playwright/test";

/**
 * Clicks the top-left corner of the page body.
 *
 * @param page The Playwright page to interact with.
 * @returns A promise that resolves after the click.
 * @example
 * ```ts
 * await clickBodyCorner(page);
 * ```
 */
export async function clickBodyCorner(page: Page) {
  await page.locator("body").click({ position: { x: 0, y: 0 } });
}
