import * as React from "react";
import { describe, expect, it } from "vitest";
import { executeServerComponent } from "./executeServerComponent";

describe("executeServerComponent", () => {
  it("executes a function component with its props", async () => {
    const Component: React.FunctionComponent<Record<string, unknown>> = (
      props,
    ) => React.createElement("p", null, props.label as string);

    await expect(
      executeServerComponent(Component, { label: "server" }),
    ).resolves.toEqual(React.createElement("p", null, "server"));
  });

  it("awaits a promise returned by an async function component", async () => {
    const Component: React.FunctionComponent<Record<string, unknown>> =
      async () => React.createElement("div", null, "async");

    await expect(executeServerComponent(Component, {})).resolves.toEqual(
      React.createElement("div", null, "async"),
    );
  });

  it("instantiates class components and returns their render output", async () => {
    class Component extends React.Component<Record<string, unknown>> {
      render() {
        return React.createElement("section", null, "class");
      }
    }

    await expect(executeServerComponent(Component, {})).resolves.toEqual(
      React.createElement("section", null, "class"),
    );
  });

  it("propagates synchronous and asynchronous component failures", async () => {
    const failure = new Error("component failed");
    const SyncFailure: React.FunctionComponent<Record<string, unknown>> =
      () => {
        throw failure;
      };
    const AsyncFailure: React.FunctionComponent<Record<string, unknown>> =
      async () => {
        throw failure;
      };

    await expect(executeServerComponent(SyncFailure, {})).rejects.toBe(failure);
    await expect(executeServerComponent(AsyncFailure, {})).rejects.toBe(
      failure,
    );
  });
});
