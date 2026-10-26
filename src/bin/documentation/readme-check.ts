import { rootReadmeContract } from "#/readme-contract";
import { playwrightReadmeContract } from "@/features/playwright/readme-contract";
import { vitestPromisesReadmeContract } from "@/features/promises/readme-contract";
import { reactReadmeContract } from "@/features/react/readme-contract";
import { vitestConsoleReadmeContract } from "@/features/vitest/modules/console/readme-contract";
import {
  vitestDomReadmeContract,
  vitestReadmeContract,
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
      "./src/features/vitest/modules/console": vitestConsoleReadmeContract,
      "./src/features/vitest/modules/dom/README.md": vitestDomReadmeContract,
      "./src/features/vitest/modules/dom/modules/toggle-event/README.md":
        vitestToggleEventReadmeContract,
      "./src/features/promises/README.md": vitestPromisesReadmeContract,
      "./src/features/react/README.md": reactReadmeContract,
      "./src/features/playwright/README.md": playwrightReadmeContract,
    }),
  handleReadmeCliError,
);
