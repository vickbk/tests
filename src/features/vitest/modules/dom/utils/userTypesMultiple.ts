import { userTypes } from "./userTypes";

/**
 * Replaces the values of multiple textboxes, located by their respective selectors.
 *
 * @param inputs Object mapping each textbox label/placeholder to the text to enter.
 * @param container Optional element that limits all textbox searches.
 * @returns A promise resolving to an object mapping each selector to its updated textbox.
 * @example
 * ```ts
 * const fields = await userTypesMultiple({ Email: "person@example.com", Name: "Pat" });
 * ```
 */
export async function userTypesMultiple(
  inputs: Record<string, string>,
  container?: HTMLElement,
) {
  const entries = Object.entries(inputs);
  const outputs: Record<keyof typeof inputs, HTMLElement> = {};

  for (const [selector, value] of entries) {
    outputs[selector] = await userTypes(selector, value, container);
  }

  return outputs;
}
