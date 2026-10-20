import type { FireFunction, FireObject } from "@testing-library/react";

/**
 * Possible states for a disclosure or popover toggle transition.
 *
 * @example
 * ```ts
 * const nextState: ToggleState = "open";
 * ```
 */
export type ToggleState = "open" | "closed";

/**
 * The previous and next states dispatched by the toggle-event polyfill.
 *
 * @example
 * ```ts
 * const transition: ToggleConfig = { oldState: "closed", newState: "open" };
 * ```
 */
export type ToggleConfig = Record<"oldState" | "newState", ToggleState>;

/**
 * Internal shape added to Testing Library's `fireEvent` by its type augmentation.
 *
 * @example
 * ```ts
 * installToggleEvent();
 * fireEvent.toggle(document.body, { newState: "open" });
 * ```
 */
export type ToggleFireEventExtensions = {
  toggle: (
    element: Document | Element | Window | Node,
    initDict?: Partial<ToggleConfig>,
  ) => boolean;
};

declare module "@testing-library/react" {
  const fireEvent: FireFunction & FireObject & ToggleFireEventExtensions;
}
