import { join } from "path";
import readmeasy from "readmeasy";
import * as tmp from "tmp-promise";
import { handler as md } from "./typedoc/md";
import { Args } from "../utils/types";

const describe = "Creates README.md from README.njk template.";

/**
 * Creates TypeDoc HTML files from TypeScript source files.
 *
 * @param intermodular is the {@link https://intermodular.ozum.net/ intermodular} object to operate on.
 * @param out is output directory for generated HTML files.
 */
async function handler({ intermodular, devkeeper }: Args): Promise<void> {
  // if grep -q '{% include \"api.md\" %}' 'README.njk'; then npm run typedoc:single-md; mkdir -p temp && mv api.md temp/; fi && readmeasy --partial-dirs temp,/module-files/template-partials && rm -rf temp
  const { targetModule } = intermodular;

  try {
    const partialDirs = [intermodular.sourceModule.pathOf("module-files/template-partials")];
    const template = (await targetModule.read("README.njk")) as string;

    // If remplate contains API partial or template does not exist (default template contains API partial), create API markdown.
    if (template.includes('{% include "api.md" %}')) {
      const apiDir = (await tmp.dir({ unsafeCleanup: true })).path;
      partialDirs.push(apiDir);
      await md({ intermodular, devkeeper, out: join(apiDir, "api.md"), singleFile: true });
    }

    await readmeasy({ partialDirs });

    // If oclif installed execute `oclif-dev readme`;
    if (targetModule.hasAnyDependency(["@oclif/command"])) await targetModule.command("oclif-dev readme");

    intermodular.log("info", "README created: README.md");
  } catch (error) {
    intermodular.log("error", `Unknown error: ${error.message}`);
    throw error;
  }
}

export { describe, handler };
