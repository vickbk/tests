import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { clickLabelInput } from "./clickLabelInput";

describe("clickLabelInput", () => {
  it.each(["Subscribe", /sub/i])(
    "clicks the matching label %s",
    async (labelText) => {
      const locator = { click: vi.fn().mockResolvedValue(undefined) };
      const page = { locator: vi.fn(() => locator) } as unknown as Page;

      await expect(clickLabelInput(page, labelText)).resolves.toBeUndefined();

      expect(page.locator).toHaveBeenCalledWith("label", {
        hasText: labelText,
      });
      expect(locator.click).toHaveBeenCalledOnce();
    },
  );

  it("propagates label click failures", async () => {
    const failure = new Error("Label click failed");
    const locator = { click: vi.fn().mockRejectedValue(failure) };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await expect(clickLabelInput(page, "Missing")).rejects.toBe(failure);
  });
});
