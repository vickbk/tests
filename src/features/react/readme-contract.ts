import { DocumentationContract } from "@vickbk/ci-tools/docs";

/** Contract for the isolated React module guide. */
export const reactReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests/vitest/react",
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
