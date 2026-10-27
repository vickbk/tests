import { MockInstance, vi } from "vitest";

const CONSOLES = ["log", "warn", "error"] as const;

let activeSpies: MockInstance[] = [];

/**
 * Suppresses console.log, console.warn, and console.error until resetConsole runs.
 *
 * @example
 * ```ts
 * beforeEach(shutConsole);
 * afterEach(resetConsole);
 * ```
 */
export function shutConsole() {
  resetConsole();

  activeSpies = CONSOLES.map((cons) =>
    vi.spyOn(console, cons).mockImplementation(() => {}),
  );
}

/**
 * Restores the console methods most recently suppressed by shutConsole.
 *
 * @example
 * ```ts
 * shutConsole();
 * // Run code whose console output should be ignored.
 * resetConsole();
 * ```
 */
export function resetConsole() {
  for (const spy of activeSpies) {
    spy.mockRestore(); // Restores native console behavior
  }
  activeSpies = [];
}
