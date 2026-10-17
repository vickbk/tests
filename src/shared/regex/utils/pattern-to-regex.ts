import { TEXT_PATTERN } from "../types";
import { escapeRegExp } from "./escape-regex";

export function patternToRegex(
  target: TEXT_PATTERN,
  flags: string = "i",
): RegExp {
  return typeof target === "string"
    ? new RegExp(escapeRegExp(target), flags)
    : target;
}
