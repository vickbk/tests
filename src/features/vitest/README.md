# @vickbk/tests/vitest

## Overview

The Vitest feature provides reusable DOM testing helpers, console controls, asynchronous value helpers, and a package-provided toggle-event helper.

Its specialized subpaths allow you to import only the helper category you need:

- `@vickbk/tests/vitest/console` — console controls.
- `@vickbk/tests/vitest/dom` — DOM queries, assertions, interactions, and toggle-event support.

The main `@vickbk/tests/vitest` entrypoint re-exports the supported Vitest helpers for compatibility and convenience.

## Public API

### Public entrypoints

| Import                         | Purpose                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `@vickbk/tests/vitest`         | Aggregate Vitest API: console, DOM, toggle-event, and deprecated promise helpers |
| `@vickbk/tests/vitest/console` | Console controls                                                                 |
| `@vickbk/tests/vitest/dom`     | DOM queries, assertions, interactions, and toggle-event support                  |

The `@vickbk/tests/vitest`, `@vickbk/tests/vitest/console` and `@vickbk/tests/vitest/dom` entrypoints are ESM-only. Use `import` to consume them; CommonJS `require()` is not supported.

### Console controls

- `shutConsole`
- `resetConsole`

These functions are also available from `@vickbk/tests/vitest/console`.

### DOM queries and assertions

- `shouldSee`
- `shouldNotSee`
- `shouldHaveAttributes`
- `shouldHaveTestId`
- `shouldNotHaveTestId`
- `isChecked`
- `isNotChecked`

Text-entry and checkbox/radio lookups use internal `getTextBox` and `getCheckboxRadio` helpers. These implementation helpers are not exported publicly.

### DOM interactions

- `clickLabelInput`
- `userClicks`
- `userTypes`
- `userTypesMultiple`
- `togglePopover`

### Toggle events

- `fireEvent`
- `ToggleConfig`
- `ToggleState`

The package-owned `fireEvent` combines Testing Library event helpers with the package's `toggle` helper. It does not augment or modify Testing Library's original `fireEvent`.

### Promise helpers — deprecated on this entrypoint

- `resolvedPromise`
- `rejectedPromise`

These exports remain available from `@vickbk/tests/vitest` for backward compatibility, but they are deprecated on this entrypoint.

**New code should import promise helpers from `@vickbk/tests/promises` instead.** The dedicated promises entrypoint is intended to let consumers use these helpers without depending on Vitest or Testing Library.

## Installation and setup

Install Vitest and the integrations your tests use. DOM helpers rely on Testing Library and `@testing-library/jest-dom`.

```sh
pnpm add -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @vickbk/tests
```

If you only need console controls, import them from the dedicated console entrypoint:

```ts
import { resetConsole, shutConsole } from "@vickbk/tests/vitest/console";
```

This entrypoint does not require Testing Library packages for its console functionality. Vitest must still be available to the consuming project.

For tests that render components, configure Vitest to use a DOM environment and load the jest-dom matchers in a setup file:

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

Install only the dependencies required by the helper entrypoints you use. The installation command above is a convenient setup for projects using the full DOM testing API, not a requirement for console-only or promise-only usage.

## DOM assertions and interactions

DOM helpers can be imported from either the aggregate Vitest entrypoint or the dedicated DOM subpath. Prefer the specialized subpath when you only need DOM helpers.

Text arguments may be strings or regular expressions; string searches are converted to case-insensitive regular expressions. `shouldSee` also accepts `[text, occurrenceIndex]` tuples for duplicate matches.

```tsx
import { render, screen } from "@testing-library/react";
import {
  isChecked,
  shouldHaveAttributes,
  shouldSee,
  userClicks,
  userTypes,
} from "@vickbk/tests/vitest/dom";

render(
  <form>
    <label>
      Email <input placeholder="Email address" />
    </label>
    <label>
      <input type="checkbox" /> Subscribe
    </label>
    <button type="button">Save</button>
  </form>,
);

const [email] = shouldSee("Email address");
shouldHaveAttributes(email!, { placeholder: "Email address" });
await userTypes("Email address", "person@example.com");
await userClicks("Save");
isChecked("Subscribe");
expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
```

`shouldNotSee` and `shouldNotHaveTestId` assert absence. `shouldHaveTestId` returns the located elements. `isChecked` and `isNotChecked` accept an accessible label, optionally scoped to a container. `userTypesMultiple` accepts an object mapping labels or placeholders to values and returns the updated inputs. `userTypes` supports text inputs, textareas, accessible textbox-role elements, and placeholder lookup; it rejects non-text placeholder matches. Checkbox/radio assertions reject non-checkbox/radio controls rather than applying a checked-state assertion to them.

## Toggle events

The DOM subpath exports its own `fireEvent`, which combines the standard Testing Library event helpers with the package's `toggle` helper. Import and use it directly; no separate toggle-event installation is required.

```ts
import { fireEvent } from "@vickbk/tests/vitest/dom";

const button = document.querySelector("button")!;
const disclosure = document.querySelector("details")!;

fireEvent.click(button);
fireEvent.toggle(disclosure);
fireEvent.toggle(disclosure, { oldState: "open", newState: "closed" });
```

`fireEvent.toggle(element, config?)` defaults to `oldState: "closed"` and `newState: "open"`. Its optional configuration accepts either state independently; supplied values override the defaults for that call.

`togglePopover({ selector, container?, newState? })` is a convenience helper that dispatches a toggle event to the first matching element and returns that element, or `undefined` if no element matches.

## Promise helpers

Promise helpers are available from the dedicated `@vickbk/tests/promises` entrypoint.

```ts
import { rejectedPromise, resolvedPromise } from "@vickbk/tests/promises";

const ready = resolvedPromise({ id: "item-1" });
expect(ready.status).toBe("fulfilled");
expect(ready.value.id).toBe("item-1");

await expect(rejectedPromise(new Error("unavailable"))).rejects.toThrow(
  "unavailable",
);
```

`resolvedPromise(value)` and `rejectedPromise(reason)` produce settled promises with Vitest-style `status` and `value`/`reason` properties. They are useful when testing consumers that inspect promise state.

For backward compatibility, these helpers remain re-exported from `@vickbk/tests/vitest`, but those exports are deprecated. Migrate existing imports to `@vickbk/tests/promises`.

## Console control

Console helpers are available from the dedicated `@vickbk/tests/vitest/console` entrypoint. They suppress selected console output during tests and restore the original methods when reset.

```ts
import { afterEach, beforeEach } from "vitest";
import { resetConsole, shutConsole } from "@vickbk/tests/vitest/console";

beforeEach(shutConsole);
afterEach(resetConsole);
```

`shutConsole()` spies on `console.log`, `console.warn`, and `console.error`, replacing their implementations with empty functions. `resetConsole()` restores the original implementations tracked by the helpers.

These helpers are opt-in and do not suppress output on import.

## API reference

Detailed module guides:

- [Console helpers](./console/README.md)
- [DOM helpers](./modules/dom/README.md)
- [Promise helpers](../promises/README.md)
- [Toggle event support](./modules/dom/modules/toggle-event/README.md)

The package exports only the supported feature API from its public entrypoints. Implementation utilities, including internal DOM query helpers, are not public exports.
