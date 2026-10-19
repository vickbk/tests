import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { getLink } from "./getLink";

describe("getLink", () => {
  it.each(["Documentation", /docs?/i])(
    "queries link accessible name %s",
    (name) => {
      const locator = {};
      const page = { getByRole: vi.fn(() => locator) } as unknown as Page;

      expect(getLink(page, name)).toBe(locator);
      expect(page.getByRole).toHaveBeenCalledWith("link", { name });
    },
  );

  it("propagates page role-query errors", () => {
    const failure = new Error("Role query failed");
    const page = {
      getByRole: vi.fn(() => {
        throw failure;
      }),
    } as unknown as Page;

    expect(() => getLink(page, "Missing")).toThrow(failure);
  });
});
