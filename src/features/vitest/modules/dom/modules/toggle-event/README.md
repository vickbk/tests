# Toggle event support

## Overview

Toggle-event support adds a `fireEvent.toggle` helper for test environments
without a native `ToggleEvent`. It is opt-in; importing `@vickbk/tests/vitest`
or its DOM helpers does not mutate Testing Library or the global event
environment.

## Public API

- `installToggleEvent(config?)` installs the helper and returns Testing
  Library's augmented `fireEvent`.
- `ToggleConfig` describes `oldState` and `newState`, each either `"open"` or
  `"closed"`.

Underlying event construction and polyfill functions are module internals and
are not exported from the public package entrypoints.

## Usage

```ts
import { fireEvent } from "@testing-library/react";
import {
  installToggleEvent,
  type ToggleConfig,
} from "@vickbk/tests/vitest";

const defaults: ToggleConfig = { oldState: "closed", newState: "open" };
installToggleEvent(defaults);

fireEvent.toggle(document.body);
fireEvent.toggle(document.body, { newState: "closed" });
```

The installer defaults to a `"closed"` to `"open"` transition. Configuration
values supply defaults, and values passed to `fireEvent.toggle` override them.
Repeated installation is safe.

## Dependencies

The helper requires `@testing-library/react`. Configure a browser-like DOM
environment for code that dispatches events on document elements.
