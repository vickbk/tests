import { describe, expect, it } from "vitest";
import { patternToRegex } from "./pattern-to-regex"; // Update path as needed

describe("patternToRegex", () => {
  describe("String Target Handling", () => {
    it("should convert a plain string into a RegExp with default case-insensitive ('i') flag", () => {
      const regex = patternToRegex("hello");

      expect(regex).toBeInstanceOf(RegExp);
      expect(regex.ignoreCase).toBe(true);
      expect(regex.test("HELLO")).toBe(true);
      expect(regex.test("hello")).toBe(true);
    });

    it("should accept and apply custom flags when target is a string", () => {
      const regex = patternToRegex("test", "g");

      expect(regex.global).toBe(true);
      expect(regex.ignoreCase).toBe(false);
    });

    it("should correctly escape special regex characters in string targets", () => {
      const pattern = "price.$100";
      const regex = patternToRegex(pattern);

      // Should match the literal characters, not treat '.' as any character or '$' as end of input
      expect(regex.test("price.$100")).toBe(true);
      expect(regex.test("priceX$100")).toBe(false);
    });

    it("should handle empty string input correctly", () => {
      const regex = patternToRegex("");

      expect(regex).toBeInstanceOf(RegExp);
      expect(regex.test("")).toBe(true);
      expect(regex.test("anything")).toBe(true); // Empty pattern matches empty string positions
    });
  });

  describe("RegExp Target Handling", () => {
    it("should return the exact same RegExp instance if target is already a RegExp", () => {
      const originalRegex = /abc/i;
      const result = patternToRegex(originalRegex);

      expect(result).toBe(originalRegex);
    });

    it("should preserve flags and behavior of a pre-existing RegExp instance, ignoring the flags parameter", () => {
      // Even if we pass 'g' as the second parameter, it should return the original RegExp unmodified
      const originalRegex = /xyz/i;
      const result = patternToRegex(originalRegex, "g");

      expect(result).toBe(originalRegex);
      expect(result.global).toBe(false);
      expect(result.ignoreCase).toBe(true);
    });
  });

  describe("Functional Integration & Edge Cases", () => {
    it("should handle complex regex-injected strings safely via escapeRegExp integration", () => {
      const maliciousPattern = "(.*)";
      const regex = patternToRegex(maliciousPattern);

      // Verifies it treats it as a literal string "(.*)" instead of a wildcard capture group
      expect(regex.test("(.*)")).toBe(true);
      expect(regex.test("some-random-text")).toBe(false);
    });

    it("should support multiple flags combined on string targets", () => {
      const regex = patternToRegex("hello", "gi");

      expect(regex.global).toBe(true);
      expect(regex.ignoreCase).toBe(true);
    });
  });
});
