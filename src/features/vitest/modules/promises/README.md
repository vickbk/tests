# Vitest promise helpers

## Overview

The promise module provides settled promises with Vitest-compatible status
metadata. Import helpers from `@vickbk/tests/vitest`.

## Public API

- `resolvedPromise(value)` returns a fulfilled promise with `status` and
  `value`.
- `rejectedPromise(reason)` returns a rejected promise with `status` and
  `reason`. It attaches a rejection handler to avoid unhandled-rejection noise
  before the promise is asserted.

## Usage

```ts
import { rejectedPromise, resolvedPromise } from "@vickbk/tests/vitest";

const success = resolvedPromise({ result: "ok" });
expect(success.status).toBe("fulfilled");
expect(success.value.result).toBe("ok");

const failure = rejectedPromise(new Error("network unavailable"));
expect(failure.status).toBe("rejected");
await expect(failure).rejects.toThrow("network unavailable");
```

## Dependencies

The promise helpers have no runtime framework imports. Vitest is commonly used
to assert the returned promise but is not imported by the helper implementation.
