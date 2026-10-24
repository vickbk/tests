import { describe, expect, it } from "vitest";
import { isClientComponent } from "./isClientComponent";

describe("isClientComponent", () => {
  it("recognizes React client and module references", () => {
    expect(
      isClientComponent({ $$typeof: Symbol.for("react.client.reference") }),
    ).toBe(true);
    expect(
      isClientComponent({ $$typeof: Symbol.for("react.module.reference") }),
    ).toBe(true);
  });

  it("recognizes module IDs and functions containing hook calls", () => {
    expect(isClientComponent({ $$id: "client-module#Button" })).toBe(true);

    const useState = () => undefined;
    function UsesHook() {
      useState();
    }

    expect(isClientComponent(UsesHook)).toBe(true);
  });

  it("does not classify ordinary functions and objects as client components", () => {
    expect(isClientComponent(() => "server")).toBe(false);
    expect(isClientComponent({ $$typeof: Symbol.for("other.reference") })).toBe(
      false,
    );
    expect(isClientComponent({ $$id: 123 })).toBe(false);
  });

  it("handles nullish and primitive inputs", () => {
    expect(isClientComponent(null)).toBe(false);
    expect(isClientComponent(undefined)).toBe(false);
    expect(isClientComponent("Component")).toBe(false);
    expect(isClientComponent(42)).toBe(false);
  });
});
