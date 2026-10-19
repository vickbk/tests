// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { isNotChecked } from "./isNotChecked";

describe("isNotChecked", () => {
  it("passes for an unchecked checkbox", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" /> Subscribe to updates</label>';

    expect(() => isNotChecked("Subscribe to updates")).not.toThrow();
  });

  it("passes for an unchecked radio button", () => {
    document.body.innerHTML =
      '<label><input type="radio" name="plan" /> Basic</label>';

    expect(() => isNotChecked("Basic")).not.toThrow();
  });

  it("throws for a checked or absent control", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" checked /> Selected</label>';

    expect(() => isNotChecked("Selected")).toThrow();
    expect(() => isNotChecked("Missing")).toThrow();
  });

  it("throws when the accessible name belongs to a non-checkbox/radio control", () => {
    document.body.innerHTML = '<label>Name<input type="text" /></label>';

    expect(() => isNotChecked("Name")).toThrow(/checkbox or radio/i);
  });
});
