import { patternToRegex, TEXT_PATTERN } from "@/shared/regex";
import { getSearchArea } from "./getSearchArea";

function isTextEntryControl(element: HTMLElement): boolean {
  const isTextInput =
    element instanceof HTMLInputElement &&
    ["text", "search", "email", "url", "tel", "password"].includes(
      element.type,
    );
  const isTextArea = element instanceof HTMLTextAreaElement;
  const isContentEditable =
    element.getAttribute("contenteditable") === "true" &&
    element.getAttribute("role") === "textbox";

  return isTextInput || isTextArea || isContentEditable;
}

function assertTextEntryControl(
  element: HTMLElement,
  target: TEXT_PATTERN,
  source: "label" | "placeholder",
): HTMLElement {
  if (isTextEntryControl(element)) return element;

  throw new Error(
    `Element matching ${source} "${String(target)}" is not a text-entry control.`,
  );
}

/**
 * Finds a text-entry control by its accessible name or placeholder.
 *
 * Supported controls are text-like inputs, textareas, and elements exposed
 * with the textbox role. A matching non-text element is rejected.
 */
export function getTextBox(target: TEXT_PATTERN, container?: HTMLElement) {
  const regex = patternToRegex(target);
  const searchArea = getSearchArea(container);

  const labelMatch = searchArea.queryByLabelText(regex);
  if (labelMatch) {
    return assertTextEntryControl(labelMatch, target, "label");
  }

  const placeholderMatch = searchArea.queryByPlaceholderText(regex);
  if (placeholderMatch) {
    return assertTextEntryControl(placeholderMatch, target, "placeholder");
  }

  return searchArea.getByRole("textbox", { name: regex });
}
