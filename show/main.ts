import { createApp } from "vue";
import App from "./app.vue";
import {
    SiButton,
    SiCarousel,
    SiCarouselItem,
    SiInput,
} from "@silence-ui/components";

import "@silence-ui/style/src/index.scss";

const app = createApp(App);
app.use(SiButton);
app.use(SiCarousel);
app.use(SiCarouselItem);
app.use(SiInput);
app.mount("#sishow");
