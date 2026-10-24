// @vitest-environment jsdom
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { getTextBox } from "./getTextBox";
import { userTypes } from "./userTypes";

describe("userTypes", () => {
  it("clears and types into an input by label", async () => {
    document.body.innerHTML =
      '<label>Name<input type="text" value="Old value" /></label>';

    const input = await userTypes("Name", "New value");

    expect(input).toHaveValue("New value");
  });

  it("supports placeholder lookup, an existing user instance, and empty text", async () => {
    document.body.innerHTML = '<input placeholder="Search" value="prior" />';
    const user = userEvent.setup();

    const input = await userTypes("Search", "", undefined, user);

    expect(input).toHaveValue("");
  });

  it("uses the textbox resolved by getTextBox and supports textareas", async () => {
    document.body.innerHTML =
      '<label for="notes">Notes</label><textarea id="notes">prior</textarea>';
    const textBox = getTextBox("Notes");

    const result = await userTypes("Notes", "updated");

    expect(result).toBe(textBox);
    expect(result).toHaveValue("updated");
  });

  it("rejects for a non-text placeholder match or a missing textbox", async () => {
    document.body.innerHTML =
      '<input type="checkbox" placeholder="Alerts" /><button>Save</button>';

    await expect(userTypes("Alerts", "yes")).rejects.toThrow(/not a text-entry/i);
    await expect(userTypes("Missing", "text")).rejects.toThrow();
  });
});
