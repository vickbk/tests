# Console Helpers

## Overview

The console helpers provide a simple way to suppress and restore selected console output during tests.

They target `console.log`, `console.warn`, and `console.error`, allowing tests to run without displaying these messages while preserving the ability to restore the original console methods afterward.

## Public API

### `shutConsole()`

Suppresses calls to `console.log`, `console.warn`, and `console.error` by replacing them with Vitest spies that have empty implementations.

Calling `shutConsole()` first restores any spies registered by a previous call, then installs new spies.

### `resetConsole()`

Restores the original implementations of the console methods suppressed by the most recent `shutConsole()` call.

Both functions are exported from `@vickbk/tests/vitest/console`.

## Usage

Import the helpers from the dedicated console entrypoint:

```ts
import { afterEach, beforeEach, describe, it } from "vitest";
import { resetConsole, shutConsole } from "@vickbk/tests/vitest/console";

describe("my feature", () => {
  beforeEach(shutConsole);
  afterEach(resetConsole);

  it("performs an operation without printing console messages", () => {
    console.log("This message is suppressed");
    console.warn("This warning is suppressed");
    console.error("This error is suppressed");

    // Assertions for the feature being tested.
  });
});
```

You can also suppress console output temporarily within an individual test:

```ts
import { resetConsole, shutConsole } from "@vickbk/tests/vitest/console";

shutConsole();

try {
  // Run code whose console output should be suppressed.
} finally {
  resetConsole();
}
```

Use `resetConsole()` to restore the original console methods after suppression. The `finally` block ensures restoration even if the operation throws.

## Dependencies

The console helpers use Vitest's `vi.spyOn` and `MockInstance` APIs.

Consumers must have `vitest` available in their project. This entrypoint does not require Testing Library packages for its console functionality.
