import { rootReadmeContract } from "#/readme-contract";
import { playwrightReadmeContract } from "@/features/playwright/readme-contract";
import { vitestReadmeContract } from "@/features/vitest/readme-contract";
import { runTask } from "@vickbk/ci-tools/core";
import { checkReadmeFiles, handleReadmeCliError } from "@vickbk/ci-tools/docs";

await runTask(
  "readme-check",
  async () =>
    await checkReadmeFiles({
      "./README.md": rootReadmeContract,
      "./src/features/vitest/README.md": vitestReadmeContract,
      "./src/features/playwright/README.md": playwrightReadmeContract,
    }),
  handleReadmeCliError,
);
