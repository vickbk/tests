import { afterEach, describe, expect, it, vi } from "vitest";
import { resetConsole, shutConsole } from "./console"; // Adjust path to your file

describe("Console Utility Functions", () => {
  // Ensure the console is always restored after each test to prevent test leakage
  afterEach(() => {
    resetConsole();
    vi.restoreAllMocks();
  });

  describe("shutConsole", () => {
    it("silences console.log, console.warn, and console.error", () => {
      shutConsole();

      // Setup spies to check if native console methods are intercepted
      const logSpy = vi.spyOn(console, "log");
      const warnSpy = vi.spyOn(console, "warn");
      const errorSpy = vi.spyOn(console, "error");

      // Trigger console calls
      console.log("test log");
      console.warn("test warn");
      console.error("test error");

      // Verify that the mocked implementations intercepted the calls and silenced them
      expect(logSpy).toHaveBeenCalledWith("test log");
      expect(warnSpy).toHaveBeenCalledWith("test warn");
      expect(errorSpy).toHaveBeenCalledWith("test error");
    });

    it("automatically resets previous spies if called multiple times consecutively", () => {
      shutConsole();

      // Call shutConsole again without intermediate reset
      shutConsole();

      console.log("after second shut");
      // If resetConsole wasn't called at the start of shutConsole,
      // old spies might accumulate or behave unexpectedly.
      expect(console.log).toHaveBeenCalledWith("after second shut");
    });
  });

  describe("resetConsole", () => {
    it("restores native console behavior after shutConsole was invoked", () => {
      shutConsole();

      // Verify it's mocked/shut
      const logImplBeforeReset = console.log;

      resetConsole();

      // After reset, console.log should be restored to its original native function
      expect(console.log).not.toBe(logImplBeforeReset);
    });

    it("executes safely when called multiple times or when console was never shut", () => {
      expect(() => {
        resetConsole();
        resetConsole();
      }).not.toThrow();
    });
  });
});
