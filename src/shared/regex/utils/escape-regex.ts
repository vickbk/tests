export function escapeRegExp(str: string): string {
  if (typeof RegExp.escape === "function") {
    return RegExp.escape(str);
  }
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
