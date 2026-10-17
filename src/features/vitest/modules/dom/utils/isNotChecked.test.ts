// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { isNotChecked } from "./isNotChecked";

describe("isNotChecked", () => {
  it("passes for an unchecked checkbox", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" /> Subscribe to updates</label>';

    expect(() => isNotChecked("Subscribe to updates")).not.toThrow();
  });

  it("throws for a checked or absent control", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" checked /> Selected</label>';

    expect(() => isNotChecked("Selected")).toThrow();
    expect(() => isNotChecked("Missing")).toThrow();
  });
});
