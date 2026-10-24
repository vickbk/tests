import * as React from "react";
import { describe, expect, it } from "vitest";
import { resolveProps } from "./resolveProps";

describe("resolveProps", () => {
  it("resolves nested elements and arrays while preserving other values", async () => {
    const element = React.createElement("span");
    const resolvedElement = React.createElement("strong");
    const resolveTree = async (node: React.ReactNode) => {
      if (node === element) return resolvedElement;
      if (Array.isArray(node)) {
        return node.map((child) => (child === element ? resolvedElement : child));
      }
      return node;
    };

    const props = { children: element, list: [element], label: "unchanged" };
    const result = await resolveProps(
      props,
      resolveTree,
    );

    expect(result).toEqual({
      newProps: {
        children: resolvedElement,
        list: [resolvedElement],
        label: "unchanged",
      },
      hasChanged: true,
    });
    expect(result.newProps).not.toBe(props);
  });

  it("returns a shallow copy and reports unchanged props when nothing resolves", async () => {
    const props = { value: 1, empty: null };
    const result = await resolveProps(props, async (node) => node);

    expect(result).toEqual({ newProps: props, hasChanged: false });
    expect(result.newProps).not.toBe(props);
  });

  it("propagates resolver errors", async () => {
    const failure = new Error("nested resolution failed");
    const element = React.createElement("span");

    await expect(
      resolveProps({ children: element }, async () => {
        throw failure;
      }),
    ).rejects.toBe(failure);
  });

  it("does not invoke the resolver for empty props", async () => {
    let wasCalled = false;
    const result = await resolveProps({}, async (node) => {
      wasCalled = true;
      return node;
    });

    expect(result).toEqual({ newProps: {}, hasChanged: false });
    expect(wasCalled).toBe(false);
  });
});
