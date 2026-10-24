// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { shouldGetByText } from "./shouldGetByText";

describe("shouldGetByText", () => {
  it("returns matchers and elements for strings, regexes, and indexed occurrences", () => {
    document.body.innerHTML = "<span>Ready</span><span>Saved</span>";

    const results = shouldGetByText("Ready", /saved/i, ["Ready", 0]);

    expect(results.map(({ element }) => element)).toEqual([
      document.querySelector("span"),
      document.querySelectorAll("span")[1],
      document.querySelector("span"),
    ]);
  });

  it("supports selecting one of multiple matches and reports ambiguous plain matchers", () => {
    document.body.innerHTML = "<span>Ready</span><span>Ready</span>";

    expect(shouldGetByText(["Ready", 1])[0].element).toBe(
      document.querySelectorAll("span")[1],
    );
    expect(() => shouldGetByText("Ready")).toThrow();
  });

  it("represents missing text as null and handles an empty matcher list", () => {
    expect(shouldGetByText("Missing").map(({ element }) => element)).toEqual([
      null,
    ]);
    expect(shouldGetByText()).toEqual([]);
    expect(
      shouldGetByText(["Missing", 0]).map(({ element }) => element),
    ).toEqual([null]);
  });
});
