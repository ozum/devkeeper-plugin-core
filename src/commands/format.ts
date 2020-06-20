import type yargs from "yargs";
import type { Args } from "../utils/types";

interface FormatArgs extends Args {
  lintStaged: boolean;
}

const describe = "Formats source code.";

const builder = (localYargs: typeof yargs): typeof yargs => {
  localYargs.options({ "lint-staged": { type: "boolean", describe: "Optimizes command to be used with lint-staged." } }).strict(false);
  return localYargs;
};

async function handler({ intermodular, devkeeper, lintStaged = false, ...extraArgs }: FormatArgs) {
  // prettier --ignore-path .gitignore --write './**/*.+(json|less|css|md|gql|graphql|html|yaml)'
  const args = lintStaged
    ? ["--ignore-path", ".gitignore", "--write"]
    : ["--ignore-path", ".gitignore", "--write", "./**/*.+(json|less|css|md|gql|graphql|html|yaml)"];

  await intermodular.targetModule.execute("prettier", [...args, ...devkeeper.cleanArgs(extraArgs)]);
}

export { describe, builder, handler };
