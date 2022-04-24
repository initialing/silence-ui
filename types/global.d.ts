declare module "vue" {
    export interface GlobalComponents {
        SiButton: typeof import("silence-ui")["SiButton"];
        SiCarousel: typeof import("silence-ui")["SiCarousel"];
        SiCarouselItem: typeof import("silence-ui")["SiCarouselItem"];
        SiCheckbox: typeof import("silence-ui")["SiCheckbox"];
        SiCheckboxGroup: typeof import("silence-ui")["SiCheckboxGroup"];
        SiDatePicker: typeof import("silence-ui")["SiDatePicker"];
        SiFreeSelector: typeof import("silence-ui")["SiFreeSelector"];
        SiInput: typeof import("silence-ui")["SiInput"];
        SiOption: typeof import("silence-ui")["SiOption"];
        SiRadio: typeof import("silence-ui")["SiRadio"];
        SiRadioGroup: typeof import("silence-ui")["SiRadioGroup"];
        SiTag: typeof import("silence-ui")["SiTag"];
    }
}

export {};
