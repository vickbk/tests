# Promise helpers

## Overview

The promises module provides settled promises with status metadata. Import the helpers from `@vickbk/tests/promises`.

## Public API

- `resolvedPromise(value)` returns a fulfilled promise with `status` and `value`.
- `rejectedPromise(reason)` returns a rejected promise with `status` and `reason`. It attaches a rejection handler to avoid unhandled-rejection noise before the promise is asserted.

## Usage

```ts
import { rejectedPromise, resolvedPromise } from "@vickbk/tests/promises";

const success = resolvedPromise({ result: "ok" });
expect(success.status).toBe("fulfilled");
expect(success.value.result).toBe("ok");

const failure = rejectedPromise(new Error("network unavailable"));
expect(failure.status).toBe("rejected");
await expect(failure).rejects.toThrow("network unavailable");
```

## Dependencies

The promise helpers have no runtime framework imports. You can use them independently of Vitest or another testing framework. The example above uses Vitest's `expect` only to demonstrate how to assert the returned promise.
