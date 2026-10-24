import type { DocumentationContract } from "@vickbk/ci-tools/docs";

/** Contract for the Vitest feature guide and its supported entrypoints. */
export const vitestReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests/vitest",
  sections: [
    { id: "overview", heading: "Overview", required: true },
    {
      id: "public-entrypoint",
      heading: "Public entrypoint",
      required: true,
      requirements: { publicEntryPoints: true },
    },
    {
      id: "installation-setup",
      heading: "Installation and setup",
      required: true,
      requirements: { codeBlock: true, packageManagerCommands: true },
    },
    {
      id: "dom-assertions-interactions",
      heading: "DOM assertions and interactions",
      required: true,
      requirements: { codeBlock: true },
    },
    {
      id: "toggle-events",
      heading: "Toggle events",
      required: true,
      requirements: { codeBlock: true },
    },
    {
      id: "promise-helpers",
      heading: "Promise helpers",
      required: true,
      requirements: { codeBlock: true },
    },
    {
      id: "console-control",
      heading: "Console control",
      required: true,
      requirements: { codeBlock: true },
    },
    { id: "api-reference", heading: "API reference", required: true },
  ],
  preferredSectionOrder: [
    "overview",
    "public-entrypoint",
    "installation-setup",
    "dom-assertions-interactions",
    "toggle-events",
    "react-server-components",
    "promise-helpers",
    "console-control",
    "api-reference",
  ],
  requiredSectionIds: [
    "overview",
    "public-entrypoint",
    "installation-setup",
    "dom-assertions-interactions",
    "toggle-events",
    "promise-helpers",
    "console-control",
    "api-reference",
  ],
  recommendedSectionIds: [],
};

const moduleSections = [
  { id: "overview", heading: "Overview", required: true },
  { id: "public-api", heading: "Public API", required: true },
  {
    id: "usage",
    heading: "Usage",
    required: true,
    requirements: { codeBlock: true },
  },
  { id: "dependencies", heading: "Dependencies", required: true },
];

/** Contract for the DOM module guide. */
export const vitestDomReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests/vitest",
  sections: moduleSections,
  preferredSectionOrder: ["overview", "public-api", "usage", "dependencies"],
  requiredSectionIds: ["overview", "public-api", "usage", "dependencies"],
  recommendedSectionIds: [],
};

/** Contract for the promise helpers guide. */
export const vitestPromisesReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests/vitest",
  sections: moduleSections,
  preferredSectionOrder: ["overview", "public-api", "usage", "dependencies"],
  requiredSectionIds: ["overview", "public-api", "usage", "dependencies"],
  recommendedSectionIds: [],
};

/** Contract for the opt-in toggle-event module guide. */
export const vitestToggleEventReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests/vitest",
  sections: moduleSections,
  preferredSectionOrder: ["overview", "public-api", "usage", "dependencies"],
  requiredSectionIds: ["overview", "public-api", "usage", "dependencies"],
  recommendedSectionIds: [],
};
