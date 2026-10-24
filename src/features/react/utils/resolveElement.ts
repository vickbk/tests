import * as React from "react";
import type { ReactNode } from "react";
import { executeServerComponent } from "./executeServerComponent";
import { isClientComponent } from "./isClientComponent";
import { resolveProps } from "./resolveProps";
import type { ResolveTree } from "./types";

/**
 * Resolves a server component element or recursively updates its element props.
 * Client component boundaries remain untouched and component errors propagate.
 *
 * @param node - The React element to resolve.
 * @param resolveTree - The recursive tree resolver.
 * @returns The resolved render result or the updated original element.
 * @example
 * ```ts
 * await resolveElement(<ServerPage />, resolveRscTree);
 * ```
 */
export async function resolveElement(
  node: React.ReactElement,
  resolveTree: ResolveTree,
): Promise<ReactNode> {
  const { type, props } = node;

  if (typeof type === "function" && !isClientComponent(type)) {
    const serverResult = await executeServerComponent(
      type as React.ComponentType<Record<string, unknown>>,
      (props ?? {}) as Record<string, unknown>,
    );
    return resolveTree(serverResult);
  }

  if (props && typeof props === "object") {
    const { newProps, hasChanged } = await resolveProps(
      props as Record<string, unknown>,
      resolveTree,
    );
    if (hasChanged) {
      return React.cloneElement(node, newProps);
    }
  }

  return node;
}
