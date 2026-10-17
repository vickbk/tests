import { fireEvent } from "@testing-library/react";
import type { ToggleState } from "../../../types";

export function togglePopover({
  container,
  selector,
  newState = "open",
}: {
  container?: HTMLElement;
  selector: string;
  newState?: ToggleState;
}) {
  const element = (container ?? document).querySelector(selector);
  if (!element) return;
  fireEvent.toggle(element, { newState });
  return element;
}
