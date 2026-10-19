import type { Page } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";

const registerTest = vi.hoisted(() => vi.fn());
vi.mock("@playwright/test", () => ({ default: registerTest }));

import { runSimilarTests } from "./runSimilarTests";

type RegisteredTest = (
  fixtures: { page: Page },
) => Promise<void>;

describe("runSimilarTests", () => {
  it("registers each named case and awaits its callbacks after navigating", async () => {
    const events: string[] = [];
    runSimilarTests(
      [
        "first case",
        async () => {
          await Promise.resolve();
          events.push("first callback");
        },
      ],
      [
        "second case",
        async () => {
          events.push("second callback");
        },
      ],
    );

    expect(registerTest).toHaveBeenCalledTimes(2);
    expect(registerTest.mock.calls.map(([name]) => name)).toEqual([
      "first case",
      "second case",
    ]);

    const page = {
      goto: vi.fn(async (url: string) => void events.push(`goto:${url}`)),
    } as unknown as Page;
    const firstTest = registerTest.mock.calls[0]?.[1] as RegisteredTest;
    const secondTest = registerTest.mock.calls[1]?.[1] as RegisteredTest;

    await firstTest({ page });
    await secondTest({ page });

    expect(events).toEqual([
      "goto:/",
      "first callback",
      "goto:/",
      "second callback",
    ]);
    expect(page.goto).toHaveBeenCalledTimes(2);
  });

  it("navigates even when a registered case has no callbacks", async () => {
    runSimilarTests(["empty case"]);

    const page = { goto: vi.fn().mockResolvedValue(undefined) } as unknown as Page;
    const callback = registerTest.mock.calls[0]?.[1] as RegisteredTest;
    await callback({ page });

    expect(page.goto).toHaveBeenCalledWith("/");
  });

  it("propagates callback failures and stops later callbacks", async () => {
    const failure = new Error("Callback failed");
    const laterCallback = vi.fn();
    runSimilarTests([
      "failing case",
      async () => {
        throw failure;
      },
      laterCallback,
    ]);

    const page = { goto: vi.fn().mockResolvedValue(undefined) } as unknown as Page;
    const callback = registerTest.mock.calls[0]?.[1] as RegisteredTest;
    await expect(callback({ page })).rejects.toBe(failure);
    expect(laterCallback).not.toHaveBeenCalled();
  });

  it("registers no tests for an empty input", () => {
    runSimilarTests();
    expect(registerTest).not.toHaveBeenCalled();
  });
});
