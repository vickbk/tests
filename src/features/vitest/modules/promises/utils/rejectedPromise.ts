/**
 * Creates a rejected promise augmented with Vitest's rejected-promise metadata.
 *
 * @param reason The rejection reason, preserved as an unknown value.
 * @returns A rejected Promise<never> with `status: "rejected"` and its `reason`.
 */
export function rejectedPromise(
  reason: unknown,
): Promise<never> & { status: "rejected"; reason: unknown } {
  const promise = Promise.reject<never>(reason);
  promise.catch(() => {});
  return Object.assign(promise, { status: "rejected" as const, reason });
}
