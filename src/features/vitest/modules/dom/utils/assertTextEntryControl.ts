import type { TEXT_PATTERN } from "@/shared/regex";
import { isTextEntryControl } from "./isTextEntryControl";

/**
 * Asserts that an element is a supported text-entry control.
 *
 * @param element The element to validate.
 * @param target The original query target, used in error messages.
 * @param source The query mechanism that matched the element.
 * @returns The validated element.
 * @throws If the element is not a supported text-entry control.
 */
export function assertTextEntryControl(
  element: HTMLElement,
  target: TEXT_PATTERN,
  source: "label" | "placeholder",
): HTMLElement {
  if (isTextEntryControl(element)) return element;

  throw new Error(
    `Element matching ${source} "${String(target)}" is not a text-entry control.`,
  );
}
