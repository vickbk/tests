import * as React from "react";
import type { ResolveTree } from "./types";

/**
 * Resolves React elements and arrays nested in a component's props.
 *
 * @param props - The component props to inspect.
 * @param resolveTree - The recursive tree resolver.
 * @returns Updated props and whether any prop value changed.
 * @example
 * ```ts
 * const result = await resolveProps({ children: <Page /> }, resolveRscTree);
 * ```
 */
export async function resolveProps(
  props: Record<string, unknown>,
  resolveTree: ResolveTree,
): Promise<{ newProps: Record<string, unknown>; hasChanged: boolean }> {
  const newProps: Record<string, unknown> = { ...props };
  let hasChanged = false;

  for (const key of Object.keys(newProps)) {
    const value = newProps[key];
    if (React.isValidElement(value) || Array.isArray(value)) {
      const resolved = await resolveTree(value as React.ReactNode);
      if (resolved !== value) {
        newProps[key] = resolved;
        hasChanged = true;
      }
    }
  }

  return { newProps, hasChanged };
}
