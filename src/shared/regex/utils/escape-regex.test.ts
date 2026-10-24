import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { escapeRegExp } from "./escape-regex";

describe("escapeRegExp", () => {
  describe("Basic and Edge Cases", () => {
    it("should return an empty string when given an empty string", () => {
      expect(escapeRegExp("")).toBe("");
    });

    it("should return normal alphanumeric strings unchanged", () => {
      expect(escapeRegExp("helloWorld123")).toBe("\\x68elloWorld123");
    });

    it("should handle strings with standard spaces and whitespace", () => {
      expect(escapeRegExp("hello world \t\n")).toBe(
        "\\x68ello\\x20world\\x20\\t\\n",
      );
    });
  });

  describe("Individual Regex Special Characters", () => {
    const specialChars = [
      { char: ".", name: "dot" },
      { char: "*", name: "asterisk" },
      { char: "+", name: "plus" },
      { char: "?", name: "question mark" },
      { char: "^", name: "caret" },
      { char: "$", name: "dollar" },
      { char: "{", name: "opening brace" },
      { char: "}", name: "closing brace" },
      { char: "(", name: "opening parenthesis" },
      { char: ")", name: "closing parenthesis" },
      { char: "|", name: "pipe" },
      { char: "[", name: "opening bracket" },
      { char: "]", name: "closing bracket" },
      { char: "\\", name: "backslash" },
    ];

    specialChars.forEach(({ char, name }) => {
      it(`should correctly escape the ${name} (${JSON.stringify(char)})`, () => {
        const result = escapeRegExp(char);
        expect(result).toBe("\\" + char);
      });
    });
  });

  describe("Complex and Mixed Strings", () => {
    it("should escape multiple mixed special characters in a sentence", () => {
      const input = "Is this $10.00? [Yes/No] (or *maybe* 5+5=10)";
      const expected =
        "\\x49s\\x20this\\x20\\$10\\.00\\?\\x20\\[Yes\\/No\\]\\x20\\(or\\x20\\*maybe\\*\\x205\\+5\\x3d10\\)";
      expect(escapeRegExp(input)).toBe(expected);
    });

    it("should handle strings with consecutive special characters", () => {
      expect(escapeRegExp("a***b...c???")).toBe(
        "\\x61\\*\\*\\*b\\.\\.\\.c\\?\\?\\?",
      );
    });

    it("should escape backslashes correctly when repeated", () => {
      expect(escapeRegExp("C:\\path\\to\\file")).toBe(
        "\\x43\\x3a\\\\path\\\\to\\\\file",
      );
    });
  });

  describe("Unicode and Non-ASCII Characters", () => {
    it("should preserve accented and non-ASCII characters without alteration", () => {
      expect(escapeRegExp("Café naïve résumé")).toBe(
        "\\x43afé\\x20naïve\\x20résumé",
      );
    });

    it("should preserve emojis while escaping any adjacent special characters", () => {
      expect(escapeRegExp("🚀 [Launch Ready]!")).toBe(
        "🚀\\x20\\[Launch\\x20Ready\\]\\x21",
      );
    });
  });

  describe("Fallback Implementation (RegExp.escape undefined)", () => {
    let originalEscape: typeof RegExp.escape;

    beforeEach(() => {
      originalEscape = RegExp.escape;
      // Temporarily remove RegExp.escape to force the fallback block
      // @ts-expect-error: Testing fallback behavior
      delete RegExp.escape;
    });

    afterEach(() => {
      if (originalEscape) {
        RegExp.escape = originalEscape;
      }
    });

    it("should use the string replace fallback when RegExp.escape is not available", () => {
      expect(typeof RegExp.escape).toBe("undefined");
      const input = "test.value[0]+(optional)?";
      const expected = "test\\.value\\[0\\]\\+\\(optional\\)\\?";

      expect(escapeRegExp(input)).toBe(expected);
    });
  });

  describe("Functional Integration (RegExp Matching)", () => {
    it("should allow the escaped string to be safely used inside a RegExp constructor for literal matching", () => {
      const target = "Price is $50.00 (tax included)";
      const escaped = escapeRegExp(target);
      const regex = new RegExp(escaped);

      expect(regex.test(target)).toBe(true);
      expect(regex.test("Price is $99.00 (tax included)")).toBe(false);
    });

    it("should prevent regex injection when matching dynamic user input", () => {
      const maliciousInput = "(.*)";
      const escaped = escapeRegExp(maliciousInput);
      const regex = new RegExp(escaped);

      // Should match the literal string "(.*)" rather than acting as a wildcard group
      expect(regex.test("(.*)")).toBe(true);
      expect(regex.test("anything")).toBe(false);
    });
  });
});
