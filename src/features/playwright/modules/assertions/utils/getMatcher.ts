import { patternToRegex } from "@/shared/regex";
import { Page } from "@playwright/test";
import { expect } from "vitest";
import { TEXT_MATCHER } from "../types";

export function getMatcher(page: Page, ...textes: TEXT_MATCHER[]) {
  return textes.map((text) => {
    if (Array.isArray(text)) {
      const [matcher, nth] = text;
      return expect(page.getByText(patternToRegex(matcher)).nth(nth));
    }
    return expect(page.getByText(text));
  });
}
