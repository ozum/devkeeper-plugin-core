import type yargs from "yargs";
import type { Args } from "../utils/types";

interface LintArgs extends Args {
  lintStaged: boolean;
  [extraArg: string]: any;
}

const describe = "Tests code. Additional flags are passed to Jest.";

const builder = (localYargs: typeof yargs): typeof yargs => {
  localYargs.options({ "lint-staged": { type: "boolean", describe: "Optimizes command to be used with lint-staged." } }).strict(false);
  return localYargs;
};

async function handler({ intermodular, lintStaged, devkeeper, ...extraArgs }: LintArgs): Promise<void> {
  // jest --bail --coverage --findRelatedTests --config=jest.config.js
  const args = lintStaged ? ["--bail", "--coverage", "--findRelatedTests"] : ["--coverage"];
  await intermodular.targetModule.execute("jest", [args, ...devkeeper.cleanArgs(extraArgs)], { env: { NODE_ENV: "test" } });
}

export { describe, builder, handler };
