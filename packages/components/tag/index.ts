import Tag from "./src/tag.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiTag = AddInstall(Tag, (app: App) => {
    app.component("SiTag", Tag);
});

export default SiTag;
