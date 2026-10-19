import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { clickBodyCorner } from "./clickBodyCorner";

describe("clickBodyCorner", () => {
  it("clicks the body at its top-left corner", async () => {
    const locator = { click: vi.fn().mockResolvedValue(undefined) };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await expect(clickBodyCorner(page)).resolves.toBeUndefined();

    expect(page.locator).toHaveBeenCalledWith("body");
    expect(locator.click).toHaveBeenCalledWith({ position: { x: 0, y: 0 } });
  });

  it("propagates body click failures", async () => {
    const failure = new Error("Body click failed");
    const locator = { click: vi.fn().mockRejectedValue(failure) };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await expect(clickBodyCorner(page)).rejects.toBe(failure);
  });
});
