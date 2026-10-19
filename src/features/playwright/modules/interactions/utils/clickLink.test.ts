import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { clickLink } from "./clickLink";

describe("clickLink", () => {
  it.each(["Documentation", /docs?/i])(
    "clicks the link with accessible name %s",
    async (name) => {
      const locator = { click: vi.fn().mockResolvedValue(undefined) };
      const page = { getByRole: vi.fn(() => locator) } as unknown as Page;

      await expect(clickLink(page, name)).resolves.toBeUndefined();

      expect(page.getByRole).toHaveBeenCalledWith("link", { name });
      expect(locator.click).toHaveBeenCalledOnce();
    },
  );

  it("propagates link click failures", async () => {
    const failure = new Error("Navigation failed");
    const locator = { click: vi.fn().mockRejectedValue(failure) };
    const page = { getByRole: vi.fn(() => locator) } as unknown as Page;

    await expect(clickLink(page, "Documentation")).rejects.toBe(failure);
  });
});
