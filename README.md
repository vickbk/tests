# @vickbk/tests

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@vickbk/tests.svg)](https://www.npmjs.com/package/@vickbk/tests)
[![Build Status](https://img.shields.io/github/actions/workflow/status/vickbk/tests/lint-test-docs.yml?branch=main)](https://github.com/vickbk/tests/actions)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/vickbk/tests)

Reusable testing utilities for TypeScript projects: framework-agnostic shared helpers, promise helpers, Vitest utilities, React Server Component helpers, and a Playwright DSL. Import only the entrypoint that matches the functionality and integrations your project needs.

## Overview

The package is organized around focused public entrypoints:

- **Shared utilities** provide text-pattern helpers and types.
- **Promise helpers** provide settled-promise utilities without requiring Vitest or Testing Library.
- **Vitest utilities** provide console controls, DOM assertions and interactions, and toggle-event support.
- **React utilities** provide React Server Component (RSC) tree resolution.
- **Playwright utilities** provide assertions, locators, interactions, and a reusable runner.

> The Vitest Aggregate entrypoint re-exports console, DOM, and promises (Deprecated) helpers. For dependency isolation, prefer the specialized entrypoint that matches your needs.

## Installation

Install the package as a development dependency:

```sh
pnpm add -D @vickbk/tests
```

Install the peer dependencies required by the integrations you use.

For Vitest DOM tests:

```sh
pnpm add -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

For console helpers, install Vitest.

For promise helpers, no dependency is required by the promises entrypoint.

For Playwright tests, install `@playwright/test`.
For React Server Component helpers, install `react` and `react-dom` (and `@types/react` when using TypeScript).

## Public entrypoints

| Import path                    | Purpose                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `@vickbk/tests`                | Shared text-pattern utilities and types                                          |
| `@vickbk/tests/promises`       | Framework-independent settled-promise helpers                                    |
| `@vickbk/tests/vitest`         | Aggregate Vitest API: console, DOM, toggle-event, and deprecated promise exports |
| `@vickbk/tests/vitest/console` | Console controls using Vitest spies                                              |
| `@vickbk/tests/vitest/dom`     | DOM queries, assertions, interactions, and toggle-event support                  |
| `@vickbk/tests/react`          | React Server Component tree resolution                                           |
| `@vickbk/tests/playwright`     | Playwright assertions, locators, interactions, and runner                        |

**Module format:** The `@vickbk/tests/vitest`, `@vickbk/tests/vitest/console` and `@vickbk/tests/vitest/dom` entrypoints are ESM-only. Use `import` to consume them; CommonJS `require()` is not supported. Other entrypoints support dual module format.

## Shared text-pattern helpers

The shared API provides `patternToRegex` and the `LABEL_LOCATOR`, `TEXT_MATCHER`, `TEXT_PATTERN`, and `TEXT_WITH_NTH` types.

```ts
import { patternToRegex, type TEXT_MATCHER } from "@vickbk/tests";

const matcher: TEXT_MATCHER = ["Welcome", 0];
const caseInsensitive = patternToRegex("Welcome");
```

## Promise helpers

The dedicated promises entrypoint provides `resolvedPromise` and `rejectedPromise`. These helpers produce settled promises with Vitest-style `status` and `value`/`reason` properties, useful when testing consumers that inspect promise state.

```ts
import { rejectedPromise, resolvedPromise } from "@vickbk/tests/promises";

const ready = resolvedPromise({ id: "item-1" });
expect(ready.status).toBe("fulfilled");
expect(ready.value.id).toBe("item-1");

await expect(rejectedPromise(new Error("unavailable"))).rejects.toThrow(
  "unavailable",
);
```

Prefer `@vickbk/tests/promises` for all new code. The same helpers remain exported from `@vickbk/tests/vitest` for backward compatibility, but those re-exports are deprecated. Migrate existing imports to the dedicated promises entrypoint.

## Vitest setup

The package supports Node.js 20 and newer. Its peer dependency ranges are:

| Peer dependency               | Supported range        | Used for                                              |
| ----------------------------- | ---------------------- | ----------------------------------------------------- |
| `vitest`                      | `^5.0.4`               | Vitest helpers, including console controls            |
| `@testing-library/react`      | `^16.0.0`              | DOM queries, interactions, and toggle events          |
| `@testing-library/user-event` | `^14.6.8`              | User-like DOM interactions                            |
| `@testing-library/jest-dom`   | `^7.0.1`               | DOM matcher setup used by assertion helpers           |
| `@playwright/test`            | `^1.64.0`              | Playwright helpers and direct `test`/`expect` exports |
| `react`, `react-dom`          | `^18.0.0` or `^19.0.0` | React integrations and RSC helpers                    |
| `@types/react`                | `^18.0.0` or `^19.0.0` | React TypeScript types                                |

All peers are optional at the package level. Install the peers required by the entrypoints your project imports.
In particular, the promises entrypoint does not require any Library, and the console entrypoint requires vitest only.

Configure Vitest to use a DOM environment for tests that render components, and load the jest-dom Vitest matchers from a setup file:

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
});
```

```ts
// tests/setup.ts
import "@testing-library/jest-dom/vitest";
```

## Vitest utilities

The aggregate entrypoint, `@vickbk/tests/vitest`, re-exports the Vitest helper categories. For smaller dependency footprints, import from `@vickbk/tests/vitest/console` or `@vickbk/tests/vitest/dom` instead.

### Console controls

The console entrypoint exports `shutConsole` and `resetConsole`. These helpers suppress `console.log`, `console.warn`, and `console.error` during tests, then restore the original implementations.

```ts
import { afterEach, beforeEach } from "vitest";
import { resetConsole, shutConsole } from "@vickbk/tests/vitest/console";

beforeEach(shutConsole);
afterEach(resetConsole);
```

Console output is not suppressed merely by importing the module. Call `shutConsole()` to activate the spies and `resetConsole()` to restore the methods.

### DOM assertions and interactions

Import DOM helpers from the dedicated DOM entrypoint:

```tsx
import { render } from "@testing-library/react";
import { shouldHaveTestId, shouldSee } from "@vickbk/tests/vitest/dom";

render(
  <main>
    <h1>Welcome</h1>
    <button data-testid="save-button">Save</button>
  </main>,
);

const [heading] = shouldSee("Welcome");
const [saveButton] = shouldHaveTestId("save-button");
```

`shouldSee` returns the matched elements, while `shouldHaveTestId` returns the elements located by test ID.

Other DOM helpers include `shouldNotSee`, `isChecked`, `isNotChecked`, `shouldHaveAttributes`, `shouldNotHaveTestId`, `userClicks`, `userTypes`, `userTypesMultiple`, and `togglePopover`.

### Toggle events

The DOM entrypoint provides its own `fireEvent`, combining standard Testing Library event helpers with the package's `toggle` helper. No separate toggle-event installation is needed.

```ts
import { fireEvent } from "@vickbk/tests/vitest/dom";

fireEvent.click(document.body);
fireEvent.toggle(document.body);
fireEvent.toggle(document.body, {
  oldState: "open",
  newState: "closed",
});
```

`fireEvent.toggle(element, config?)` defaults to `oldState: "closed"` and `newState: "open"`. Either state can be overridden independently. The package-owned `fireEvent` does not augment or modify Testing Library's original export.

### Aggregate entrypoint and compatibility

The `@vickbk/tests/vitest` entrypoint continues to export the console and DOM helpers, along with `resolvedPromise` and `rejectedPromise`.

The promise re-exports are deprecated. Import these helpers from `@vickbk/tests/promises` in new code and when migrating existing imports.

The aggregate entrypoint is convenient when a project uses all the Vitest helper categories. It is not intended to provide the same dependency isolation as the specialized entrypoints.

[For more details on the Vitest API](./src/features/vitest/README.md)

## React utilities

The React entrypoint exposes `resolveRscTree` for resolving React Server Component trees.

```tsx
import { resolveRscTree } from "@vickbk/tests/react";

const resolved = await resolveRscTree(<ServerPage />);
```

[For more on the React API](./src/features/react/README.md)

## Playwright utilities

Playwright helpers are imported from `@vickbk/tests/playwright`.

```ts
import { expect, test } from "@playwright/test";
import { clickButton, getButton, shouldSee } from "@vickbk/tests/playwright";

test("saves the page", async ({ page }) => {
  await page.goto("/");
  await shouldSee(page, "Welcome");
  await clickButton(page, "Save");
  await expect(getButton(page, "Save")).toBeVisible();
});
```

The public API also includes `shouldNotSee`, `isChecked`, `isNotChecked`, `getLocatorByText`, `getLabel`, `getLink`, `fillLocatorWith`, `setLocatorValue`, `setValueForLocators`, `clickLink`, `clickLabelInput`, `clickMultipleLabelInputs`, `clickBodyCorner`, and `runSimilarTests`.

[For more details on the Playwright API](./src/features/playwright/README.md)

## License

MIT
