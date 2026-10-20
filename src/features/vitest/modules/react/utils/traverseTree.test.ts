import * as React from "react";
import { describe, expect, it } from "vitest";
import { traverseTree } from "./traverseTree";

describe("traverseTree", () => {
  it("returns nullish values, primitives, and non-element objects unchanged", async () => {
    const resolver = async (node: React.ReactNode) => node;

    await expect(traverseTree(null, resolver)).resolves.toBeNull();
    await expect(traverseTree(undefined, resolver)).resolves.toBeUndefined();
    await expect(traverseTree("text", resolver)).resolves.toBe("text");
    await expect(traverseTree(5, resolver)).resolves.toBe(5);
  });

  it("traverses elements and arrays using the provided resolver", async () => {
    const first = React.createElement("i");
    const second = React.createElement("b");
    function Component() {
      return first;
    }
    const resolver = async (node: React.ReactNode) =>
      node === first ? second : node;

    const elementResult = await traverseTree(
      React.createElement(Component),
      resolver,
    );
    const arrayResult = await traverseTree([first, "text"], resolver);

    expect(React.isValidElement(elementResult)).toBe(true);
    if (React.isValidElement(elementResult)) {
      expect(elementResult.type).toBe("b");
    }
    expect(Array.isArray(arrayResult)).toBe(true);
    if (Array.isArray(arrayResult)) {
      expect(React.isValidElement(arrayResult[0])).toBe(true);
      if (React.isValidElement(arrayResult[0])) {
        expect(arrayResult[0].type).toBe("b");
        expect(arrayResult[0].key).toBe("rsc-key-0");
      }
      expect(arrayResult[1]).toBe("text");
    }
  });

  it("propagates errors raised while traversing an element or array child", async () => {
    const failure = new Error("tree traversal failed");
    const resolver = async (): Promise<React.ReactNode> => {
      throw failure;
    };
    function Component() {
      return React.createElement("div");
    }

    await expect(
      traverseTree(React.createElement(Component), resolver),
    ).rejects.toBe(failure);
    await expect(
      traverseTree([React.createElement("span")], resolver),
    ).rejects.toBe(failure);
  });

  it("returns an object that is not a React element or array unchanged", async () => {
    const resolver = async (node: React.ReactNode) => node;
    const obj = { key: "value" };
    // @ts-expect-error - testing non-element object behavior
    await expect(traverseTree(obj, resolver)).resolves.toBe(obj);
  });
});
