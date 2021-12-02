import { excludeFiles } from "./utils/tools"
import glob from "fast-glob"
import { pkgPath, pkgSiPath } from "../path/path"
import { rollup } from "rollup"
import { SilenceUiPack } from "./plugins/silence-ui-pack"
import css from "rollup-plugin-css-only"
import vue from "rollup-plugin-vue"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import esbuild from "rollup-plugin-esbuild"
import filesize from "rollup-plugin-filesize"
import chalk from "chalk"
import { genExternal, writeBundles } from "./utils/rollupUtil"
import { buildConfigEntries } from "./build-info"
import type { OutputOptions } from "rollup"


export const buildModules = async ()=>{
    const input = excludeFiles(
        await glob("**/*.{js,ts,vue}", {
            cwd: pkgPath,
            absolute: true,
            onlyFiles: true
        })
    )

    const bundle = await rollup({
        input: input,
        plugins: [
            await SilenceUiPack(),
            css(),
            vue({target: "browser"}),
            nodeResolve({
                extensions: [".mjs",".json",".js",".ts"]
            }),
            commonjs(),
            esbuild({sourceMap: true, target: "es2018"}),
            filesize({reporter: (opt, outputOptions, info) => {
                return `silence ui ${chalk.bgCyan(info.fileName)}: bundle size ${chalk.blue(
                    info.bundleSize
                )} -> minified ${chalk.green(info.minSize)}`
            }})
        ],
        external: await genExternal({full: false}),
        treeshake: false
    })

    await writeBundles(
        bundle,
        buildConfigEntries.map(([module, config]): OutputOptions=>{
            return {
                format: config.format,
                dir: config.output.path,
                exports: module === 'cjs' ? 'named' : undefined,
                preserveModules: true,
                preserveModulesRoot: pkgSiPath,
                sourcemap: true,
                entryFileNames: `[name].${config.ext}`,
            }
        })
    )
}