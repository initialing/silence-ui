import Button from "./src/button.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiButton = AddInstall(Button, (app: App) => {
    app.component("SiButton", Button);
});

export default SiButton;
