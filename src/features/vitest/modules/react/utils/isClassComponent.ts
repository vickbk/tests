/**
 * Determines whether a component type is a React class component.
 *
 * @param type - The value to inspect.
 * @returns `true` when the value is a React class component.
 * @example
 * ```ts
 * isClassComponent(MyClassComponent); // true
 * ```
 */
export function isClassComponent(type: unknown): boolean {
  return (
    typeof type === "function" &&
    Boolean(
      (type as { prototype?: { isReactComponent?: unknown } }).prototype
        ?.isReactComponent,
    )
  );
}
