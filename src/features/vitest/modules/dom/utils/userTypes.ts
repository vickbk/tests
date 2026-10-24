import { TEXT_PATTERN } from "@/shared/regex";
import userEvent from "@testing-library/user-event";
import { getTextBox } from "./getTextBox";

/**
 * Replaces the value of a textbox found by its label, placeholder, or textbox name.
 *
 * @param target Accessible label, placeholder, or textbox name as text or a regex.
 * @param text Text to type after clearing the existing value.
 * @param container Optional element that limits the textbox search.
 * @param user User-event instance used for the interaction; defaults to a new instance.
 * @returns A promise resolving to the textbox that was updated.
 * @example
 * ```ts
 * const emailInput = await userTypes("Email", "person@example.com");
 * ```
 */
export const userTypes = async (
  target: TEXT_PATTERN,
  text: string,
  container?: HTMLElement,
  user = userEvent.setup(),
) => {
  const element = getTextBox(target, container);

  await user.clear(element);
  if (text) await user.type(element, text);
  return element;
};
