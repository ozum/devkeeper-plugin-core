import type { Args } from "../../utils/types";

interface HtmlArgs extends Args {
  out?: string;
}

const describe = "Creates TypeDoc HTML files from TypeScript source files.";
const builder = {
  out: { type: "string", default: "api-docs-html", describe: "Output directory for generated HTML files." },
};

/**
 * Creates TypeDoc HTML files from TypeScript source files.
 *
 * @param intermodular is the {@link https://intermodular.ozum.net/ intermodular} object to operate on.
 * @param out is output directory for generated HTML files.
 */
async function handler({ intermodular, out = "api-docs-html" }: HtmlArgs): Promise<void> {
  // rm -rf api-docs-html && typedoc --plugin typedoc-plugin-example-tag --mode file --out api-docs-html
  const { targetModule } = intermodular;

  try {
    await targetModule.remove(out);
    await intermodular.command(`typedoc --plugin typedoc-plugin-example-tag --mode file --out ${targetModule.pathOf(out)}`);
    intermodular.log("info", `TyepDoc HTML created: '${out}'`);
  } catch (error) {
    intermodular.log("error", `Unknown error: ${error.message}`);
    throw error;
  }
}

export { describe, builder, handler };
