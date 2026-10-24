import type { ReactNode } from "react";

/**
 * Recursive callback used to resolve nested React nodes.
 *
 * @example
 * ```ts
 * const resolveTree: ResolveTree = (node) => resolveRscTree(node);
 * ```
 */
export type ResolveTree = (node: ReactNode) => Promise<ReactNode>;
