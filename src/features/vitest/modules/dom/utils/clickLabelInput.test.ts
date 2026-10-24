// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { clickLabelInput } from "./clickLabelInput";

describe("clickLabelInput", () => {
  it("clicks the input associated with a label", async () => {
    document.body.innerHTML =
      '<label>Email address<input type="email" /></label>';
    const onClick = vi.fn();
    document.querySelector("input")!.addEventListener("click", onClick);

    await clickLabelInput("Email address");

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports an empty placeholder and rejects a missing input", async () => {
    document.body.innerHTML = '<input placeholder="" />';

    await expect(clickLabelInput("")).resolves.toBeUndefined();
    await expect(clickLabelInput("Missing")).rejects.toThrow();
  });

  it("supports an empty label and rejects a missing input", async () => {
    document.body.innerHTML = '<label><input type="text" /></label>';

    await expect(clickLabelInput("")).resolves.toBeUndefined();
    await expect(clickLabelInput("Missing")).rejects.toThrow();
  });
});
