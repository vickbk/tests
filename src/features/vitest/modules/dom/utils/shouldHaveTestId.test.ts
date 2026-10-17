// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { shouldHaveTestId } from "./shouldHaveTestId";

describe("shouldHaveTestId", () => {
  it("returns all matching elements", () => {
    document.body.innerHTML =
      '<button data-testid="save">Save</button><span data-testid="status">Ready</span>';

    expect(shouldHaveTestId("save", "status")).toEqual([
      document.querySelector('[data-testid="save"]'),
      document.querySelector('[data-testid="status"]'),
    ]);
  });

  it("throws when an ID is missing", () => {
    expect(() => shouldHaveTestId("missing")).toThrow();
  });

  it("returns an empty array when no IDs are supplied", () => {
    expect(shouldHaveTestId()).toEqual([]);
  });
});
