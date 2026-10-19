# Vitest DOM helpers

## Overview

The DOM module contains Testing Library-based queries, assertions, and
interactions exposed by `@vickbk/tests/vitest`.

## Public API

| Export | Purpose |
| --- | --- |
| `clickLabelInput` | Click an input by label or placeholder |
| `isChecked`, `isNotChecked` | Assert a labeled radio or checkbox state |
| `shouldHaveAttributes` | Check an element's expected attributes |
| `shouldHaveTestId`, `shouldNotHaveTestId` | Assert test-id presence or absence |
| `shouldSee`, `shouldNotSee` | Assert text presence or absence |
| `togglePopover` | Dispatch a toggle event to a selected element |
| `userClicks` | Click a button by name or matching text |
| `userTypes`, `userTypesMultiple` | Fill one or more labeled textboxes |
| `installToggleEvent` | Explicitly install `fireEvent.toggle` support |
| `ToggleConfig`, `ToggleState` | Toggle transition types |

## Element lookup helpers

`getTextBox` and `getCheckboxRadio` are internal building blocks used by
`userTypes`, `isChecked`, and `isNotChecked`. They are intentionally not
re-exported from the package entrypoint.

- `getTextBox(target, container?)` resolves a text input, textarea, or element
  with the textbox role by accessible name or placeholder. It rejects
  non-text placeholder matches instead of passing them to user-event.
- `getCheckboxRadio(target, container?)` resolves only an accessible checkbox
  or radio. It rejects other controls and missing matches.
- `userTypes` clears and types into the textbox returned by `getTextBox`.
- `isChecked` and `isNotChecked` apply the checked-state assertion to the
  control returned by `getCheckboxRadio`.

The lookup helpers honor an optional container, so the same accessible name
can be safely searched within a dialog or form.

## Usage

Use these helpers after rendering into a DOM environment and installing
`@testing-library/jest-dom/vitest` in Vitest setup.

```tsx
import { render } from "@testing-library/react";
import {
  isChecked,
  isNotChecked,
  shouldSee,
  userClicks,
  userTypes,
} from "@vickbk/tests/vitest";

render(
  <form>
    <label>
      Name <input />
    </label>
    <label>
      <input type="checkbox" /> Remember me
    </label>
    <label>
      <input type="checkbox" /> Send me updates
    </label>
    <button type="button">Continue</button>
  </form>,
);

shouldSee("Name");
await userTypes("Name", "Ada");
isChecked("Remember me");
isNotChecked("Send me updates");
await userClicks("Continue");
```

`userTypes` accepts labels, accessible textbox names, placeholders, or regular
expressions. It returns the resolved input or textarea and rejects if its
target is missing or resolves to a non-text control. `isChecked` and
`isNotChecked` accept checkbox and radio accessible names and throw if no
matching control exists or the control's state does not match the assertion.

Text helpers accept strings or regular expressions. `shouldSee` supports
`[matcher, occurrenceIndex]` tuples when a text occurs more than once. Helpers
that search the document also accept an optional container where documented by
their function signature.

Toggle-event installation is explicit: normal imports do not modify
Testing Library. See [toggle event support](./modules/toggle-event/README.md)
for installation and configuration details.

## Dependencies

This module requires `@testing-library/react`, `@testing-library/user-event`,
Vitest, and the `jest-dom` matchers for its assertions. Configure a DOM test
environment such as jsdom for tests that use these helpers.
