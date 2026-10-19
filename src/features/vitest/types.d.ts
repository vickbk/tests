export type {
  ToggleConfig,
  ToggleFireEventExtensions,
  ToggleState,
} from "./modules/dom/modules/toggle-event/utils/types";

import type { ToggleFireEventExtensions } from "./modules/dom/modules/toggle-event/utils/types";

declare module "@testing-library/react" {
  export const fireEvent: FireFunction & FireObject & ToggleFireEventExtensions;
}

import type { FireFunction, FireObject } from "@testing-library/react";
