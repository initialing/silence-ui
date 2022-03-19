import { createApp } from "vue";
import App from "./app.vue";
import {
    SiButton,
    SiCarousel,
    SiCarouselItem,
    SiInput,
    SiRadio,
    SiRadioGroup,
} from "@silence-ui/components";

import "@silence-ui/style/src/index.scss";

const app = createApp(App);
app.use(SiButton);
app.use(SiCarousel);
app.use(SiCarouselItem);
app.use(SiInput);
app.use(SiRadio);
app.use(SiRadioGroup);
app.mount("#sishow");
