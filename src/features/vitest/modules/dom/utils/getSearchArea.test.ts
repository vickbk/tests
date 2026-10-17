// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { getSearchArea } from "./getSearchArea";

describe("getSearchArea", () => {
  it("returns screen queries when no container is provided", () => {
    document.body.innerHTML = "<button>Save</button>";

    expect(getSearchArea().getByRole("button", { name: "Save" })).toBe(
      document.querySelector("button"),
    );
  });

  it("limits queries to the supplied container", () => {
    document.body.innerHTML =
      "<section><button>Inside</button></section><button>Outside</button>";

    const queries = getSearchArea(document.querySelector("section")!);

    expect(queries.getByRole("button", { name: "Inside" })).toBeTruthy();
    expect(() => queries.getByRole("button", { name: "Outside" })).toThrow();
  });
});
