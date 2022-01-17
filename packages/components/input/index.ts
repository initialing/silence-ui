import Input from "./src/input.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiInput = AddInstall(Input, (app: App) => {
    app.component("SiInput", Input);
});

export default SiInput;
