import { screen, within } from "@testing-library/react";

export function getSearchArea(container?: HTMLElement) {
  return container ? within(container) : screen;
}
