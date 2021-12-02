import findWorksapcePackages from "@pnpm/find-workspace-packages"
import { rootPath, pkgPath } from "../../path/path";
import type { ProjectManifest } from "@pnpm/types"
import type { Module } from "../build-info"
import { buildConfig } from '../build-info'

export const getAllPackages = () => findWorksapcePackages(rootPath)


export const excludeFiles = (files: string[])=>{
    let ex = ['node_modules', 'gulpfile', 'dist'];
    return files.filter(file => {
        return !ex.some((p) => file.includes(p))
    })
}

export const getScriptPackages = async ()=>{
    return (await getAllPackages())
        .map(pkg => ({name: pkg.manifest.name, dir: pkg.dir}))
        .filter(
            (pkg): pkg is {name: string; dir: string} => 
            !!pkg.dir &&
            !!pkg.name &&
            pkg.name.startsWith("@silence-ui") &&
            pkg.dir.startsWith(pkgPath) &&
            pkg.name !== `@silence-ui/style`
        )
}

export const getPkgManifest = (pkgPt: string) => {
    return require(pkgPt) as ProjectManifest
}

export const getPkgDependencies = (pkgPt: string): string[] => {
    const mani = getPkgManifest(pkgPt);
    const { dependencies } = mani;
    return Object.keys(dependencies ?? {});
}

export const pathRewriter = (module: Module) => {
    const config = buildConfig[module]
  
    return (id: string) => {
      id = id.replaceAll(`@silence-ui/style`, 'silence-ui/style')
      // TODO: handle icons
      id = id.replaceAll(`@silence-ui/`, `${config.bundle.path}/`)
      return id
    }
  }