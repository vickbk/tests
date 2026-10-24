// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { shouldNotSee } from "./shouldNotSee";

describe("shouldNotSee", () => {
  it("passes when all requested text is absent", () => {
    document.body.innerHTML = "<p>Everything is fine</p>";

    expect(() => shouldNotSee("Error", /failed/i)).not.toThrow();
  });

  it("throws when a requested text is present", () => {
    document.body.innerHTML = "<p>Error occurred</p>";

    expect(() => shouldNotSee("Error")).toThrow();
  });

  it("accepts an empty matcher list", () => {
    expect(() => shouldNotSee()).not.toThrow();
  });
});
