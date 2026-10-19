import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { isNotChecked } from "./isNotChecked";

const playwrightExpect = vi.hoisted(() => vi.fn());
vi.mock("@playwright/test", () => ({ expect: playwrightExpect }));

describe("isNotChecked", () => {
  it.each(["#terms", "#choice"])(
    "asserts an unchecked checkbox or radio input for %s",
    async (selector) => {
      const locator = { selector };
      const page = { locator: vi.fn(() => locator) } as unknown as Page;
      const checked = vi.fn();
      playwrightExpect.mockReturnValue({ not: { toBeChecked: checked } });

      await expect(isNotChecked(page, selector)).resolves.toBe(locator);

      expect(page.locator).toHaveBeenCalledWith(selector);
      expect(playwrightExpect).toHaveBeenCalledWith(locator);
      expect(checked).toHaveBeenCalledOnce();
    },
  );

  it("propagates a failed unchecked assertion", async () => {
    const failure = new Error("Input is checked");
    const locator = {};
    const page = { locator: vi.fn(() => locator) } as unknown as Page;
    playwrightExpect.mockReturnValue({
      not: { toBeChecked: vi.fn().mockRejectedValue(failure) },
    });

    await expect(isNotChecked(page, "#terms")).rejects.toBe(failure);
  });
});
