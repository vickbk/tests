# React helpers

## Overview

The React module provides React Server Component (RSC) tree resolution through
the isolated `@vickbk/tests/react` entrypoint. Keeping React integration
separate means consumers of other entrypoints do not load this module unless
they import it.

## Public API

- `resolveRscTree(node)` recursively resolves server component elements and
  nested element/array props.

Client component boundaries are preserved. Asynchronous server component
results are awaited. Errors thrown while resolving a component reject the
returned promise rather than being replaced with an empty node.

## Usage

```tsx
import { resolveRscTree } from "@vickbk/tests/react";

async function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

const tree = await resolveRscTree(<Greeting name="Ada" />);
```

The returned React tree can then be passed to the rendering or assertion
workflow used by the consuming test.

## Dependencies

This entrypoint requires React and is intended for tests using a React DOM
environment. Component-detection and traversal functions are internal
implementation details and are not re-exported.
