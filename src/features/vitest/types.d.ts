export type {
  ToggleConfig,
  ToggleFireEventExtensions,
  ToggleState,
} from "./modules/dom";

declare module "@testing-library/react" {
  export const fireEvent: FireFunction & FireObject & ToggleFireEventExtensions;
}

import type { FireFunction, FireObject } from "@testing-library/react";
