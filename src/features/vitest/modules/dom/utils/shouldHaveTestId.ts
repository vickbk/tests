import { screen } from "@testing-library/react";
import { expect } from "vitest";

/**
 * Asserts that elements with all supplied test IDs are present in the document.
 *
 * @param ids One or more `data-testid` values to locate.
 * @returns The elements found, in the same order as the supplied IDs.
 * @example
 * ```ts
 * const [submitButton] = shouldHaveTestId("submit-button");
 * ```
 */
export function shouldHaveTestId(...ids: string[]) {
  const testElements = ids.map((id) => screen.getByTestId(id));

  testElements.forEach((element) => expect(element).toBeInTheDocument());
  return testElements;
}
