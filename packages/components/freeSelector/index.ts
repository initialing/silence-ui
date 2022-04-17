import FreeSelector from "./src/freeSelector.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiFreeSelector = AddInstall(FreeSelector, (app: App) => {
    app.component("SiFreeSelector", FreeSelector);
});

export default SiFreeSelector;
