import { describe, expect, it } from "vitest";
import { resolvedPromise } from "./resolvedPromise";

describe("resolvedPromise", () => {
  it("resolves with the supplied payload and retains its object identity and type", async () => {
    const payload = { id: 42, tags: ["vitest"] };
    const promise = resolvedPromise(payload);

    await expect(promise).resolves.toBe(payload);
    expect(promise.status).toBe("fulfilled");
    expect(promise.value).toBe(payload);
    expect((await promise).tags).toEqual(["vitest"]);
  });

  it("supports primitive values and empty strings", async () => {
    await expect(resolvedPromise("")).resolves.toBe("");
    await expect(resolvedPromise(0)).resolves.toBe(0);
  });
});
