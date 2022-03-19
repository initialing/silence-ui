declare module "vue" {
    export interface GlobalComponents {
        SiButton: typeof import("silence-ui")["SiButton"];
        SiCarousel: typeof import("silence-ui")["SiCarousel"];
        SiCarouselItem: typeof import("silence-ui")["SiCarouselItem"];
        SiInput: typeof import("silence-ui")["SiInput"];
        SiRadio: typeof import("silence-ui")["SiRadio"];
        SiRadioGroup: typeof import("silence-ui")["SiRadioGroup"];
    }
}

export {};
