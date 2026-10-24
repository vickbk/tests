// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { isChecked } from "./isChecked";

describe("isChecked", () => {
  it("passes for a checked checkbox", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" checked /> Accept terms</label>';

    expect(() => isChecked("Accept terms")).not.toThrow();
  });

  it("passes for a checked radio button", () => {
    document.body.innerHTML =
      '<label><input type="radio" name="plan" checked /> Pro</label>';

    expect(() => isChecked("Pro")).not.toThrow();
  });

  it("supports query scoping and throws for an unchecked or absent control", () => {
    document.body.innerHTML =
      '<section><label><input type="checkbox" checked /> In scope</label></section><label><input type="checkbox" /> Outside</label>';
    const section = document.querySelector("section")!;

    expect(() => isChecked("In scope", section)).not.toThrow();
    expect(() => isChecked("Outside", section)).toThrow();
    expect(() => isChecked("Outside")).toThrow();
  });

  it("throws when the matching checkbox is unchecked", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" /> Unchecked</label>';

    expect(() => isChecked("Unchecked")).toThrow();
  });

  it("throws when the accessible name belongs to a non-checkbox/radio control", () => {
    document.body.innerHTML = '<label>Name<input type="text" /></label>';

    expect(() => isChecked("Name")).toThrow(/checkbox or radio/i);
  });
});
