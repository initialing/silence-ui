declare module "vue" {
    export interface GlobalComponents {
        SiButton: typeof import("@silence-ui/components")["SiButton"];
        SiCarousel: typeof import("@silence-ui/components")["SiCarousel"];
        SiCarouselItem: typeof import("@silence-ui/components")["SiCarouselItem"];
        SiCheckbox: typeof import("@silence-ui/components")["SiCheckbox"];
        SiCheckboxGroup: typeof import("@silence-ui/components")["SiCheckboxGroup"];
        SiFreeSelector: typeof import("@silence-ui/components")["SiFreeSelector"];
        SiInput: typeof import("@silence-ui/components")["SiInput"];
        SiOption: typeof import("@silence-ui/components")["SiOption"];
        SiRadio: typeof import("@silence-ui/components")["SiRadio"];
        SiRadioGroup: typeof import("@silence-ui/components")["SiRadioGroup"];
        SiTag: typeof import("@silence-ui/components")["SiTag"];
    }
}

export {};
