import { patternToRegex, TEXT_PATTERN } from "@/shared/regex";
import { assertTextEntryControl } from "./assertTextEntryControl";
import { getSearchArea } from "./getSearchArea";

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
