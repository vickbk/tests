export type ToggleState = "open" | "closed";

export type ToggleConfig = Record<"oldState" | "newState", ToggleState>;

export type ToggleFireEventExtensions = {
  toggle: (
    element: Document | Element | Window | Node,
    initDict?: Partial<ToggleConfig>,
  ) => boolean;
};
