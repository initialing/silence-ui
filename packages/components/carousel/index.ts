import Carousel from "./src/carousel.vue";
import CarouselItem from "./src/carouselItem.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiCarousel = AddInstall(Carousel, (app: App) => {
    app.component("SiCarousel", Carousel);
});

export const SiCarouselItem = AddInstall(CarouselItem, (app: App) => {
    app.component("SiCarouselItem", CarouselItem);
});

export default SiCarousel;
