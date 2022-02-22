import Carousel from "./src/carousel.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiCarousel = AddInstall(Carousel, (app: App) => {
    app.component("SiCarousel", Carousel);
});

export default SiCarousel;
