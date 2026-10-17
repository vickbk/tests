// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { shouldSee } from "./shouldSee";

describe("shouldSee", () => {
  it("returns the matching elements for text and regex matchers", () => {
    document.body.innerHTML = "<h1>Welcome</h1><p>Saved successfully</p>";

    expect(shouldSee("Welcome", /saved/i)).toEqual([
      document.querySelector("h1"),
      document.querySelector("p"),
    ]);
  });

  it("selects a requested matching occurrence", () => {
    document.body.innerHTML = "<span>Item</span><span>Item</span>";

    expect(shouldSee(["Item", 1])).toEqual([
      document.querySelectorAll("span")[1],
    ]);
  });

  it("throws when text is missing and allows an empty matcher list", () => {
    expect(() => shouldSee("Missing")).toThrow();
    expect(shouldSee()).toEqual([]);
  });
});
