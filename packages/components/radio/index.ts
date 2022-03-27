import Radio from "./src/radio.vue";
import RadioGroup from "./src/radioGroup.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiRadio = AddInstall(Radio, (app: App) => {
    app.component("SiRadio", Radio);
});

export const SiRadioGroup = AddInstall(RadioGroup, (app: App) => {
    app.component("SiRadioGroup", RadioGroup);
});

export default SiRadioGroup;
