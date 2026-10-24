import * as React from "react";
import { describe, expect, it } from "vitest";
import { isClassComponent } from "./isClassComponent";

describe("isClassComponent", () => {
  it("recognizes React class component types", () => {
    class Component extends React.Component {
      render() {
        return null;
      }
    }

    expect(isClassComponent(Component)).toBe(true);
  });

  it("rejects functions without the React class marker", () => {
    expect(isClassComponent(function Component() {})).toBe(false);
  });

  it("rejects non-function and malformed values", () => {
    expect(isClassComponent(null)).toBe(false);
    expect(isClassComponent(undefined)).toBe(false);
    expect(isClassComponent({ prototype: { isReactComponent: true } })).toBe(
      false,
    );
    expect(isClassComponent("Component")).toBe(false);
  });
});
