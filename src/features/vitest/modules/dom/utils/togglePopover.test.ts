// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { installToggleEvent } from "../modules/toggle-event";
import { togglePopover } from "./togglePopover";

describe("togglePopover", () => {
  afterEach(() => {
    delete (fireEvent as unknown as Record<string, unknown>).toggle;
  });

  it("dispatches a toggle event with the requested state and returns the element", () => {
    installToggleEvent();
    const popover = document.createElement("div");
    popover.id = "help";
    document.body.append(popover);
    const onToggle = vi.fn();
    popover.addEventListener("toggle", onToggle);

    expect(togglePopover({ selector: "#help", newState: "closed" })).toBe(
      popover,
    );
    expect(onToggle).toHaveBeenCalledOnce();
    expect(onToggle.mock.calls[0][0]).toHaveProperty("newState", "closed");
  });

  it("uses the supplied container and returns undefined for a missing element", () => {
    installToggleEvent();
    const container = document.createElement("section");
    container.innerHTML = '<div class="popover"></div>';

    expect(togglePopover({ selector: ".popover", container })).toBe(
      container.firstElementChild,
    );
    expect(togglePopover({ selector: ".missing", container })).toBeUndefined();
  });
});
