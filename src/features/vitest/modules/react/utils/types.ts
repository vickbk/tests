import type { ReactNode } from "react";

export type ResolveTree = (node: ReactNode) => Promise<ReactNode>;
