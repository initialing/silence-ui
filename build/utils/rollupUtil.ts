import { getPkgDependencies } from "./tools"
import { siPkgJson } from "../../path/path"
import type { RollupBuild, OutputOptions } from "rollup"

export const genExternal = async (options: {full: Boolean}) =>{
    return (id: string) => {
        const pkgs: string[] = ["vue"];
        if(!options.full){
            pkgs.push("silence-ui/style");
            pkgs.push("@vue", ...getPkgDependencies(siPkgJson))
        }
        return [...new Set(pkgs)].some(
            (pkg) => id === pkg || id.startsWith(`${pkg}/`)
        )
    }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
    return Promise.all(options.map((option) => bundle.write(option)))
  }