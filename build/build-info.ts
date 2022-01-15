import { resolve } from "path";
import { siPath } from "../path/path";

export type Module = "cjs" | "esm";

interface Info {
    module: "ESNext" | "commonjs";
    format: "esm" | "cjs";
    ext: "mjs" | "js";
    output: {
        name: string;
        path: string;
    };
    bundle: {
        path: string;
    };
}

export const buildConfig: Record<Module, Info> = {
    esm: {
        module: "ESNext",
        format: "esm",
        ext: "mjs",
        output: {
            name: "es",
            path: resolve(siPath, "es"),
        },
        bundle: {
            path: "silence-ui/es",
        },
    },
    cjs: {
        module: "commonjs",
        format: "cjs",
        ext: "js",
        output: {
            name: "cjs",
            path: resolve(siPath, "cjs"),
        },
        bundle: {
            path: "silence-ui/cjs",
        },
    },
};

export const buildConfigEntries = Object.entries(
    buildConfig
) as BuildConfigEntries;

export type BuildConfigEntries = [Module, Info][];
