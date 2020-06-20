// import { join } from "path";
// import { dir as tmpDir } from "tmp-promise";
// import Html from "./html";

// const { pathExists, remove } = require("fs-extra");

// let dir: string;

// beforeAll(async () => {
//   dir = (await tmpDir()).path;
// });

// afterAll(async () => {
//   await remove(dir);
// });

// describe("html", () => {
//   it("should create HTML files.", async () => {
//     const targetDir = join(dir, "html");
//     await Html.run(["--out", targetDir]);
//     const dirExist = await pathExists(targetDir);
//     const indexExist = await pathExists(join(targetDir, "index.html"));
//     expect(await Promise.all([dirExist, indexExist])).toEqual([true, true]);
//   }, 15000);
// });
