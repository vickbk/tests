import type { DocumentationContract } from "@vickbk/ci-tools/docs";

/** Documentation contract for the @vickbk/tests package README. */
export const rootReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests",
  sections: [
    { id: "identity", heading: "@vickbk/tests", required: true },
    { id: "overview", heading: "Overview", required: true },
    {
      id: "installation",
      heading: "Installation",
      required: true,
      requirements: { packageManagerCommands: true },
    },
    {
      id: "public-entrypoints",
      heading: "Public entrypoints",
      required: true,
      requirements: { codeBlock: true, publicEntryPoints: true },
    },
    {
      id: "shared-helpers",
      heading: "Shared text-pattern helpers",
      required: true,
      requirements: { codeBlock: true },
    },
    {
      id: "vitest-setup",
      heading: "Vitest setup",
      required: true,
      requirements: { codeBlock: true, packageManagerCommands: true },
    },
    {
      id: "vitest-utilities",
      heading: "Vitest utilities",
      required: true,
      requirements: { codeBlock: true },
    },
    {
      id: "playwright-utilities",
      heading: "Playwright utilities",
      required: true,
      requirements: { codeBlock: true },
    },
    { id: "license", heading: "License", required: true },
  ],
  preferredSectionOrder: [
    "identity",
    "overview",
    "installation",
    "public-entrypoints",
    "shared-helpers",
    "vitest-setup",
    "vitest-utilities",
    "playwright-utilities",
    "license",
  ],
  requiredSectionIds: [
    "identity",
    "overview",
    "installation",
    "public-entrypoints",
    "shared-helpers",
    "vitest-setup",
    "vitest-utilities",
    "playwright-utilities",
    "license",
  ],
  recommendedSectionIds: [],
};
