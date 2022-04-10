import Checkbox from "./src/checkbox.vue";
import CheckboxGroup from "./src/checkboxGroup.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiCheckbox = AddInstall(Checkbox, (app: App) => {
    app.component("SiCheckbox", Checkbox);
});

export const SiCheckboxGroup = AddInstall(CheckboxGroup, (app: App) => {
    app.component("SiCheckboxGroup", CheckboxGroup);
});

export default SiCheckboxGroup;
