import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { isChecked } from "./isChecked";

const playwrightExpect = vi.hoisted(() => vi.fn());
vi.mock("@playwright/test", () => ({ expect: playwrightExpect }));

describe("isChecked", () => {
  it.each(["#terms", "#choice"])(
    "asserts a checked checkbox or radio input for %s",
    async (selector) => {
      const locator = { selector };
      const page = { locator: vi.fn(() => locator) } as unknown as Page;
      const checked = vi.fn();
      playwrightExpect.mockReturnValue({ toBeChecked: checked });

      await expect(isChecked(page, selector)).resolves.toBe(locator);

      expect(page.locator).toHaveBeenCalledWith(selector);
      expect(playwrightExpect).toHaveBeenCalledWith(locator);
      expect(checked).toHaveBeenCalledOnce();
    },
  );

  it("propagates a failed checked assertion", async () => {
    const failure = new Error("Input is not checked");
    const locator = {};
    const page = { locator: vi.fn(() => locator) } as unknown as Page;
    playwrightExpect.mockReturnValue({
      toBeChecked: vi.fn().mockRejectedValue(failure),
    });

    await expect(isChecked(page, "#terms")).rejects.toBe(failure);
  });
});
