import { userTypes } from "./userTypes";

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
