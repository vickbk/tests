/**
 * Determines whether a function's source appears to contain a React hook call.
 *
 * Recognizes calls whose names are `use` or begin with `use` followed by an
 * uppercase letter, digit, or underscore. It also supports transformed calls
 * where a closing parenthesis appears between the hook name and its opening
 * call parenthesis, such as `(0, imported.useState)(initialValue)`.
 *
 * Comments are removed before matching to reduce false positives from
 * hook-like text in comments.
 *
 * This is a heuristic, not a complete JavaScript parser. In particular,
 * comment-like sequences inside strings or template literals can confuse
 * comment removal, and hook calls can be missed or falsely detected when
 * source code is transformed or contains hook-like text in string literals.
 *
 * @param type - The function whose source should be inspected.
 * @returns `true` if the source matches a likely hook call; otherwise `false`.
 */
export function mayUseHooks(type: (...args: never[]) => unknown): boolean {
  const source = Function.prototype.toString.call(type);

  const withoutComments = source.replace(/\/\*[\s\S]*?\*\/|\/\/[^\r\n]*/g, "");

  return /\buse(?:[A-Z0-9_]\w*)?\s*\)?\s*\(/.test(withoutComments);
}
