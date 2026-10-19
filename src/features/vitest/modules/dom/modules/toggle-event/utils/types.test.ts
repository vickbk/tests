import { describe, expect, it } from "vitest";
import type { ToggleConfig, ToggleState } from "./types";

describe("toggle types", () => {
  it("exposes the toggle state and config shapes", () => {
    const state: ToggleState = "open";
    const config: ToggleConfig = {
      oldState: "closed",
      newState: state,
    };

    expect(state).toBe("open");
    expect(config).toEqual({ oldState: "closed", newState: "open" });
  });
});
