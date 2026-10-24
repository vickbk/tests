/**
 * Determines whether a component should be kept behind a client boundary.
 * React client/module references and functions containing hook calls are not
 * invoked directly by the resolver.
 *
 * @param type - The React element type to inspect.
 * @returns `true` when the type represents a client boundary.
 * @example
 * ```ts
 * isClientComponent({ $$typeof: Symbol.for("react.client.reference") }); // true
 * ```
 */
export function isClientComponent(type: unknown): boolean {
  if (type === null || (typeof type !== "function" && typeof type !== "object")) {
    return false;
  }

  const reference = type as { $$typeof?: symbol; $$id?: unknown };
  if (
    reference.$$typeof === Symbol.for("react.client.reference") ||
    reference.$$typeof === Symbol.for("react.module.reference") ||
    typeof reference.$$id === "string"
  ) {
    return true;
  }

  return (
    typeof type === "function" &&
    /\buse[A-Z0-9_]\w*\s*\(/.test(Function.prototype.toString.call(type))
  );
}
