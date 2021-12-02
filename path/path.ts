import { resolve } from "path"

export const rootPath = resolve(__dirname, "..")
export const distPath = resolve(rootPath, "dist")
export const siPath = resolve(distPath, "silence-ui")
export const pkgPath = resolve(rootPath, "packages")
export const pkgSiPath = resolve(pkgPath, "silence-ui")




export const siPkgJson = resolve(pkgSiPath, "package.json")