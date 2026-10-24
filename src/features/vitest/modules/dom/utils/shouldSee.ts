import type { TEXT_MATCHER } from "@/shared/regex";
import { shouldGetByText } from "./shouldGetByText";

/**
 * Asserts that each requested text matcher is present in the document.
 *
 * @param texts Text strings, regular expressions, or `[matcher, occurrenceIndex]` pairs.
 * @returns The matching elements in the same order as the supplied matchers.
 * @example
 * ```ts
 * const [heading] = shouldSee("Welcome");
 * ```
 */
export const shouldSee = (...texts: TEXT_MATCHER[]) => {
  return shouldGetByText(...texts).map(({ expected, element }) => {
    expected.toBeInTheDocument();
    return element!;
  });
};
