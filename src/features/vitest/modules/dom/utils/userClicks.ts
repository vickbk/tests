import { patternToRegex } from "@/shared/regex";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
