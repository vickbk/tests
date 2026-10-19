// @vitest-environment jsdom
import { fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { installToggleEvent } from "./installToggleEvent";

describe("installToggleEvent", () => {
  let freshFireEvent: typeof fireEvent | undefined;

  afterEach(() => {
    delete (fireEvent as unknown as Record<string, unknown>).toggle;
    if (freshFireEvent) {
      delete (freshFireEvent as unknown as Record<string, unknown>).toggle;
      freshFireEvent = undefined;
    }
  });

  it("does not mutate fireEvent until installation is requested", async () => {
    vi.resetModules();
    const testingLibrary = await import("@testing-library/react");
    const currentFireEvent = testingLibrary.fireEvent;
    freshFireEvent = currentFireEvent;
    const imported = await import("@/features/vitest");
    await import("@/features/vitest/modules/dom");
    const current =
      "toggle" in currentFireEvent ? currentFireEvent.toggle : undefined;

    expect(imported.installToggleEvent).toBeTypeOf("function");
    expect(current).toBeUndefined();
  });

  it("attaches fireEvent.toggle and dispatches a toggle event", () => {
    const result = installToggleEvent();

    expect(result).toBe(fireEvent);
    expect(typeof fireEvent.toggle).toBe("function");

    document.body.innerHTML = '<button id="target">target</button>';
    const button = document.getElementById("target")!;
    const onToggle = vi.fn();
    button.addEventListener("toggle", onToggle);
    const handled = fireEvent.toggle(button, { newState: "open" });
    expect(handled).toBe(true);
    expect(onToggle).toHaveBeenCalledOnce();
    expect(onToggle.mock.calls[0][0]).toHaveProperty("newState", "open");
  });

  it("allows re-installation without breaking the polyfill", () => {
    const first = installToggleEvent();
    const second = installToggleEvent();

    expect(first).toBe(fireEvent);
    expect(second).toBe(fireEvent);
    expect(typeof fireEvent.toggle).toBe("function");
  });

  it("uses installation config as defaults that per-call values can override", () => {
    installToggleEvent({ oldState: "open", newState: "closed" });
    document.body.innerHTML = '<button id="target">target</button>';
    const button = document.getElementById("target")!;
    const onToggle = vi.fn();
    button.addEventListener("toggle", onToggle);

    fireEvent.toggle(button, { newState: "open" });

    expect(onToggle.mock.calls[0][0]).toMatchObject({
      oldState: "open",
      newState: "open",
    });
  });
});
