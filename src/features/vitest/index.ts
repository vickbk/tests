/* eslint-disable boundaries/dependencies */
export * from "./modules/console";
export * from "./modules/dom";

import {
  rejectedPromise as _rejectedPromise,
  resolvedPromise as _resolvedPromise,
} from "@/features/promises";

/**
 * @deprecated Import `rejectedPromise` from `@vickbk/tests/promises` instead.
 * This re-export is retained for backward compatibility.
 */
export const rejectedPromise = _rejectedPromise;

/**
 * @deprecated Import `resolvedPromise` from `@vickbk/tests/promises` instead.
 * This re-export is retained for backward compatibility.
 */
export const resolvedPromise = _resolvedPromise;
