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
});
