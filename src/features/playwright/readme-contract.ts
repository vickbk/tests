import type { DocumentationContract } from "@vickbk/ci-tools/docs";

/** Documentation contract for the Playwright feature README. */
export const playwrightReadmeContract: DocumentationContract = {
  packageName: "@vickbk/ci-tools/playwright",
  sections: [
    { id: "overview", heading: "Overview", required: true },
    { id: "key-modules", heading: "Key modules", required: true },
    {
      id: "usage-example",
      heading: "Usage example",
      required: true,
      requirements: { codeBlock: true },
    },
    {
      id: "required-environment-variables",
      heading: "Required environment variables",
      required: true,
    },
  ],
  preferredSectionOrder: [
    "overview",
    "key-modules",
    "usage-example",
    "required-environment-variables",
  ],
  requiredSectionIds: [
    "overview",
    "key-modules",
    "usage-example",
    "required-environment-variables",
  ],
  recommendedSectionIds: [],
};
