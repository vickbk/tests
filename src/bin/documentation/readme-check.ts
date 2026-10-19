import { rootReadmeContract } from "#/readme-contract";
import { playwrightReadmeContract } from "@/features/playwright/readme-contract";
import {
  vitestDomReadmeContract,
  vitestPromisesReadmeContract,
  vitestReadmeContract,
  vitestReactReadmeContract,
  vitestToggleEventReadmeContract,
} from "@/features/vitest/readme-contract";
import { runTask } from "@vickbk/ci-tools/core";
import { checkReadmeFiles, handleReadmeCliError } from "@vickbk/ci-tools/docs";
import { binReadmeContract } from "../readme-contract";

await runTask(
  "readme-check",
  async () =>
    await checkReadmeFiles({
      "./src/bin/README.md": binReadmeContract,
      "./README.md": rootReadmeContract,
      "./src/features/vitest/README.md": vitestReadmeContract,
      "./src/features/vitest/modules/dom/README.md": vitestDomReadmeContract,
      "./src/features/vitest/modules/promises/README.md":
        vitestPromisesReadmeContract,
      "./src/features/vitest/modules/react/README.md": vitestReactReadmeContract,
      "./src/features/vitest/modules/dom/modules/toggle-event/README.md":
        vitestToggleEventReadmeContract,
      "./src/features/playwright/README.md": playwrightReadmeContract,
    }),
  handleReadmeCliError,
);
