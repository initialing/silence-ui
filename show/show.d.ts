declare module "vue" {
    export interface GlobalComponents {
        SiButton: typeof import("@silence-ui/components")["SiButton"];
        SiInput: typeof import("@silence-ui/components")["SiInput"];
    }
}

export {};
