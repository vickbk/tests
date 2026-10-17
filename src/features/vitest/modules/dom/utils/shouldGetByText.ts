import type { TEXT_MATCHER } from "@/shared/regex";
import { patternToRegex } from "@/shared/regex";
import { screen } from "@testing-library/react";
import { expect } from "vitest";

export function shouldGetByText(...texts: TEXT_MATCHER[]) {
  return texts.map((text) => {
    if (Array.isArray(text)) {
      const [matcher, nth] = text;
      const element =
        screen.queryAllByText(patternToRegex(matcher))[nth] ?? null;
      return { expected: expect(element), element };
    }
    const element = screen.queryByText(patternToRegex(text));
    return { expected: expect(element), element };
  });
}
