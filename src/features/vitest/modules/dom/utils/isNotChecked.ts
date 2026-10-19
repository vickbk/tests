import type { TEXT_PATTERN } from "@/shared/regex";
import { expect } from "vitest";
import { getCheckboxRadio } from "./getCheckboxRadio";

/**
 * Asserts that the radio button or checkbox matching the accessible name is unchecked.
 *
 * @param selector Accessible label text or regular expression for the control.
 * @param container Optional element that limits the control search.
 * @returns Nothing; throws an assertion error if the control is absent or checked.
 * @example
 * ```ts
 * isNotChecked("Subscribe to updates");
 * ```
 */
export function isNotChecked(selector: TEXT_PATTERN, container?: HTMLElement) {
  expect(getCheckboxRadio(selector, container)).not.toBeChecked();
}
