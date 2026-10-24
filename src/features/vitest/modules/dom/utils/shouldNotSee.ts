import { shouldGetByText } from "./shouldGetByText";

/**
 * Asserts that none of the supplied text matchers appear in the document.
 *
 * @param texts Text strings or regular expressions that must be absent.
 * @returns Nothing; throws an assertion error if any text is found.
 * @example
 * ```ts
 * shouldNotSee("Error", /failed/i);
 * ```
 */
export const shouldNotSee = (...texts: (string | RegExp)[]) => {
  shouldGetByText(...texts).forEach(({ expected }) =>
    expected.not.toBeInTheDocument(),
  );
};
