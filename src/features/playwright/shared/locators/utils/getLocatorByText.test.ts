import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { getLocatorByText } from "./getLocatorByText";

describe("getLocatorByText", () => {
  it.each([
    ["button", "Save"],
    ["section article", /draft/i],
  ] as const)("passes selector and text matcher through unchanged", (selector, hasText) => {
    const locator = {};
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    expect(getLocatorByText(page, [selector, hasText])).toBe(locator);
    expect(page.locator).toHaveBeenCalledWith(selector, { hasText });
  });

  it("propagates locator errors", () => {
    const failure = new Error("Invalid selector");
    const page = {
      locator: vi.fn(() => {
        throw failure;
      }),
    } as unknown as Page;

    expect(() => getLocatorByText(page, ["[", "text"])).toThrow(failure);
  });
});
