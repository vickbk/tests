/**
 * Creates a rejected promise augmented with Vitest's rejected-promise metadata.
 *
 * @param reason The rejection reason, preserved as an unknown value; defaults to `undefined`.
 * @returns A rejected Promise<never> with `status: "rejected"` and its `reason`.
 * @example
 * ```ts
 * await expect(rejectedPromise(new Error("Request failed"))).rejects.toThrow("Request failed");
 * ```
 */
export function rejectedPromise(
  reason: unknown = undefined,
): Promise<never> & { status: "rejected"; reason: unknown } {
  const promise = Promise.reject<never>(reason);

  promise.catch((error) => error);

  return Object.assign(promise, { status: "rejected" as const, reason });
}
