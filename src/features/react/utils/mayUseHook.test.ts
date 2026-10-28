import { describe, expect, it } from "vitest";
import { mayUseHooks } from "./mayUseHooks";

describe("mayUseHooks", () => {
  describe("direct hook calls", () => {
    it("detects useState", () => {
      function Component() {
        const useState = (_initial: number) => [0, () => undefined];
        useState(0);
      }

      expect(mayUseHooks(Component)).toBe(true);
    });

    it("detects useEffect", () => {
      function Component() {
        const useEffect = (_callback: () => void, _deps: unknown[]) => {};
        useEffect(() => {}, []);
      }

      expect(mayUseHooks(Component)).toBe(true);
    });

    it("detects custom hooks", () => {
      function Component() {
        const useCustomHook = () => undefined;
        useCustomHook();
      }

      expect(mayUseHooks(Component)).toBe(true);
    });

    it("detects the bare use hook", () => {
      function Component() {
        const use = (_value?: unknown) => undefined;
        use();
      }

      expect(mayUseHooks(Component)).toBe(true);
    });

    it("detects hook names containing digits", () => {
      function Component() {
        const use2FA = () => undefined;
        use2FA();
      }

      expect(mayUseHooks(Component)).toBe(true);
    });

    it("detects hook names containing underscores", () => {
      function Component() {
        const use_CUSTOM = () => undefined;
        use_CUSTOM();
      }

      expect(mayUseHooks(Component)).toBe(true);
    });
  });

  describe("transformed hook calls", () => {
    it("detects Vite-style imported hook calls", () => {
      function Component() {
        const __vite_ssr_import_0__ = {
          useActionState: (_action: unknown, _initial: unknown) => [],
        };
        const action = () => undefined;

        (0, __vite_ssr_import_0__.useActionState)(action, null);
      }

      expect(mayUseHooks(Component)).toBe(true);
    });

    it("detects transformed calls with whitespace before the closing parenthesis", () => {
      function Component() {
        const imported = { useState: (_initial: number) => [] };

        (0, imported.useState)(0);
      }

      expect(mayUseHooks(Component)).toBe(true);
    });

    it("detects direct calls with whitespace before the opening parenthesis", () => {
      function Component() {
        const useState = (_initial: number) => [];
        useState(0);
      }

      expect(mayUseHooks(Component)).toBe(true);
    });
  });

  describe("non-hook source", () => {
    it("returns false for a regular component", () => {
      function Component() {
        return "Hello";
      }

      expect(mayUseHooks(Component)).toBe(false);
    });

    it("returns false for an empty function", () => {
      function Component() {}

      expect(mayUseHooks(Component)).toBe(false);
    });

    it("returns false when a hook-like identifier is only declared", () => {
      function Component() {
        const useState = (_initial: number) => [];
        return useState;
      }

      expect(mayUseHooks(Component)).toBe(false);
    });

    it("returns false when a hook-like identifier is passed as a value", () => {
      function Component() {
        const useState = () => undefined;
        return { callback: useState };
      }

      expect(mayUseHooks(Component)).toBe(false);
    });

    it("does not match identifiers with a lowercase character after use", () => {
      function Component() {
        const useful = () => undefined;
        useful();
      }

      expect(mayUseHooks(Component)).toBe(false);
    });

    it("does not match identifiers that merely contain use", () => {
      function Component() {
        const abuseState = () => undefined;
        abuseState();
      }

      expect(mayUseHooks(Component)).toBe(false);
    });

    it("does not match a hook name without a call", () => {
      function Component() {
        const useState = "some string";
        return "useState" + useState;
      }

      expect(mayUseHooks(Component)).toBe(false);
    });
  });

  describe("comments", () => {
    it("ignores hook-like text in line comments", () => {
      function Component() {
        // useState(0)
        return "Hello";
      }

      expect(mayUseHooks(Component)).toBe(false);
    });

    it("ignores hook-like text in block comments", () => {
      function Component() {
        /*
         * useEffect(() => {}, [])
         */
        return "Hello";
      }

      expect(mayUseHooks(Component)).toBe(false);
    });

    it("detects a real hook call alongside comments", () => {
      function Component() {
        // This comment mentions useEffect().
        const useState = (_initial: number) => [];
        /* Another comment mentioning useMemo(). */
        useState(0);
      }

      expect(mayUseHooks(Component)).toBe(true);
    });

    it("handles a block comment between the hook name and its call", () => {
      function Component() {
        const useState = (_initial: number) => [];
        useState(/* comment */ 0);
      }

      expect(mayUseHooks(Component)).toBe(true);
    });

    it("handles a line comment between the hook name and its call", () => {
      function Component() {
        const useState = (_initial: number) => [];
        useState(
          // comment
          0,
        );
      }

      expect(mayUseHooks(Component)).toBe(true);
    });
  });

  describe("known heuristic limitations", () => {
    it("can match hook-like text inside a string literal", () => {
      function Component() {
        return "useState(0)";
      }

      // The current implementation does not parse JavaScript strings.
      expect(mayUseHooks(Component)).toBe(true);
    });

    it("can match a function declaration whose name resembles a hook", () => {
      function useCustomHook() {
        return "no hook calls";
      }

      // The regex scans the entire function source, including its name.
      expect(mayUseHooks(useCustomHook)).toBe(true);
    });
  });
});
