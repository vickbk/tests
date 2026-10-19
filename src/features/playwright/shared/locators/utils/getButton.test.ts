import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { getButton } from "./getButton";

describe("getButton", () => {
  it.each(["Save", /save/i])("finds button text matcher %s", (hasText) => {
    const locator = {};
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    expect(getButton(page, hasText)).toBe(locator);
    expect(page.locator).toHaveBeenCalledWith("button", { hasText });
  });

  it("propagates page locator errors", () => {
    const failure = new Error("Locator failed");
    const page = {
      locator: vi.fn(() => {
        throw failure;
      }),
    } as unknown as Page;

    expect(() => getButton(page, "Missing")).toThrow(failure);
  });
});
