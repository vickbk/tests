import { patternToRegex } from "@/shared/regex";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const userTypes = async (
  target: string | RegExp,
  text: string,
  container?: HTMLElement,
  user = userEvent.setup(),
) => {
  const regex = patternToRegex(target);
  const searchArea = container ? within(container) : screen;
  const element =
    searchArea.queryByLabelText(regex) ||
    searchArea.queryByPlaceholderText(regex) ||
    searchArea.getByRole("textbox", { name: regex });

  await user.clear(element);
  await user.type(element, text);
  return element;
};
