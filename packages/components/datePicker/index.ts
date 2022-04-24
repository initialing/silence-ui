import DatePicker from "./src/datePicker.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiDatePicker = AddInstall(DatePicker, (app: App) => {
    app.component("SiDatePicker", DatePicker);
});

export default SiDatePicker;
