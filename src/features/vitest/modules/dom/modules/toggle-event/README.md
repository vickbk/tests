# Toggle event support

## Overview

Toggle-event support adds a `fireEvent.toggle` helper for test environments
without a native `ToggleEvent`. The package provides its own `fireEvent` export
from `@vickbk/tests/vitest`, combining Testing Library's standard event helpers
with `toggle`. It does not augment or modify Testing Library's original export.

## Public API

- `fireEvent` provides Testing Library's standard event helpers and
  `fireEvent.toggle(element, config?)`.
- `ToggleConfig` describes `oldState` and `newState`; each may be `"open"` or
  `"closed"`. The `toggle` config accepts either property independently.

Underlying event construction and polyfill functions are module internals and
are not exported from the public package entrypoints.

## Usage

```ts
import { fireEvent } from "@vickbk/tests/vitest";

fireEvent.click(document.body);
fireEvent.toggle(document.body);
fireEvent.toggle(document.body, { oldState: "open", newState: "closed" });
```

`fireEvent.toggle` defaults to `oldState: "closed"` and `newState: "open"`.
Optional per-call state values override those defaults.

## Dependencies

The helper requires `@testing-library/react`. Configure a browser-like DOM
environment for code that dispatches events on document elements.
