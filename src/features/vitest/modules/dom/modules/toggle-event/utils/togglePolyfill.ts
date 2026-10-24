import { fireEvent } from "@testing-library/react";
import type { ToggleConfig } from "./types";

/**
 * Creates the browser ToggleEvent instance used by the fireEvent.toggle polyfill.
 *
 * @param type - Event type to dispatch.
 * @param initDict - Optional toggle event initialization state.
 * @returns A ToggleEvent matching the requested state.
 * @example
 * ```ts
 * const event = createToggleEvent("toggle", {
 *   oldState: "closed",
 *   newState: "open",
 * });
 * ```
 */
export function createToggleEvent(
  type: string,
  initDict: Partial<ToggleConfig> = {
    oldState: "closed",
    newState: "open",
  },
): ToggleEvent {
  if (typeof globalThis.ToggleEvent === "undefined") {
    class ToggleEventPolyfill extends Event {
      oldState: string;
      newState: string;
      source: Element | null = null;

      constructor(eventType: string, eventInitDict: ToggleEventInit = {}) {
        super(eventType, eventInitDict);
        this.oldState = (eventInitDict as Partial<ToggleConfig>).oldState ?? "closed";
        this.newState = (eventInitDict as Partial<ToggleConfig>).newState ?? "open";
      }
    }

    globalThis.ToggleEvent = ToggleEventPolyfill as typeof ToggleEvent;
  }

  return new globalThis.ToggleEvent(type, {
    bubbles: false,
    cancelable: false,
    ...initDict,
  });
}

/**
 * Polyfills `fireEvent.toggle` for tests by dispatching a native ToggleEvent.
 *
 * @param element - Element or window to dispatch the toggle event on.
 * @param initDict - Optional state values for the toggle transition.
 * @returns Whether the event dispatch completed successfully.
 * @example
 * ```ts
 * fireEvent.toggle(document.body, { newState: "open" });
 * ```
 */
export function togglePolyfill(
  element: Document | Element | Node | Window,
  initDict: Partial<ToggleConfig> = {
    oldState: "closed",
    newState: "open",
  },
): boolean {
  const event = createToggleEvent("toggle", initDict);
  return fireEvent(element, event);
}
