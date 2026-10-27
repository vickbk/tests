# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-10-27

### Added

- Add `@vickbk/tests/vitest/console` as a dedicated entrypoint for console controls.
- Add `@vickbk/tests/vitest/dom` as a dedicated entrypoint for DOM queries, assertions, interactions, and toggle-event support.
- Add `@vickbk/tests/promises` as a framework-independent entrypoint for `resolvedPromise` and `rejectedPromise`.

### Changed

- Organize Vitest helpers into specialized entrypoints so consumers can import only the helper categories they need.
- Update the root README and Vitest documentation to describe the public entrypoints, their intended use, and their dependency requirements.

### Deprecated

- Deprecate `resolvedPromise` and `rejectedPromise` when imported from `@vickbk/tests/vitest`. Use `@vickbk/tests/promises` instead.
- Retain the deprecated promise exports from the aggregate Vitest entrypoint for backward compatibility.

## [0.1.0] - 2026-10-24

### Added

- Shared text-pattern utilities and types, including `patternToRegex`, `LABEL_LOCATOR`, `TEXT_MATCHER`, `TEXT_PATTERN`, and `TEXT_WITH_NTH` through `@vickbk/tests`.
- Vitest utilities for DOM assertions, console controls, user interactions, promise helpers, and toggle-event handling through `@vickbk/tests/vitest`.
- React Server Component tree resolution through `@vickbk/tests/react`.
- Playwright utilities for assertions, locators, interactions, and reusable test execution through `@vickbk/tests/playwright`.
- Public package entrypoints for shared helpers, Vitest utilities, React utilities, and Playwright utilities.
- TypeScript declaration files for the published entrypoints.
- ESM and CommonJS builds for supported entrypoints, with the `@vickbk/tests/vitest` entrypoint published as ESM-only.
- Package documentation covering installation, peer dependencies, setup, and API usage.
