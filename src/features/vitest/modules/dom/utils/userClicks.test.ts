// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { userClicks } from "./userClicks";

describe("userClicks", () => {
  it("clicks a button by accessible name", async () => {
    document.body.innerHTML = '<button type="button">Save</button>';
    const onClick = vi.fn();
    document.querySelector("button")!.addEventListener("click", onClick);

    await userClicks("Save");

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("can click matching text within a supplied container", async () => {
    document.body.innerHTML = "<section><span>Open details</span></section>";
    const onClick = vi.fn();
    const span = document.querySelector("span")!;
    span.addEventListener("click", onClick);

    await userClicks(/open details/i, document.querySelector("section")!);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("rejects when there is no matching element", async () => {
    await expect(userClicks("Missing")).rejects.toThrow();
  });
});
