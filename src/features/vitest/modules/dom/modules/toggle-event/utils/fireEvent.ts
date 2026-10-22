import { fireEvent as rtlFireEvent } from "@testing-library/react";
import { togglePolyfill } from "./togglePolyfill";
import type { ToggleConfig, ToggleFireEventExtensions } from "./types";

const callableFireEvent = (...args: Parameters<typeof rtlFireEvent>) =>
  rtlFireEvent(...args);
/**
 * Testing Library's fireEvent API with an additional `toggle` event helper.
 *
 * The exported object copies the standard `fireEvent` properties and adds
 * `toggle`, which dispatches the toggle event through `togglePolyfill`.
 * It does not install the extension onto Testing Library's original export.
 *
 * Standard Testing Library event helpers remain available, including
 * `click`, `change`, `input`, `submit`, `focus`, and keyboard/mouse events.
 *
 * @remarks
 * The `toggle` helper defaults to a transition from `closed` to `open`.
 * Call-specific configuration overrides those defaults. This helper does
 * not maintain state between calls.
 *
 * @example
 * ```ts
 * import { fireEvent } from "@vickbk/tests/vitest";
 *
 * const disclosure = document.querySelector("details")!;
 *
 * fireEvent.toggle(disclosure);
 * fireEvent.toggle(disclosure, { newState: "closed" });
 * ```
 *
 * @example
 * ```ts
 * import { fireEvent } from "@vickbk/tests/vitest";
 *
 * const button = document.querySelector("button")!;
 *
 * fireEvent.click(button);
 * ```
 */
export const fireEvent = Object.assign(callableFireEvent, rtlFireEvent, {
  /**
   * Dispatches a toggle event using the toggle polyfill.
   *
   * @param element - The document, element, node, or window receiving the event.
   * @param initDict - Optional old/new state overrides for this dispatch.
   * @returns The result returned by `togglePolyfill`.
   *
   * @example
   * ```ts
   * fireEvent.toggle(document.body, {
   *   oldState: "closed",
   *   newState: "open",
   * });
   * ```
   */
  toggle: (
    element: Document | Element | Node | Window,
    initDict?: Partial<ToggleConfig>,
  ) =>
    togglePolyfill(element, {
      oldState: "closed",
      newState: "open",
      ...initDict,
    }),
}) as typeof rtlFireEvent & ToggleFireEventExtensions;
