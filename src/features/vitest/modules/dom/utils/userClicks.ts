import { patternToRegex } from "../../../../../shared/regex";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Simulates a user click on a button with the requested name, or matching text.
 *
 * @param target Button accessible name or text string/regular expression.
 * @param container Optional element that limits the target search.
 * @returns A promise that resolves after the click interaction completes.
 * @example
 * ```ts
 * await userClicks("Save");
 * ```
 */
export const userClicks = async (
  target: string | RegExp,
  container?: HTMLElement,
) => {
  const user = userEvent.setup();
  const regex = patternToRegex(target);
  const searchArea = container ? within(container) : screen;
  const element =
    searchArea.queryByRole("button", { name: regex }) ||
    searchArea.getByText(regex);

  await user.click(element);
};
