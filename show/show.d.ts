declare module "vue" {
    export interface GlobalComponents {
        SiButton: typeof import("@silence-ui/components")["SiButton"];
        SiCarousel: typeof import("@silence-ui/components")["SiCarousel"];
        SiCarouselItem: typeof import("@silence-ui/components")["SiCarouselItem"];
        SiInput: typeof import("@silence-ui/components")["SiInput"];
    }
}

export {};
