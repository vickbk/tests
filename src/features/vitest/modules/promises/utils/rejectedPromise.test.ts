import { describe, expect, it } from "vitest";
import { rejectedPromise } from "./rejectedPromise";

describe("rejectedPromise", () => {
  it("rejects with the supplied Error and exposes rejection metadata", async () => {
    const reason = new Error("Request failed");
    const promise = rejectedPromise(reason);

    expect(promise.status).toBe("rejected");
    expect(promise.reason).toBe(reason);
    await expect(promise).rejects.toBe(reason);
    await expect(rejectedPromise(reason)).rejects.toThrow("Request failed");
  });

  it("preserves non-Error reasons", async () => {
    const reason = { code: "INVALID" };

    await expect(rejectedPromise(reason)).rejects.toBe(reason);
  });

  it("rejects with undefined when no reason is passed", async () => {
    const promise = rejectedPromise();

    expect(promise.reason).toBeUndefined();
    await expect(promise).rejects.toBeUndefined();
  });
});
