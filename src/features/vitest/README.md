# @vickbk/tests/vitest

## Overview

The Vitest feature provides reusable DOM testing helpers, asynchronous value
helpers, console spies, and a package-provided toggle-event helper. React Server Component (RSC) tree resolution is isolated in `@vickbk/tests/vitest/react` so the primary Vitest entrypoint does not load React.

## Public entrypoints

| Import                       | Purpose                                         |
| ---------------------------- | ----------------------------------------------- |
| `@vickbk/tests/vitest`       | Console, DOM, promise, and toggle-event helpers |
| `@vickbk/tests/vitest/react` | React Server Component tree resolution          |

The Vitest entrypoint exports:

- Console control: `shutConsole`, `resetConsole`.
- DOM queries and assertions: `shouldSee`, `shouldNotSee`,
  `shouldHaveAttributes`, `shouldHaveTestId`, `shouldNotHaveTestId`,
  `isChecked`, `isNotChecked`. Text-entry and checkbox/radio lookups are
  performed by internal `getTextBox` and `getCheckboxRadio` helpers; these
  implementation helpers are not exported publicly.
- DOM interactions: `clickLabelInput`, `userClicks`, `userTypes`,
  `userTypesMultiple`, `togglePopover`.
- Toggle events: package-owned `fireEvent`, `ToggleConfig`, `ToggleState`.
- Promise helpers: `resolvedPromise`, `rejectedPromise`.

The React entrypoint exports `resolveRscTree`.

## Installation and setup

Install Vitest and the integrations your tests use. DOM helpers rely on
Testing Library and `@testing-library/jest-dom`; the RSC entrypoint additionally
requires React.

```sh
pnpm add -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @vickbk/tests
```

Configure Vitest to use a DOM environment for tests that render components, and
load the jest-dom matchers in a setup file:

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

## DOM assertions and interactions

DOM helpers are imported directly from the Vitest subpath. Text arguments may
be strings or regular expressions; string searches are converted to
case-insensitive regular expressions. `shouldSee` also accepts
`[text, occurrenceIndex]` tuples for duplicate matches.

```tsx
import { render, screen } from "@testing-library/react";
import {
  isChecked,
  shouldHaveAttributes,
  shouldSee,
  userClicks,
  userTypes,
} from "@vickbk/tests/vitest";

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

`shouldNotSee` and `shouldNotHaveTestId` assert absence. `shouldHaveTestId`
returns the located elements. `isChecked` and `isNotChecked` accept an
accessible label, optionally scoped to a container. `userTypesMultiple` accepts
an object mapping labels or placeholders to values and returns the updated
inputs. `userTypes` supports text inputs, textareas, accessible textbox-role
elements, and placeholder lookup; it rejects non-text placeholder matches.
Checkbox/radio assertions reject non-checkbox/radio controls rather than
applying a checked-state assertion to them.

## Toggle events

The Vitest entrypoint exports its own `fireEvent`, which combines the standard
Testing Library event helpers with the package's `toggle` helper. Import and
use it directly; no separate toggle-event installation is required. This
package-owned export does not augment or modify Testing Library's original
`fireEvent`.

```ts
import { fireEvent } from "@vickbk/tests/vitest";

const button = document.querySelector("button")!;
const disclosure = document.querySelector("details")!;

fireEvent.click(button);
fireEvent.toggle(disclosure);
fireEvent.toggle(disclosure, { oldState: "open", newState: "closed" });
```

`fireEvent.toggle(element, config?)` defaults to `oldState: "closed"` and
`newState: "open"`. Its optional configuration accepts either state
independently; supplied values override the defaults for that call.

`togglePopover({ selector, container?, newState? })` is a convenience helper
that dispatches a toggle event to the first matching element and returns that
element (or `undefined` if no element matches).

## React Server Components

RSC tree resolution has its own entrypoint. It resolves nested synchronous and
asynchronous server components while preserving client boundaries. Component
errors reject the returned promise.

```tsx
import { resolveRscTree } from "@vickbk/tests/vitest/react";

const resolvedTree = await resolveRscTree(<ServerPage />);
```

## Promise helpers

`resolvedPromise(value)` and `rejectedPromise(reason)` produce settled promises
with Vitest-style `status` and `value`/`reason` properties. They are useful when
testing consumers that inspect promise state.

```ts
import { rejectedPromise, resolvedPromise } from "@vickbk/tests/vitest";

const ready = resolvedPromise({ id: "item-1" });
expect(ready.status).toBe("fulfilled");
expect(ready.value.id).toBe("item-1");

await expect(rejectedPromise(new Error("unavailable"))).rejects.toThrow(
  "unavailable",
);
```

## Console control

`shutConsole()` temporarily spies on `console.log`, `console.warn`, and
`console.error`; `resetConsole()` restores their original implementations.
These helpers are opt-in and do not suppress output on import.

```ts
import { afterEach, beforeEach } from "vitest";
import { resetConsole, shutConsole } from "@vickbk/tests/vitest";

beforeEach(shutConsole);
afterEach(resetConsole);
```

## API reference

Detailed module guides:

- [DOM helpers](./modules/dom/README.md)
- [Promise helpers](./modules/promises/README.md)
- [React RSC helpers](./modules/react/README.md)
- [Toggle event support](./modules/dom/modules/toggle-event/README.md)

The package exports only the supported feature API from these entrypoints.
Implementation utilities such as internal DOM queries and RSC traversal
functions are not public exports.
