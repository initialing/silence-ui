declare module "vue" {
    export interface GlobalComponents {
        SiButton: typeof import("@silence-ui/components")["SiButton"];
        SiCarousel: typeof import("@silence-ui/components")["SiCarousel"];
        SiCarouselItem: typeof import("@silence-ui/components")["SiCarouselItem"];
        SiCheckbox: typeof import("@silence-ui/components")["SiCheckbox"];
        SiCheckboxGroup: typeof import("@silence-ui/components")["SiCheckboxGroup"];
        SiDatePicker: typeof import("@silence-ui/components")["SiDatePicker"];
        SiFreeSelector: typeof import("@silence-ui/components")["SiFreeSelector"];
        SiInput: typeof import("@silence-ui/components")["SiInput"];
        SiOption: typeof import("@silence-ui/components")["SiOption"];
        SiPagination: typeof import("@silence-ui/components")["SiPagination"];
        SiRadio: typeof import("@silence-ui/components")["SiRadio"];
        SiRadioGroup: typeof import("@silence-ui/components")["SiRadioGroup"];
        SiTag: typeof import("@silence-ui/components")["SiTag"];
    }
}

export {};
