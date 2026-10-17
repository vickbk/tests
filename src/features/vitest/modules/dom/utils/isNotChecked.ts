import type { TEXT_PATTERN } from "@/shared/regex";
import { patternToRegex } from "@/shared/regex";
import { expect } from "vitest";
import { getSearchArea } from "./getSearchArea";

export function isNotChecked(selector: TEXT_PATTERN, container?: HTMLElement) {
  const searchArea = getSearchArea(container);
  const name = patternToRegex(selector);
  const element =
    searchArea.getByLabelText(name) ||
    searchArea.getByRole("radio", { name }) ||
    searchArea.getByRole("checkbox", { name });
  expect(element).not.toBeChecked();
}
