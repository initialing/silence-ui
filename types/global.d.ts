declare module "vue" {
    export interface GlobalComponents {
        SiButton: typeof import("silence-ui")["SiButton"];
        SiInput: typeof import("silence-ui")["SiInput"];
    }
}

export {};
