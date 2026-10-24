// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { shouldHaveAttributes } from "./shouldHaveAttributes";

describe("shouldHaveAttributes", () => {
  it("accepts string, numeric, boolean, and absent attribute expectations", () => {
    const input = document.createElement("input");
    input.setAttribute("aria-label", "Email");
    input.setAttribute("tabindex", "0");
    input.setAttribute("required", "");

    expect(() =>
      shouldHaveAttributes(input, {
        "aria-label": "Email",
        tabindex: 0,
        required: true,
        disabled: false,
        title: null,
        name: undefined,
      }),
    ).not.toThrow();
  });

  it("throws when an attribute value does not match", () => {
    const element = document.createElement("div");
    element.setAttribute("role", "button");

    expect(() => shouldHaveAttributes(element, { role: "link" })).toThrow();
    expect(() => shouldHaveAttributes(element, { hidden: true })).toThrow();
  });

  it("accepts an empty attribute map", () => {
    expect(() =>
      shouldHaveAttributes(document.createElement("div"), {}),
    ).not.toThrow();
  });
});
