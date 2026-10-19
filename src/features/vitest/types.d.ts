export type { ToggleConfig, ToggleState, ToggleFireEventExtensions } from "./modules/toggle-event/utils/types";

declare module "@testing-library/react" {
  export const fireEvent: FireFunction & FireObject & ToggleFireEventExtensions;
}

import type { FireFunction, FireObject } from "@testing-library/react";
