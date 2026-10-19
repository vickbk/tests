import type { TEXT_PATTERN } from "@/shared/regex";
import { patternToRegex } from "@/shared/regex";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Simulates clicking an input found by its label or placeholder.
 *
 * @param label Label or placeholder text/regular expression identifying the input.
 * @param container Optional element that limits the input search.
 * @returns A promise that resolves after the click interaction completes.
 * @example
 * ```ts
 * await clickLabelInput("Email address");
 * ```
 */
export async function clickLabelInput(
  label: TEXT_PATTERN,
  container?: HTMLElement,
) {
  const user = userEvent.setup();
  const regex = patternToRegex(label);
  const searchArea = container ? within(container) : screen;
  const element =
    typeof label === "string" && label.length === 0
      ? searchArea.queryByPlaceholderText(regex) ||
        searchArea.getByLabelText(regex)
      : searchArea.queryByLabelText(regex) ||
        searchArea.getByPlaceholderText(regex);
  await user.click(element);
}
