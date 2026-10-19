// @vitest-environment jsdom
import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { patternToRegex } from "@/shared/regex";
import { shouldNotSee } from "./shouldNotSee";

describe("shouldNotSee", () => {
  it("passes for hidden and absent text, including regular expressions", async () => {
    document.body.innerHTML = '<p style="display: none">Hidden notice</p>';
    const hidden = document.querySelector("p")!;
    const getByText = vi
      .fn()
      .mockReturnValueOnce(hidden)
      .mockReturnValueOnce(document.createElement("p"));

    await expect(
      shouldNotSee({ getByText } as unknown as Page, "Hidden", /Missing/i),
    ).resolves.toBeUndefined();

    expect(getByText).toHaveBeenNthCalledWith(1, "Hidden");
    expect(getByText).toHaveBeenNthCalledWith(2, /Missing/i);
  });

  it("checks indexed occurrences and rejects visible matches", async () => {
    document.body.innerHTML =
      '<p style="display: none">Repeated</p><p style="display: none">Repeated</p>';
    const elements = Array.from(document.querySelectorAll("p"));
    const locator = Object.assign(elements[0]!, {
      nth: vi.fn((index: number) => elements[index]),
    });
    const getByText = vi.fn(() => locator);
    const page = { getByText } as unknown as Page;

    await expect(shouldNotSee(page, ["Repeated", 1])).resolves.toBeUndefined();
    expect(getByText).toHaveBeenCalledWith(patternToRegex("Repeated"));
    expect(locator.nth).toHaveBeenCalledWith(1);

    document.body.innerHTML = "<p>Visible</p>";
    const visiblePage = {
      getByText: vi.fn(() => document.querySelector("p")!),
    } as unknown as Page;
    await expect(shouldNotSee(visiblePage, "Visible")).rejects.toThrow();
  });

  it("rejects when any requested match is visible", async () => {
    document.body.innerHTML = "<p>Visible</p>";
    const getByText = vi.fn(() => document.querySelector("p")!);
    await expect(
      shouldNotSee({ getByText } as unknown as Page, "Visible", "Other"),
    ).rejects.toThrow();
    expect(getByText).toHaveBeenCalledTimes(2);
  });
});
