import { patternToRegex, TEXT_PATTERN } from "@/shared/regex";
import { getSearchArea } from "./getSearchArea";

/**
 * Finds a text-entry control by its accessible name or placeholder.
 *
 * Supported controls are text-like inputs, textareas, and elements exposed
 * with the textbox role. A matching non-text element is rejected.
 *
 * @param target Accessible name or placeholder to match, as text or a regular expression.
 * @param container Optional element that limits the search.
 * @returns The matching textbox element.
 * @throws If no textbox matches, or a placeholder match is not a text-entry control.
 * @example
 * ```ts
 * const email = getTextBox("Email address");
 * const notes = getTextBox("Notes", dialog);
 * ```
 */
export function getTextBox(target: TEXT_PATTERN, container?: HTMLElement) {
  const regex = patternToRegex(target);
  const searchArea = getSearchArea(container);
  const textBox = searchArea.queryByRole("textbox", { name: regex });

  if (textBox) return textBox;

  const placeholderMatch = searchArea.queryByPlaceholderText(regex);
  if (placeholderMatch) {
    const isTextInput =
      placeholderMatch instanceof HTMLInputElement &&
      ["text", "search", "email", "url", "tel", "password"].includes(
        placeholderMatch.type,
      );
    const isTextArea = placeholderMatch instanceof HTMLTextAreaElement;
    const isContentEditable =
      placeholderMatch.getAttribute("contenteditable") === "true" &&
      placeholderMatch.getAttribute("role") === "textbox";

    if (isTextInput || isTextArea || isContentEditable) return placeholderMatch;

    throw new Error(
      `Element matching placeholder "${String(target)}" is not a text-entry control.`,
    );
  }

  return searchArea.getByRole("textbox", { name: regex });
}
