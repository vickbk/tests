import * as React from "react";
import { describe, expect, it } from "vitest";
import { resolveElement } from "./resolveElement";

describe("resolveElement", () => {
  it("executes a server function component and resolves its output", async () => {
    function Page() {
      return React.createElement("main", null, "page");
    }

    const result = await resolveElement(
      React.createElement(Page),
      async (node) => node,
    );

    expect(result).toEqual(React.createElement("main", null, "page"));
  });

  it("keeps client components untouched and does not invoke them", async () => {
    let invoked = false;
    function Client() {
      invoked = true;
      return null;
    }
    Object.assign(Client, {
      $$typeof: Symbol.for("react.client.reference"),
    });
    const element = React.createElement(Client);

    await expect(resolveElement(element, async (node) => node)).resolves.toBe(
      element,
    );
    expect(invoked).toBe(false);
  });

  it("clones non-function elements only when a prop tree changes", async () => {
    const child = React.createElement("i");
    const replacement = React.createElement("b");
    const element = React.createElement("div", { children: child });

    const unchanged = await resolveElement(element, async (node) => node);
    const changed = await resolveElement(element, async (node) =>
      node === child ? replacement : node,
    );

    expect(unchanged).toBe(element);
    expect(changed).not.toBe(element);
    expect(React.isValidElement(changed)).toBe(true);
    if (React.isValidElement(changed)) {
      expect(
        (changed as React.ReactElement<{ children: React.ReactNode }>).props
          .children,
      ).toBe(replacement);
    }
  });

  it("propagates component and child resolution failures", async () => {
    const failure = new Error("resolution failed");
    function Broken(): never {
      throw failure;
    }

    await expect(
      resolveElement(React.createElement(Broken), async (node) => node),
    ).rejects.toBe(failure);

    const element = React.createElement("div", {
      children: React.createElement("span"),
    });
    await expect(
      resolveElement(element, async () => {
        throw failure;
      }),
    ).rejects.toBe(failure);
  });
});
