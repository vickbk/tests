// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { createToggleEvent, togglePolyfill } from "./togglePolyfill";

describe("togglePolyfill", () => {
  it("creates a ToggleEvent with the requested state", () => {
    const event = createToggleEvent("toggle", {
      oldState: "closed",
      newState: "open",
    });

    expect(event.type).toBe("toggle");
    expect(event.oldState).toBe("closed");
    expect(event.newState).toBe("open");
  });

  it("dispatches a toggle event against the target element", () => {
    document.body.innerHTML = '<button id="toggle-target">target</button>';
    const button = document.getElementById("toggle-target");

    expect(button).not.toBeNull();
    expect(togglePolyfill(button!, { newState: "closed" })).toBe(true);
  });

  it("uses defaults when no explicit state is provided", () => {
    const event = createToggleEvent("toggle");

    expect(event.oldState).toBe("closed");
    expect(event.newState).toBe("open");
  });

  it("uses defaults when an empty state is provided", () => {
    const event = createToggleEvent("toggle", {});

    expect(event.oldState).toBe("closed");
    expect(event.newState).toBe("open");
  });

  it("does not throw for a valid DOM node", () => {
    const element = document.createElement("button");
    expect(() => togglePolyfill(element, { newState: "open" })).not.toThrow();
  });
});
