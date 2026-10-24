# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-10-24

### Added

- Shared text-pattern utilities and types, including `patternToRegex`, `LABEL_LOCATOR`, `TEXT_MATCHER`, `TEXT_PATTERN`, and `TEXT_WITH_NTH`.
- Vitest utilities for DOM assertions, console controls, user interactions, promise helpers, and toggle-event handling.
- React Server Component tree resolution through `@vickbk/tests/react`.
- Playwright utilities for assertions, locators, interactions, and reusable test execution.
- Public package entrypoints for shared helpers, Vitest utilities, React utilities, and Playwright utilities.
- TypeScript declaration files for the published entrypoints.
- ESM and CommonJS builds for supported entrypoints, with the `@vickbk/tests/vitest` entrypoint published as ESM-only.
- Package documentation covering installation, peer dependencies, setup, and API usage.

### Changed

- Established separate public entrypoints so consumers can import utilities for the testing framework they use.
- Kept framework and testing-library dependencies external to the package build.
