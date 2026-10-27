import { moduleSections } from "@/shared/docs";
import { DocumentationContract } from "@vickbk/ci-tools/docs";

/** Contract for the promise helpers guide. */
export const vitestPromisesReadmeContract: DocumentationContract = {
  packageName: "@vickbk/tests/promises",
  sections: moduleSections,
  preferredSectionOrder: ["overview", "public-api", "usage", "dependencies"],
  requiredSectionIds: ["overview", "public-api", "usage", "dependencies"],
  recommendedSectionIds: [],
};
