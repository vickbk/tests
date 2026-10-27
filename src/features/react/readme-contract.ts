import { moduleSections } from "@/shared/docs";
import { DocumentationContract } from "@vickbk/ci-tools/docs";

/** Contract for the isolated React module guide. */
export const reactReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests/vitest/react",
  sections: moduleSections,
  preferredSectionOrder: ["overview", "public-api", "usage", "dependencies"],
  requiredSectionIds: ["overview", "public-api", "usage", "dependencies"],
  recommendedSectionIds: [],
};
