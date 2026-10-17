import type * as React from "react";
import type { ReactNode } from "react";
import { isClassComponent } from "./isClassComponent";

/**
 * Executes a server component and awaits an asynchronous result when present.
 * Component errors intentionally propagate to the caller.
 *
 * @param type - The server component to execute.
 * @param props - Props passed to the component.
 * @returns The component's resolved render result.
 * @example
 * ```ts
 * await executeServerComponent(Page, { title: "Hello" });
 * ```
 */
export async function executeServerComponent(
  type: React.ComponentType<Record<string, unknown>>,
  props: Record<string, unknown>,
): Promise<ReactNode> {
  if (isClassComponent(type)) {
    const ClassComponent = type as React.ComponentClass<
      Record<string, unknown>
    >;
    return new ClassComponent(props).render();
  }

  const FunctionComponent = type as React.FunctionComponent<
    Record<string, unknown>
  >;
  return await FunctionComponent(props);
}
