// @vitest-environment jsdom
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
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

  it("rejects when no matching textbox exists", async () => {
    await expect(userTypes("Missing", "text")).rejects.toThrow();
  });
});
