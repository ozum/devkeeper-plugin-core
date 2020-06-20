import type yargs from "yargs";
import type { Args } from "../utils/types";

interface LintArgs extends Args {
  lintStaged: boolean;
}

const describe = "Lints and fixes source code.";

const builder = (localYargs: typeof yargs): typeof yargs => {
  localYargs.options({ "lint-staged": { type: "boolean", describe: "Optimizes command to be used with lint-staged." } }).strict(false);
  return localYargs;
};

async function handler({ intermodular, devkeeper, lintStaged, ...extraArgs }: LintArgs): Promise<void> {
  // eslint --ignore-path .gitignore --cache --fix --max-warnings 0 --ext js,jsx,ts,tsx,vue src
  const args = lintStaged
    ? ["--ignore-path", ".gitignore", "--cache", "--fix", "--max-warnings", "0"]
    : ["--ignore-path", ".gitignore", "--cache", "--fix", "--max-warnings", "0", "--ext", "js,jsx,ts,tsx,vue", "src"];

  await intermodular.targetModule.execute("eslint", [...args, ...devkeeper.cleanArgs(extraArgs)]);
}

export { describe, builder, handler };
