declare module "vue" {
    export interface GlobalComponents {
        SiButton: typeof import("@silence-ui/components")["SiButton"];
        SiCarousel: typeof import("@silence-ui/components")["SiCarousel"];
        SiInput: typeof import("@silence-ui/components")["SiInput"];
    }
}

export {};
