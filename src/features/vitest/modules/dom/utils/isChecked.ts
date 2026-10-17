import type { TEXT_PATTERN } from "../../../../../shared/regex";
import { patternToRegex } from "../../../../../shared/regex";
import { expect } from "vitest";
import { getSearchArea } from "./getSearchArea";

/**
 * Asserts that the radio button or checkbox matching the accessible name is checked.
 *
 * @param selector Accessible label text or regular expression for the control.
 * @param container Optional element that limits the control search.
 * @returns Nothing; throws an assertion error if the control is absent or unchecked.
 * @example
 * ```ts
 * isChecked("Accept terms");
 * ```
 */
export function isChecked(selector: TEXT_PATTERN, container?: HTMLElement) {
  const searchArea = getSearchArea(container);
  const name = patternToRegex(selector);
  const element =
    searchArea.getByLabelText(name) ||
    searchArea.getByRole("radio", { name }) ||
    searchArea.getByRole("checkbox", { name });
  expect(element).toBeChecked();
}
