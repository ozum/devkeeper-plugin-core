// import { join } from "path";
// import { dir as tmpDir } from "tmp-promise";
// import Md from "./md";

// const { pathExists, remove } = require("fs-extra");

// let dir: string;

// beforeAll(async () => {
//   dir = (await tmpDir()).path;
// });

// afterAll(async () => {
//   await remove(dir);
// });

// describe("md", () => {
//   it("should create multiple MD files.", async () => {
//     const targetPath = join(dir, "md");
//     await Md.run(["--out", targetPath]);
//     const dirExist = await pathExists(targetPath);
//     const fileExist = await pathExists(join(targetPath, "classes/md.md"));
//     const result = await Promise.all([dirExist, fileExist]);
//     expect(result).toEqual([true, true]);
//   }, 10000);

//   it("should create single MD file.", async () => {
//     const targetPath = join(dir, "api.md");
//     await Md.run(["--out", targetPath, "--singleFile"]);
//     const fileExist = await pathExists(targetPath);
//     expect(fileExist).toBe(true);
//   }, 10000);
// });
