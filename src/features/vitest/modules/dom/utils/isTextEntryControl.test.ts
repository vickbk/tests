// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { isTextEntryControl } from "./isTextEntryControl";

describe("isTextEntryControl", () => {
  it.each(["text", "search", "email", "url", "tel", "password"])(
    "accepts input[type=%s]",
    (type) => {
      const input = document.createElement("input");
      input.type = type;

      expect(isTextEntryControl(input)).toBe(true);
    },
  );

  it.each(["checkbox", "radio", "button", "submit", "number", "hidden"])(
    "rejects input[type=%s]",
    (type) => {
      const input = document.createElement("input");
      input.type = type;

      expect(isTextEntryControl(input)).toBe(false);
    },
  );

  it("accepts textareas", () => {
    expect(isTextEntryControl(document.createElement("textarea"))).toBe(true);
  });

  it("accepts contenteditable elements with role=textbox", () => {
    const element = document.createElement("div");
    element.setAttribute("contenteditable", "true");
    element.setAttribute("role", "textbox");

    expect(isTextEntryControl(element)).toBe(true);
  });

  it("rejects contenteditable elements without role=textbox", () => {
    const element = document.createElement("div");
    element.setAttribute("contenteditable", "true");

    expect(isTextEntryControl(element)).toBe(false);
  });

  it("rejects non-input elements without text-entry semantics", () => {
    expect(isTextEntryControl(document.createElement("button"))).toBe(false);
    expect(isTextEntryControl(document.createElement("div"))).toBe(false);
    expect(isTextEntryControl(document.createElement("select"))).toBe(false);
  });
});
