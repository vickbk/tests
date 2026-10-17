// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { userTypesMultiple } from "./userTypesMultiple";

describe("userTypesMultiple", () => {
  it("types into each textbox and returns them by selector", async () => {
    document.body.innerHTML =
      '<label>Email<input type="text" /></label><label>Name<input type="text" /></label>';

    const inputs = await userTypesMultiple({
      Email: "a@b.c",
      Name: "P",
    });

    expect(inputs.Email).toHaveValue("a@b.c");
    expect(inputs.Name).toHaveValue("P");
  });

  it("returns an empty object for no inputs", async () => {
    await expect(userTypesMultiple({})).resolves.toEqual({});
  });

  it("rejects if any specified textbox is absent", async () => {
    await expect(userTypesMultiple({ Missing: "text" })).rejects.toThrow();
  });
});
