import { series, parallel } from "gulp";
import { excute } from "./utils/excu";
import { TaskFunction } from "undertaker";
import { resolve, join } from "path";
import { rootPath, siPath, siPkgJson, distPath } from "../path/path";
import { buildConfig } from "./build-info";

export const copyFiles: TaskFunction = async (done) => {
    const global = resolve(rootPath, "types", "global.d.ts");
    return Promise.all([
        await excute(`cp ${siPkgJson} ${join(siPath, "package.json")}`),
        await excute(`cp ${rootPath}/readme.md ${siPath}`),
        await excute(`cp ${global} ${siPath}`),
    ]);
};

export const buildStyle: TaskFunction = async (done) => {
    return Promise.all([
        await excute("pnpm build:scss"),
        await excute(`mkdir -p ${siPath}/dist`),
        await excute(`cp ${siPath}/style/index.css ${siPath}/dist/index.css`),
    ]);
};

export const copyTypeDefine: TaskFunction = async (done) => {
    return Promise.all([
        await excute(
            `rsync -a ${distPath}/types/ ${buildConfig["cjs"].output.path}/`
        ),
        await excute(
            `rsync -a ${distPath}/types/ ${buildConfig["esm"].output.path}/`
        ),
    ]);
};

export const moduleBuild: TaskFunction = async (done) => {
    return Promise.all([
        excute("pnpm build buildModules"),
        excute("pnpm build buildFullBundle"),
        excute("pnpm build genTypesDefinitions"),
    ]);
};

export default series(
    parallel(moduleBuild, buildStyle),
    parallel(copyTypeDefine, copyFiles)
);

export * from "./modules";
export * from "./full";
export * from "./type-def";
