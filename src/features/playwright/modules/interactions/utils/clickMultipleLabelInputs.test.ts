import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import { clickMultipleLabelInputs } from "./clickMultipleLabelInputs";

describe("clickMultipleLabelInputs", () => {
  it("clicks labels sequentially in the requested order", async () => {
    const calls: string[] = [];
    const page = {
      locator: vi.fn((_selector: string, options: { hasText: string | RegExp }) => ({
        click: vi.fn(async () => void calls.push(String(options.hasText))),
      })),
    } as unknown as Page;

    await clickMultipleLabelInputs(page, ["Email", /subscribe/i]);

    expect(calls).toEqual(["Email", "/subscribe/i"]);
    expect(page.locator).toHaveBeenNthCalledWith(1, "label", {
      hasText: "Email",
    });
    expect(page.locator).toHaveBeenNthCalledWith(2, "label", {
      hasText: /subscribe/i,
    });
  });

  it("does not query labels for an empty list", async () => {
    const page = { locator: vi.fn() } as unknown as Page;

    await expect(clickMultipleLabelInputs(page, [])).resolves.toBeUndefined();
    expect(page.locator).not.toHaveBeenCalled();
  });

  it("stops at the first label whose click fails", async () => {
    const failure = new Error("Label click failed");
    const click = vi
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(failure);
    const page = {
      locator: vi.fn(() => ({ click })),
    } as unknown as Page;

    await expect(
      clickMultipleLabelInputs(page, ["First", "Second", "Third"]),
    ).rejects.toBe(failure);

    expect(page.locator).toHaveBeenCalledTimes(2);
    expect(click).toHaveBeenCalledTimes(2);
  });
});
