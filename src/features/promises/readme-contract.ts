import { DocumentationContract } from "@vickbk/ci-tools/docs";

/** Contract for the promise helpers guide. */
export const vitestPromisesReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests/promises",
  sections: [
    { id: "overview", heading: "Overview", required: true },
    { id: "public-api", heading: "Public API", required: true },
    {
      id: "usage",
      heading: "Usage",
      required: true,
      requirements: { codeBlock: true },
    },
    { id: "dependencies", heading: "Dependencies", required: true },
  ],
  preferredSectionOrder: ["overview", "public-api", "usage", "dependencies"],
  requiredSectionIds: ["overview", "public-api", "usage", "dependencies"],
  recommendedSectionIds: [],
};
