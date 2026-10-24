/**
 * Creates a fulfilled promise augmented with Vitest's fulfilled-promise metadata.
 *
 * @param value The value with which the promise is fulfilled.
 * @returns A fulfilled Promise<T> with `status: "fulfilled"` and its `value`.
 * @example
 * ```ts
 * const payload = await resolvedPromise({ id: 1 });
 * expect(payload).toEqual({ id: 1 });
 * ```
 */
export function resolvedPromise<T>(
  value: T,
): Promise<T> & { status: "fulfilled"; value: T } {
  const promise = Promise.resolve(value);
  return Object.assign(promise, { status: "fulfilled" as const, value });
}
