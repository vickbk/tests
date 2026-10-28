// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { assertTextEntryControl } from "./assertTextEntryControl";

describe("assertTextEntryControl", () => {
  it("returns a valid text-entry control", () => {
    const input = document.createElement("input");
    input.type = "text";

    expect(assertTextEntryControl(input, "Name", "label")).toBe(input);
  });

  it("accepts a labeled search input", () => {
    const input = document.createElement("input");
    input.type = "search";

    expect(assertTextEntryControl(input, "Search", "label")).toBe(input);
  });

  it("throws a descriptive error for an invalid label match", () => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    expect(() =>
      assertTextEntryControl(checkbox, "Enable alerts", "label"),
    ).toThrow(
      'Element matching label "Enable alerts" is not a text-entry control.',
    );
  });

  it("throws a descriptive error for an invalid placeholder match", () => {
    const button = document.createElement("button");

    expect(() =>
      assertTextEntryControl(button, "Continue", "placeholder"),
    ).toThrow(
      'Element matching placeholder "Continue" is not a text-entry control.',
    );
  });
});
