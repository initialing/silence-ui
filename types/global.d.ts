declare module "vue"{
    export interface GlobalComponents{
        SiButton: typeof import("silence-ui")["SiButton"]
    }
}

export {}