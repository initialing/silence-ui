import type { Plugin } from "rollup";
import { getScriptPackages } from "../utils/tools";

export async function SilenceUiPack(): Promise<Plugin> {
    const pkgs = await getScriptPackages();

    return {
        name: "silence-ui-pack-plugin",
        resolveId(id, importer, options) {
            if (!id.startsWith("@silence-ui")) return;

            const sty = "@silence-ui/style";
            if (id.startsWith(sty)) {
                return {
                    id: id.replaceAll(sty, "silence-ui/style"),
                    external: "absolute",
                };
            }

            let uId = id;
            for (const pkg of pkgs) {
                if (id.startsWith(pkg.name)) {
                    uId = uId.replace(pkg.name, pkg.dir);
                }
            }
            return this.resolve(id, importer, { skipSelf: true, ...options });
        },
    };
}
