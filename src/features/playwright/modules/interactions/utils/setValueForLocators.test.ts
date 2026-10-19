import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { patternToRegex } from "@/shared/regex";
import { setValueForLocators } from "./setValueForLocators";

describe("setValueForLocators", () => {
  it("updates multiple fields sequentially", async () => {
    const calls: string[] = [];
    const locator = {
      click: vi.fn(async () => void calls.push("click")),
      fill: vi.fn(async (value: string) => void calls.push(`fill:${value}`)),
    };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await setValueForLocators(page, [
      ["Email", "person@example.com"],
      ["Name", "Alex"],
    ]);

    expect(calls).toEqual([
      "click",
      "fill:person@example.com",
      "click",
      "fill:Alex",
    ]);
    expect(page.locator).toHaveBeenNthCalledWith(1, "label", {
      hasText: patternToRegex("Email"),
    });
    expect(page.locator).toHaveBeenNthCalledWith(2, "label", {
      hasText: patternToRegex("Name"),
    });
  });

  it("does nothing for an empty batch", async () => {
    const page = { locator: vi.fn() } as unknown as Page;

    await expect(setValueForLocators(page, [])).resolves.toBeUndefined();
    expect(page.locator).not.toHaveBeenCalled();
  });

  it("stops at the first failed field", async () => {
    const failure = new Error("Second field failed");
    let fillCount = 0;
    const locator = {
      click: vi.fn().mockResolvedValue(undefined),
      fill: vi.fn(async () => {
        fillCount += 1;
        if (fillCount === 2) throw failure;
      }),
    };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await expect(
      setValueForLocators(page, [
        ["First", "one"],
        ["Second", "two"],
        ["Third", "three"],
      ]),
    ).rejects.toBe(failure);

    expect(page.locator).toHaveBeenCalledTimes(2);
    expect(locator.fill).toHaveBeenCalledTimes(2);
  });
});
