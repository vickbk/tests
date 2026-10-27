import { DocumentationContract } from "@vickbk/ci-tools";

export const moduleSections: DocumentationContract["sections"] = [
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
