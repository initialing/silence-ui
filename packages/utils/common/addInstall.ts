import type { PluginInstall } from "../types/pluginInstall";
import type { App } from "vue";

export const AddInstall = <T>(
    comp: T,
    fn: (app: App, config?: unknown) => void
) => {
    (comp as PluginInstall<T>).install = fn;

    return comp as PluginInstall<T>;
};
