import * as React from "react";
import { describe, expect, it } from "vitest";
import { resolveArrayChild } from "./resolveArrayChild";

describe("resolveArrayChild", () => {
  it("resolves children and adds a stable key if the result has no key", async () => {
    const child = React.createElement("span");
    const resolved = React.createElement("strong");
    const result = await resolveArrayChild(child, 3, async () => resolved);

    expect(React.isValidElement(result)).toBe(true);
    if (React.isValidElement(result)) {
      expect(result.type).toBe("strong");
      expect(result.key).toBe("rsc-key-3");
    }
  });

  it("preserves an existing resolved key, falling back to the original key", async () => {
    const keyedChild = React.createElement("span", { key: "original" });
    const unkeyed = React.createElement("strong");
    const keyed = React.createElement("strong", { key: "resolved" });

    const resultWithResolvedKey = await resolveArrayChild(
      keyedChild,
      0,
      async () => keyed,
    );
    const resultWithOriginalKey = await resolveArrayChild(
      keyedChild,
      1,
      async () => unkeyed,
    );

    expect(React.isValidElement(resultWithResolvedKey)).toBe(true);
    expect(React.isValidElement(resultWithOriginalKey)).toBe(true);
    if (
      React.isValidElement(resultWithResolvedKey) &&
      React.isValidElement(resultWithOriginalKey)
    ) {
      expect(resultWithResolvedKey.key).toBe("resolved");
      expect(resultWithOriginalKey.key).toBe("original");
    }
  });

  it("returns non-element values unchanged and propagates resolver errors", async () => {
    await expect(
      resolveArrayChild("text", 0, async (node) => node),
    ).resolves.toBe("text");

    const failure = new Error("child resolution failed");
    await expect(
      resolveArrayChild(null, 0, async () => {
        throw failure;
      }),
    ).rejects.toBe(failure);
  });
});
