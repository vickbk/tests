# @vickbk/tests/playwright

The Playwright entrypoint provides reusable assertions, locators, interactions,
and a runner for defining similar page tests.

## Overview

Import helpers from `@vickbk/tests/playwright`. Each utility is isolated in its
own module file, with domain barrels re-exported through the package entrypoint.

## Modules

| Module | Responsibility |
| --- | --- |
| `assertions` | Visibility and checked-state assertions |
| `locators` | Text, button, label, and link locator queries |
| `interactions` | Filling, clicking, and setting values |
| `runners` | Reusable groups of page tests |

## Usage example

```ts
import {
  clickButton,
  getButton,
  shouldSee,
} from "@vickbk/tests/playwright";

await shouldSee(page, "Welcome");
const saveButton = getButton(page, "Save");
await clickButton(page, "Save");
```

## Public API

The entrypoint exports all atomic utilities from the `assertions`, `locators`,
`interactions`, and `runners` modules. `SimpleTest` and `TestRunner` are also
available as types, along with `LocatorWithText`, `TEXT_MATCHER`,
`TEXT_WITH_NTH`, `TEXT_PATTERN`, and `LABEL_LOCATOR`. The `test` and `expect`
exports are direct re-exports from `@playwright/test`.
