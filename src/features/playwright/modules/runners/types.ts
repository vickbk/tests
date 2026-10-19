import type { Page } from "@playwright/test";

export type TestRunner = (page: Page) => void | Promise<void>;
export type SimpleTest = [string, ...TestRunner[]];
