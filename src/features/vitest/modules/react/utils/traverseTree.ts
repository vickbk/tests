import * as React from "react";
import type { ReactNode } from "react";
import { resolveArrayChild } from "./resolveArrayChild";
import { resolveElement } from "./resolveElement";
import type { ResolveTree } from "./types";

/**
 * Traverses arrays and React elements, delegating component resolution.
 *
 * @param node - The tree value to visit.
 * @param resolveTree - The recursive tree resolver.
 * @returns The traversed value with server components resolved.
 * @example
 * ```ts
 * await traverseTree(tree, resolveRscTree);
 * ```
 */
export async function traverseTree(
  node: ReactNode,
  resolveTree: ResolveTree,
): Promise<ReactNode> {
  if (!node || typeof node !== "object") return node;

  if (Array.isArray(node)) {
    return Promise.all(
      node.map((child, index) => resolveArrayChild(child, index, resolveTree)),
    );
  }

  if (React.isValidElement(node)) {
    return resolveElement(node, resolveTree);
  }

  return node;
}
