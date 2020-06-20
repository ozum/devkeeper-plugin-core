import type yargs from "yargs"; // eslint-disable-line import/no-extraneous-dependencies

const describe = "Creates TypeDoc documentation from TypeScript files.";

function builder(localYargs: yargs.Argv): yargs.Argv {
  return localYargs.commandDir("typedoc").recommendCommands().strict().showHelpOnFail(true).demandCommand(1, "");
}

export { describe, builder };
