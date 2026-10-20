import { fireEvent } from "@testing-library/react";
import { togglePolyfill } from "./togglePolyfill";
import type { ToggleConfig, ToggleFireEventExtensions } from "./types";

/**
 * Installs the explicit `fireEvent.toggle` polyfill for the current test runtime.
 *
 * @param config - Optional default old/new states used for each dispatched event.
 * @returns The augmented `fireEvent` object with a `toggle` method attached.
 * @example
 * ```ts
 * import { installToggleEvent } from "@vickbk/tests/vitest";
 *
 * installToggleEvent();
 * fireEvent.toggle(document.body, { newState: "open" });
 * ```
 */
export function installToggleEvent(
  config?: ToggleConfig,
): typeof fireEvent & ToggleFireEventExtensions {
  if ("toggle" in fireEvent) return fireEvent;

  Object.assign(fireEvent, {
    toggle: (
      element: Document | Element | Node | Window,
      initDict?: Partial<ToggleConfig>,
    ) =>
      togglePolyfill(element, {
        oldState: "closed",
        newState: "open",
        ...config,
        ...initDict,
      }),
  });

  return fireEvent;
}
