import { expect } from "vitest";

/**
 * Asserts that an HTMLElement possesses the expected set of DOM attributes and values.
 *
 * Handles string/numeric values, boolean attributes (true = present, false = absent),
 * and null/undefined values (absent).
 */
export function shouldHaveAttributes(
  element: HTMLElement,
  attributes: Record<string, unknown>,
): void {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null || value === false) {
      expect(element).not.toHaveAttribute(key);
    } else if (value === true) {
      expect(element).toHaveAttribute(key);
    } else {
      expect(element).toHaveAttribute(key, String(value));
    }
  });
}
