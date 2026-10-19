# @vickbk/tests

Reusable testing utilities for TypeScript projects: framework-agnostic shared
helpers, a collection of Vitest utilities, and a Playwright DSL. Import only the
entrypoint that matches the testing tools used by your project.

## Overview

The package is organized around stable public entrypoints:

- Shared text-pattern helpers and types are available from the package root.
- Vitest utilities provide DOM assertions and interactions, console controls,
  promise helpers, and opt-in toggle-event support.
- React Server Component helpers have a separate Vitest entrypoint.
- Playwright utilities provide assertions, locators, interactions, and a
  reusable runner.

## Installation

Install the package as a development dependency:

```sh
pnpm add -D @vickbk/tests
```

The integrations are optional peer dependencies. Add the peers needed by your
project; for Vitest DOM tests, for example:

```sh
pnpm add -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

For Playwright tests, install `@playwright/test`. For React Server Component
helpers, install `react` and `react-dom` (and `@types/react` when using
TypeScript).

## Public entrypoints

| Import path                  | Purpose                                                          |
| ---------------------------- | ---------------------------------------------------------------- |
| `@vickbk/tests`              | Shared text-pattern utilities and types                          |
| `@vickbk/tests/regex`        | Explicit subpath for the shared text-pattern utilities and types |
| `@vickbk/tests/vitest`       | Vitest console, DOM, promise, and toggle-event helpers           |
| `@vickbk/tests/vitest/react` | React Server Component tree resolution                           |
| `@vickbk/tests/playwright`   | Playwright assertions, locators, interactions, and runner        |

## Shared text-pattern helpers

The shared API provides `patternToRegex` and the `LABEL_LOCATOR`,
`TEXT_MATCHER`, `TEXT_PATTERN`, and `TEXT_WITH_NTH` types.

```ts
import { patternToRegex, type TEXT_MATCHER } from "@vickbk/tests";

const matcher: TEXT_MATCHER = ["Welcome", 0];
const caseInsensitive = patternToRegex("Welcome");
```

## Vitest setup

The package supports Node.js 20 and newer. Its peer dependency ranges are:

| Peer dependency               | Supported range        | Used for                                              |
| ----------------------------- | ---------------------- | ----------------------------------------------------- |
| `vitest`                      | `^5.0.4`               | Vitest helpers                                        |
| `@testing-library/react`      | `^16.0.0`              | DOM queries, interactions, and toggle events          |
| `@testing-library/user-event` | `^14.6.8`              | User-like DOM interactions                            |
| `@testing-library/jest-dom`   | `^7.0.1`               | DOM matcher setup used by the DOM assertion helpers   |
| `@playwright/test`            | `^1.64.0`              | Playwright helpers and direct `test`/`expect` exports |
| `react`, `react-dom`          | `^18.0.0` or `^19.0.0` | React integrations and RSC helpers                    |
| `@types/react`                | `^18.0.0` or `^19.0.0` | React TypeScript types                                |

All peers are optional at the package level. Install the peers for the
entrypoints your project imports.

Configure Vitest to use a DOM environment for DOM tests, and load the
jest-dom Vitest matchers from a setup file:

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

Import DOM helpers and console controls from `@vickbk/tests/vitest`.
`shouldSee` returns the matched elements, while `shouldHaveTestId` returns the
elements located by test ID.

```tsx
import { render } from "@testing-library/react";
import { shouldHaveTestId, shouldSee } from "@vickbk/tests/vitest";

render(
  <main>
    <h1>Welcome</h1>
    <button data-testid="save-button">Save</button>
  </main>,
);

const [heading] = shouldSee("Welcome");
const [saveButton] = shouldHaveTestId("save-button");
```

To suppress console output during a test, pair `shutConsole` with
`resetConsole`:

```ts
import { afterEach, beforeEach } from "vitest";
import { resetConsole, shutConsole } from "@vickbk/tests/vitest";

beforeEach(shutConsole);
afterEach(resetConsole);
```

Toggle-event support is opt-in. Call `installToggleEvent` in a setup file (or
in an individual test) before dispatching `fireEvent.toggle`:

```ts
import { fireEvent } from "@testing-library/react";
import { installToggleEvent } from "@vickbk/tests/vitest";

installToggleEvent({ oldState: "closed", newState: "open" });
fireEvent.toggle(document.body);
```

The Vitest entrypoint also exports `shouldNotSee`, `isChecked`,
`isNotChecked`, `shouldHaveAttributes`, `shouldNotHaveTestId`, `userClicks`,
`userTypes`, `userTypesMultiple`, `togglePopover`, `resolvedPromise`, and
`rejectedPromise`. The React entrypoint exposes `resolveRscTree`:

```tsx
import { resolveRscTree } from "@vickbk/tests/vitest/react";

const resolved = await resolveRscTree(<ServerPage />);
```

## Playwright utilities

Playwright helpers are imported from `@vickbk/tests/playwright`. The entrypoint
also directly re-exports `test` and `expect` from `@playwright/test`.

```ts
import {
  clickButton,
  expect,
  getButton,
  shouldSee,
  test,
} from "@vickbk/tests/playwright";

test("saves the page", async ({ page }) => {
  await page.goto("/");
  await shouldSee(page, "Welcome");
  await clickButton(page, "Save");
  await expect(getButton(page, "Save")).toBeVisible();
});
```

The public API also includes `shouldNotSee`, `isChecked`, `isNotChecked`,
`getLocatorByText`, `getLabel`, `getLink`, `fillLocatorWith`,
`setLocatorValue`, `setValueForLocators`, `clickLink`, `clickLabelInput`,
`clickMultipleLabelInputs`, `clickBodyCorner`, and `runSimilarTests`.

## License

MIT
