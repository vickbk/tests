/**
 * Determines whether an element is a supported text-entry control.
 *
 * Supported elements are text-like inputs, textareas, and contenteditable
 * elements explicitly exposed with the textbox role.
 *
 * @param element The element to check.
 * @returns Whether the element is a supported text-entry control.
 */
export function isTextEntryControl(element: HTMLElement): boolean {
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
