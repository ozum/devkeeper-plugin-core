/* eslint-disable no-template-curly-in-string */
import concatMd from "concat-md";
import tmp from "tmp-promise";
import type { Args } from "../../utils/types";

interface MdArgs extends Args {
  out?: string;
  singleFile?: boolean;
}

const describe = "Creates TypeDoc markdown from TypeScript source files.";
const builder = {
  "single-file": { type: "boolean", describe: "Combines all output into single markdown file." },
  out: {
    type: "string",
    describe: 'output directory or file for generated markdown. Default "api-docs-md" for multi files or "api.md" for single file',
  },
};

/**
 * Creates multiple or single API markdown files from TypeScript source files using TypeDoc comments.
 *
 * @param intermodular is the {@link https://intermodular.ozum.net/ intermodular} object to operate on.
 * @param out is output directory or file for generated markdown. Default "api-docs-md" for multi files or "api.md" for single file.
 * @param singleFile is whether to combine all output into single markdown file.
 */
async function handler({ intermodular, out = "", singleFile = false }: MdArgs): Promise<void> {
  const { targetModule } = intermodular;
  const outDir = singleFile ? (await tmp.dir({ unsafeCleanup: true })).path : targetModule.pathOf(out || "api-docs-md");
  const outFile = out || "api.md";

  try {
    if (!singleFile) await targetModule.remove(targetModule.relativePathOf(outDir));
    // Typedoc HTML
    // rm -rf api-docs-md && typedoc --platform vuepress --plugin typedoc-plugin-example-tag,typedoc-plugin-markdown --excludeExternals --excludePrivate --excludeProtected --theme markdown --readme none --mode file --out api-docs-md && find api-docs-md -name \"index.md\" -exec sh -c 'mv \"$1\" \"${1%index.md}\"index2.md' - {} \\;
    await intermodular.command(
      `typedoc --platform vuepress --plugin typedoc-plugin-example-tag,typedoc-plugin-markdown --excludeExternals --excludePrivate --excludeProtected --excludeNotExported --theme markdown --readme none --mode file --out ${outDir}`
    );

    await intermodular.command(`find ${outDir} -name "index.md" -exec sh -c 'mv "$1" "\${1%index.md}"index2.md - {} ;`);

    if (singleFile) {
      const apiDoc = await concatMd(outDir, { dirNameAsTitle: true });
      await targetModule.write(outFile, apiDoc);
    }
    intermodular.log("info", `TypeDoc markdown created:  '${singleFile ? outFile : outDir}'`);
  } catch (error) {
    intermodular.log("error", `Unknown error:  ${error.message}`);
    throw error;
  }
}

export { describe, builder, handler };
