import type { Args } from "../utils/types";

interface LintArgs extends Args {
  lintStaged: boolean;
}

const describe = "Pulls source from git repository, adds all modified files, commits and push them to repository.";

async function handler({ intermodular }: Args): Promise<void> {
  // git pull && git add -A && git-cz && git push --follow-tags
  await intermodular.targetModule.command("git pull && git add -A && git-cz && git push --follow-tags");
}

export { describe, handler };
