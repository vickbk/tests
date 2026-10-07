import type { Page } from "@playwright/test";

export type TestRunner = (page: Page) => void;
export type SimpleTest = [string, ...TestRunner[]];
