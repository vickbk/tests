import { screen } from "@testing-library/react";
import { expect } from "vitest";

/**
 * Asserts that elements with all supplied test IDs are absent from the document.
 *
 * @param ids One or more `data-testid` values to verify are absent.
 * @returns The query results (`null` for each absent element), in ID order.
 * @example
 * ```ts
 * shouldNotHaveTestId("loading-spinner");
 * ```
 */
export function shouldNotHaveTestId(...ids: string[]) {
  const testElements = ids.map((id) => screen.queryByTestId(id));

  testElements.forEach((element) => expect(element).not.toBeInTheDocument());
  return testElements;
}
