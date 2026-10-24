import type { ReactNode } from "react";
import { traverseTree } from "./traverseTree";

/**
 * Recursively resolves synchronous and asynchronous React Server Components.
 * Client component boundaries are preserved, and component errors are allowed
 * to reject the returned promise.
 *
 * @param node - The React node or tree to resolve.
 * @returns A promise for the resolved React tree.
 * @example
 * ```ts
 * const resolved = await resolveRscTree(<ServerPage />);
 * ```
 */
export async function resolveRscTree(node: ReactNode): Promise<ReactNode> {
  return traverseTree(node, resolveRscTree);
}
