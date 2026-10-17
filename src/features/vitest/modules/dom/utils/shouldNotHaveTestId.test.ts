// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { shouldNotHaveTestId } from "./shouldNotHaveTestId";

describe("shouldNotHaveTestId", () => {
  it("returns null for each absent test ID", () => {
    expect(shouldNotHaveTestId("loading", "error")).toEqual([null, null]);
  });

  it("throws if any requested ID is present", () => {
    document.body.innerHTML = '<div data-testid="loading"></div>';

    expect(() => shouldNotHaveTestId("loading")).toThrow();
  });

  it("returns an empty array when no IDs are supplied", () => {
    expect(shouldNotHaveTestId()).toEqual([]);
  });
});
