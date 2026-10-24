import * as React from "react";
import { describe, expect, it } from "vitest";
import { resolveRscTree } from "../index";

describe("resolveRscTree", () => {
  it("resolves synchronous function components", async () => {
    function Greeting({ name }: { name: string }) {
      return React.createElement("p", null, `Hello ${name}`);
    }

    await expect(
      resolveRscTree(React.createElement(Greeting, { name: "Ada" })),
    ).resolves.toEqual(React.createElement("p", null, "Hello Ada"));
  });

  it("resolves class components", async () => {
    class ClassPage extends React.Component {
      render() {
        return React.createElement("main", null, "class result");
      }
    }

    await expect(
      resolveRscTree(React.createElement(ClassPage)),
    ).resolves.toEqual(React.createElement("main", null, "class result"));
  });

  it("resolves nested components inside arrays and fragments", async () => {
    function Nested() {
      return React.createElement("strong", null, "resolved");
    }

    function Parent() {
      return React.createElement(
        React.Fragment,
        null,
        React.createElement("span", null, "before"),
        React.createElement(Nested),
      );
    }

    const resolved = await resolveRscTree(
      React.createElement(
        React.Fragment,
        null,
        React.createElement(Parent),
        [React.createElement(Nested)],
      ),
    );
    const outerChildren = React.Children.toArray(
      (resolved as React.ReactElement<{ children: React.ReactNode }>).props
        .children,
    );

    expect(outerChildren).toHaveLength(2);
    expect(React.isValidElement(outerChildren[0])).toBe(true);
    expect(React.isValidElement(outerChildren[1])).toBe(true);
    if (
      !React.isValidElement(outerChildren[0]) ||
      !React.isValidElement(outerChildren[1])
    ) {
      throw new Error("Expected resolved React elements");
    }

    expect(outerChildren[0].type).toBe(React.Fragment);
    expect(outerChildren[1].type).toBe("strong");
    expect(
      React.Children.toArray(
        (
          outerChildren[0] as React.ReactElement<{
            children: React.ReactNode;
          }>
        ).props.children,
      ).map((child) => (React.isValidElement(child) ? child.type : child)),
    ).toEqual(["span", "strong"]);
  });

  it("awaits asynchronous server components", async () => {
    async function AsyncPage() {
      return React.createElement("main", null, "async result");
    }

    await expect(
      resolveRscTree(React.createElement(AsyncPage)),
    ).resolves.toEqual(React.createElement("main", null, "async result"));
  });

  it("preserves client component references without invoking them", async () => {
    let wasInvoked = false;
    function ClientComponent() {
      wasInvoked = true;
      return React.createElement("button", null, "client");
    }
    Object.assign(ClientComponent, {
      $$typeof: Symbol.for("react.client.reference"),
      $$id: "client-module#ClientComponent",
    });
    const element = React.createElement(ClientComponent);

    await expect(resolveRscTree(element)).resolves.toBe(element);
    expect(wasInvoked).toBe(false);
  });

  it("propagates component errors instead of replacing failures with null", async () => {
    const failure = new Error("Server component failed");
    function BrokenPage(): never {
      throw failure;
    }

    await expect(resolveRscTree(React.createElement(BrokenPage))).rejects.toBe(
      failure,
    );
  });

  it("retains a deliberate null component result", async () => {
    function EmptyPage() {
      return null;
    }

    await expect(
      resolveRscTree(React.createElement(EmptyPage)),
    ).resolves.toBeNull();
  });
});
