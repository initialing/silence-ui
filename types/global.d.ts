declare module "vue" {
    export interface GlobalComponents {
        SiButton: typeof import("silence-ui")["SiButton"];
        SiCarousel: typeof import("silence-ui")["SiCarousel"];
        SiInput: typeof import("silence-ui")["SiInput"];
    }
}

export {};
