// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { getTextBox } from "./getTextBox";

describe("getTextBox", () => {
  it("finds labeled text inputs and textareas", () => {
    document.body.innerHTML = `
      <label for="name">Name</label><input id="name" type="text" />
      <label for="notes">Notes</label><textarea id="notes"></textarea>
    `;

    expect(getTextBox("Name")).toBeInstanceOf(HTMLInputElement);
    expect(getTextBox("Notes")).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("finds a textbox by placeholder when no accessible name matches", () => {
    document.body.innerHTML = '<input placeholder="Search items" />';

    expect(getTextBox("Search items")).toBeInstanceOf(HTMLInputElement);
  });

  it.each([
    {
      name: "button",
      markup: '<button aria-label="Save">Save</button>',
      target: "Save",
    },
    {
      name: "div",
      markup: '<div aria-label="Output">Result</div>',
      target: "Output",
    },
    {
      name: "checkbox",
      markup:
        '<label><input type="checkbox" placeholder="Enable alerts" /> Enable alerts</label>',
      target: "Enable alerts",
    },
  ])("rejects a non-text $name target", ({ markup, target }) => {
    document.body.innerHTML = markup;

    expect(() => getTextBox(target)).toThrow();
  });

  it("scopes name and placeholder searches to the supplied container", () => {
    document.body.innerHTML = `
      <section aria-label="dialog">
        <label for="inside">Email</label><input id="inside" type="email" />
        <input placeholder="Search here" contenteditable="true" role="textbox" />
      </section>
      <label for="outside">Email</label><input id="outside" type="text" />
    `;
    const container = document.querySelector("section") as HTMLElement;

    expect(getTextBox("Email", container).id).toBe("inside");
    expect(getTextBox("Search here", container)).toBeInstanceOf(
      HTMLInputElement,
    );
    expect(() => getTextBox("Missing", container)).toThrow();
  });

  it("propagates a useful query error when no matching textbox exists", () => {
    document.body.innerHTML = "<button>Continue</button>";

    expect(() => getTextBox("Missing")).toThrow(/textbox/i);
  });

  it("finds a labeled search input", () => {
    document.body.innerHTML = `
      <label for="site-search">Search</label>
      <input id="site-search" type="search" />
    `;

    const result = getTextBox("Search");

    expect(result).toBeInstanceOf(HTMLInputElement);
    expect((result as HTMLInputElement).type).toBe("search");
  });

  it("rejects a labeled non-text control", () => {
    document.body.innerHTML = `
      <label for="notifications">Enable notifications</label>
      <input id="notifications" type="checkbox" />
    `;

    expect(() => getTextBox("Enable notifications")).toThrow(
      /label.*not a text-entry control/i,
    );
  });

  it("prefers a label match over a placeholder match", () => {
    document.body.innerHTML = `
      <label for="name">Name</label>
      <input id="name" type="text" />
      <input id="other" type="text" placeholder="Name" />
    `;

    expect(getTextBox("Name").id).toBe("name");
  });
});
