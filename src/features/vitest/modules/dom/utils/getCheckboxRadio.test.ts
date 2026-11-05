// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { getCheckboxRadio } from "./getCheckboxRadio";

describe("getCheckboxRadio", () => {
  it("finds checkboxes by accessible name", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" checked /> Accept terms</label>';

    const checkbox = getCheckboxRadio("Accept terms");

    expect(checkbox).toBeInstanceOf(HTMLInputElement);
    expect(checkbox).toBeChecked();
  });

  it("finds radio buttons by accessible name", () => {
    document.body.innerHTML = `
      <label><input type="radio" name="plan" value="basic" /> Basic</label>
      <label><input type="radio" name="plan" value="pro" checked /> Pro</label>
    `;

    const radio = getCheckboxRadio("Pro");

    expect(radio).toBeInstanceOf(HTMLInputElement);
    expect(radio).toBeChecked();
    expect(getCheckboxRadio("Basic")).not.toBeChecked();
  });

  it.each([
    {
      name: "text input",
      markup: '<label><input type="text" /> Name</label>',
      target: "Name",
    },
    {
      name: "button",
      markup: '<button aria-label="Save">Save</button>',
      target: "Save",
    },
    {
      name: "div",
      markup: '<div aria-label="Status">Ready</div>',
      target: "Status",
    },
  ])("rejects a non-checkbox/radio $name target", ({ markup, target }) => {
    document.body.innerHTML = markup;

    expect(() => getCheckboxRadio(target)).toThrow(/checkbox or radio/i);
  });

  it("limits the search to the supplied container", () => {
    document.body.innerHTML = `
      <section><label><input type="checkbox" checked /> Inside</label></section>
      <label><input type="checkbox" checked /> Outside</label>
    `;
    const container = document.querySelector("section") as HTMLElement;

    expect(getCheckboxRadio("Inside", container)).toBeChecked();
    expect(() => getCheckboxRadio("Outside", container)).toThrow();
  });

  it("supports regular-expression accessible names", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" /> Receive product updates</label>';

    expect(getCheckboxRadio(/product/i)).not.toBeChecked();
  });

  it("finds a checkbox by its accessible role and name", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" /> Accept terms</label>';

    const element = getCheckboxRadio("Accept terms");

    expect(element).toBeInstanceOf(HTMLInputElement);
    expect(element).toHaveProperty("type", "checkbox");
  });

  it("finds a radio button by its accessible role and name", () => {
    document.body.innerHTML =
      '<label><input type="radio" name="plan" /> Pro</label>';

    const element = getCheckboxRadio("Pro");

    expect(element).toHaveProperty("type", "radio");
  });

  it("falls back to label lookup when role lookup cannot find the control", () => {
    document.body.innerHTML =
      '<label for="terms">Accept terms</label><input id="terms" type="checkbox" role="presentation" />';

    const element = getCheckboxRadio("Accept terms");

    expect(element).toBeInstanceOf(HTMLInputElement);
    expect(element).toHaveProperty("type", "checkbox");
  });

  it("supports explicitly associated labels", () => {
    document.body.innerHTML =
      '<label for="terms">Accept terms</label><input id="terms" type="checkbox" />';

    const element = getCheckboxRadio("Accept terms");

    expect(element).toHaveProperty("type", "checkbox");
  });

  it("supports wrapping labels", () => {
    document.body.innerHTML =
      '<label>Accept terms <input type="checkbox" /></label>';

    const element = getCheckboxRadio("Accept terms");

    expect(element).toHaveProperty("type", "checkbox");
  });

  it("supports regular expression matching", () => {
    document.body.innerHTML =
      '<label><input type="checkbox" /> Accept all terms</label>';

    expect(getCheckboxRadio(/accept.*terms/i)).toHaveProperty(
      "type",
      "checkbox",
    );
  });

  it("respects container scoping", () => {
    document.body.innerHTML = `
      <section>
        <label for="inside">Accept terms</label>
        <input id="inside" type="checkbox" role="presentation" />
      </section>
      <label for="outside">Accept terms</label>
      <input id="outside" type="checkbox" role="presentation" />
    `;

    const section = document.querySelector("section")!;

    const element = getCheckboxRadio("Accept terms", section);

    expect(element).toBe(document.querySelector("#inside"));
  });

  it("rejects a matching label associated with a text input", () => {
    document.body.innerHTML =
      '<label for="name">Name</label><input id="name" type="text" />';

    expect(() => getCheckboxRadio("Name")).toThrow(
      /checkbox or radio control/i,
    );
  });

  it("rejects a matching label associated with a select", () => {
    document.body.innerHTML =
      '<label for="country">Country</label><select id="country"><option>US</option></select>';

    expect(() => getCheckboxRadio("Country")).toThrow(
      /checkbox or radio control/i,
    );
  });

  it("throws when no matching control exists", () => {
    document.body.innerHTML = "";

    expect(() => getCheckboxRadio("Missing")).toThrow(
      /checkbox or radio control/i,
    );
  });
});
