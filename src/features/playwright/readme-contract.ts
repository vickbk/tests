import type { DocumentationContract } from "@vickbk/ci-tools/docs";

/** Documentation contract for the Playwright feature README. */
export const playwrightReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests/playwright",
  sections: [
    { id: "overview", heading: "Overview", required: true },
    { id: "modules", heading: "Modules", required: true },
    {
      id: "usage-example",
      heading: "Usage example",
      required: true,
      requirements: { codeBlock: true },
    },
    {
      id: "public-api",
      heading: "Public API",
      required: true,
    },
  ],
  preferredSectionOrder: [
    "overview",
    "modules",
    "usage-example",
    "public-api",
  ],
  requiredSectionIds: [
    "overview",
    "modules",
    "usage-example",
    "public-api",
  ],
  recommendedSectionIds: [],
};
