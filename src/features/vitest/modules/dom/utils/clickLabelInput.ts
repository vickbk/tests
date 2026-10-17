import type { TEXT_PATTERN } from "@/shared/regex";
import { patternToRegex } from "@/shared/regex";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export async function clickLabelInput(
  label: TEXT_PATTERN,
  container?: HTMLElement,
) {
  const user = userEvent.setup();
  const regex = patternToRegex(label);
  const searchArea = container ? within(container) : screen;
  const element =
    searchArea.getByLabelText(regex) || searchArea.getByPlaceholderText(label);
  await user.click(element);
}
