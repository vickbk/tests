import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { patternToRegex } from "@/shared/regex";
import { setLocatorValue } from "./setLocatorValue";

describe("setLocatorValue", () => {
  it("clicks the matching label and fills its value", async () => {
    const locator = { click: vi.fn(), fill: vi.fn() };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await setLocatorValue(page, ["Email", "person@example.com"]);

    expect(page.locator).toHaveBeenCalledWith("label", {
      hasText: patternToRegex("Email"),
    });
    expect(locator.click).toHaveBeenCalledOnce();
    expect(locator.fill).toHaveBeenCalledWith("person@example.com");
  });

  it("preserves regular-expression matchers and allows clearing", async () => {
    const expression = /^E-mail$/;
    const locator = { click: vi.fn(), fill: vi.fn() };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await setLocatorValue(page, [expression, ""]);

    expect(page.locator).toHaveBeenCalledWith("label", { hasText: expression });
    expect(locator.fill).toHaveBeenCalledWith("");
  });

  it("stops before filling if the label click fails", async () => {
    const failure = new Error("Click failed");
    const locator = {
      click: vi.fn().mockRejectedValue(failure),
      fill: vi.fn(),
    };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await expect(setLocatorValue(page, ["Email", "value"])).rejects.toBe(
      failure,
    );
    expect(locator.fill).not.toHaveBeenCalled();
  });

  it("propagates fill failures", async () => {
    const failure = new Error("Fill failed");
    const locator = {
      click: vi.fn().mockResolvedValue(undefined),
      fill: vi.fn().mockRejectedValue(failure),
    };
    const page = { locator: vi.fn(() => locator) } as unknown as Page;

    await expect(setLocatorValue(page, ["Email", "value"])).rejects.toBe(
      failure,
    );
  });
});
