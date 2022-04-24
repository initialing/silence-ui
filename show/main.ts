import { createApp } from "vue";
import App from "./app.vue";
import {
    SiButton,
    SiCarousel,
    SiCarouselItem,
    SiCheckbox,
    SiCheckboxGroup,
    SiDatePicker,
    SiFreeSelector,
    SiInput,
    SiOption,
    SiRadio,
    SiRadioGroup,
    SiTag,
} from "@silence-ui/components";

import "@silence-ui/style/src/index.scss";

const app = createApp(App);
app.use(SiButton);
app.use(SiCarousel);
app.use(SiCarouselItem);
app.use(SiCheckbox);
app.use(SiCheckboxGroup);
app.use(SiDatePicker);
app.use(SiFreeSelector);
app.use(SiInput);
app.use(SiOption);
app.use(SiRadio);
app.use(SiRadioGroup);
app.use(SiTag);
app.mount("#sishow");
