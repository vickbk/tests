import { screen, within } from "@testing-library/react";

/**
 * Returns the Testing Library query API for a container or the whole document.
 *
 * @param container Optional element to scope queries to.
 * @returns The scoped query API, or the global `screen` query API.
 * @example
 * ```ts
 * const queries = getSearchArea(formElement);
 * queries.getByRole("button", { name: "Submit" });
 * ```
 */
export function getSearchArea(container?: HTMLElement) {
  return container ? within(container) : screen;
}
