import Option from "./src/option.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiOption = AddInstall(Option, (app: App) => {
    app.component("SiOption", Option);
});

export default SiOption;
