import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { getLabel } from "./getLabel";

describe("getLabel", () => {
  it.each(["Email", /e-?mail/i])("finds label text matcher %s", (hasText) => {
    const locator = {};
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    expect(getLabel(page, hasText)).toBe(locator);
    expect(page.locator).toHaveBeenCalledWith("label", { hasText });
  });

  it("propagates page locator errors", () => {
    const failure = new Error("Locator failed");
    const page = {
      locator: vi.fn(() => {
        throw failure;
      }),
    } as unknown as Page;

    expect(() => getLabel(page, "Missing")).toThrow(failure);
  });
});
