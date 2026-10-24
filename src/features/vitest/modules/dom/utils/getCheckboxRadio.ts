import type { TEXT_PATTERN } from "@/shared/regex";
import { patternToRegex } from "@/shared/regex";
import { getSearchArea } from "./getSearchArea";

/**
 * Finds a checkbox or radio control by its accessible name.
 *
 * @param target Accessible name to match, as text or a regular expression.
 * @param container Optional element that limits the search.
 * @returns The matching checkbox or radio input.
 * @throws If neither a checkbox nor a radio control matches the target.
 * @example
 * ```ts
 * const consent = getCheckboxRadio("Accept terms");
 * expect(consent).toBeChecked();
 * ```
 */
export function getCheckboxRadio(
  target: TEXT_PATTERN,
  container?: HTMLElement,
) {
  const regex = patternToRegex(target);
  const searchArea = getSearchArea(container);
  const element =
    searchArea.queryByRole("checkbox", { name: regex }) ||
    searchArea.queryByRole("radio", { name: regex });

  if (element) return element;

  throw new Error(
    `Unable to find a checkbox or radio control named "${String(target)}".`,
  );
}
