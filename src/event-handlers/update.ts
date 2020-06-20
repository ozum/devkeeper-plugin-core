import { Args } from "../utils/types";

const spdxLicenseList = require("spdx-license-list/full"); // eslint-disable-line @typescript-eslint/no-var-requires

export default async function handler({ intermodular }: Args): Promise<void> {
  const { targetModule } = intermodular;
  try {
    const license = targetModule.package.get("license");
    await Promise.all([
      intermodular.copy("module-files/.gitignore-for-target", ".gitignore", { overwrite: true }),
      targetModule.write("LICENSE", spdxLicenseList[license]?.licenseText, { overwrite: true, if: (content) => content !== undefined }),
    ]);
  } catch (error) {
    intermodular.log("error", `Unknown error: ${error.message}`);
    throw error;
  }
}
