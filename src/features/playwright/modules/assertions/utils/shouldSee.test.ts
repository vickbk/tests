// @vitest-environment jsdom
import { patternToRegex } from "@/shared/regex";
import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { shouldSee } from "./shouldSee";

const toBeVisible = vi.fn().mockResolvedValue(undefined);

vi.mock("@playwright/test", () => ({
  expect: vi.fn(() => ({
    toBeVisible,
  })),
}));

describe("shouldSee", () => {
  it("asserts text, regular expressions, and indexed text matches", async () => {
    document.body.innerHTML =
      "<p>Welcome</p><p>Saved successfully</p><p>Repeated</p><p>Repeated</p>";
    const matches = Array.from(document.querySelectorAll("p"));
    const indexedLocator = Object.assign(matches[0]!, {
      nth: vi.fn((index: number) => matches[index]),
      count: vi.fn((index: number) => index),
      isVisible: vi.fn().mockResolvedValue(true),
    });

    const getByText = vi.fn(() => indexedLocator);
    const page = { getByText } as unknown as Page;

    await expect(
      shouldSee(page, "Welcome", /Saved/i, ["Repeated", 1]),
    ).resolves.toBeUndefined();

    expect(getByText).toHaveBeenNthCalledWith(1, "Welcome");
    expect(getByText).toHaveBeenNthCalledWith(2, /Saved/i);
    expect(getByText).toHaveBeenNthCalledWith(3, patternToRegex("Repeated"));
    expect(indexedLocator.nth).toHaveBeenCalledWith(1);
  });

  it("rejects when requested text is missing", async () => {
    document.body.innerHTML = "";
    const page = {
      getByText: vi.fn(() => document.createElement("p")),
    } as unknown as Page;

    toBeVisible.mockRejectedValueOnce(new Error("Element not visible"));
    await expect(shouldSee(page, "Missing")).rejects.toThrow();
  });

  it("checks each requested match in sequence and stops on failure", async () => {
    document.body.innerHTML = "<p>First</p><p>Second</p>";
    const elements = Array.from(document.querySelectorAll("p"));
    const getByText = vi
      .fn()
      .mockReturnValueOnce(elements[0]!)
      .mockReturnValueOnce(document.createElement("p"));

    toBeVisible.mockRejectedValueOnce(new Error("Element not visible"));
    await expect(
      shouldSee({ getByText } as unknown as Page, "First", "Missing"),
    ).rejects.toThrow();
    expect(getByText).toHaveBeenCalledTimes(2);
  });
});
