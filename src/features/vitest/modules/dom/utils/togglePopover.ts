import { fireEvent } from "@testing-library/react";
import type { ToggleState } from "../modules/toggle-event";

/**
 * Dispatches a toggle event on the first element matching a selector.
 *
 * @param options Selector, optional search container, and target open/closed state.
 * @returns The matched element, or `undefined` when no matching element exists.
 * @example
 * ```ts
 * const popover = togglePopover({ selector: "#help", newState: "open" });
 * ```
 */
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
