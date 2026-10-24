import type { TEXT_MATCHER } from "@/shared/regex";
import { patternToRegex } from "@/shared/regex";
import { screen } from "@testing-library/react";
import { expect } from "vitest";

/**
 * Creates assertion/element pairs for text matchers, supporting a zero-based occurrence index.
 *
 * @param texts Text strings, regular expressions, or `[matcher, occurrenceIndex]` pairs.
 * @returns Assertion and matching-element pairs, with `null` for missing text.
 * @example
 * ```ts
 * const [{ expected, element }] = shouldGetByText(["Item", 1]);
 * ```
 */
export function shouldGetByText(...texts: TEXT_MATCHER[]) {
  return texts.map((text) => {
    if (Array.isArray(text)) {
      const [matcher, nth] = text;
      const element =
        screen.queryAllByText(patternToRegex(matcher))[nth] ?? null;
      return { expected: expect(element), element };
    }
    const element = screen.queryByText(patternToRegex(text));
    return { expected: expect(element), element };
  });
}
