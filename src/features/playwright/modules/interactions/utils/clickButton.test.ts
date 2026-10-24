import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { clickButton } from "./clickButton";

describe("clickButton", () => {
  it.each(["Save", /save/i])("clicks a button matching %s", async (hasText) => {
    const locator = { click: vi.fn().mockResolvedValue(undefined) };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await expect(clickButton(page, hasText)).resolves.toBeUndefined();

    expect(page.locator).toHaveBeenCalledWith("button", { hasText });
    expect(locator.click).toHaveBeenCalledOnce();
  });

  it("propagates click failures", async () => {
    const failure = new Error("Button click failed");
    const locator = { click: vi.fn().mockRejectedValue(failure) };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await expect(clickButton(page, "Missing")).rejects.toBe(failure);
  });
});
