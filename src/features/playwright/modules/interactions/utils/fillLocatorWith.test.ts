import type { Locator } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { fillLocatorWith } from "./fillLocatorWith";

describe("fillLocatorWith", () => {
  it("clicks and fills the locator, including an empty value to clear it", async () => {
    const calls: string[] = [];
    const locator = {
      click: vi.fn(async () => void calls.push("click")),
      fill: vi.fn(async (value: string) => void calls.push(`fill:${value}`)),
    } as unknown as Locator;

    await fillLocatorWith(locator, "");

    expect(calls).toEqual(["click", "fill:"]);
    expect(locator.fill).toHaveBeenCalledWith("");
  });

  it("does not fill when clicking fails", async () => {
    const failure = new Error("Click failed");
    const locator = {
      click: vi.fn().mockRejectedValue(failure),
      fill: vi.fn(),
    } as unknown as Locator;

    await expect(fillLocatorWith(locator, "value")).rejects.toBe(failure);
    expect(locator.fill).not.toHaveBeenCalled();
  });

  it("propagates fill failures after the click", async () => {
    const failure = new Error("Fill failed");
    const locator = {
      click: vi.fn().mockResolvedValue(undefined),
      fill: vi.fn().mockRejectedValue(failure),
    } as unknown as Locator;

    await expect(fillLocatorWith(locator, "value")).rejects.toBe(failure);
    expect(locator.click).toHaveBeenCalledOnce();
  });
});
