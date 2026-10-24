import type { ReactNode } from "react";
import * as React from "react";
import type { ResolveTree } from "./types";

/**
 * Resolves one array child and supplies a stable key when the result is an
 * element without one.
 *
 * @param child - The child value to resolve.
 * @param index - The child's position in its containing array.
 * @param resolveTree - The recursive tree resolver.
 * @returns The resolved child.
 * @example
 * ```ts
 * await resolveArrayChild(<Page />, 0, resolveRscTree);
 * ```
 */
export async function resolveArrayChild(
  child: ReactNode,
  index: number,
  resolveTree: ResolveTree,
): Promise<ReactNode> {
  const resolvedChild = await resolveTree(child);
  if (React.isValidElement(resolvedChild)) {
    const keyToUse =
      resolvedChild.key ??
      (child as { key?: string })?.key ??
      `rsc-key-${index}`;
    return React.cloneElement(resolvedChild, { key: keyToUse });
  }
  return resolvedChild;
}
