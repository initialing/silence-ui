import Button from "./src/button.vue"
import { App } from "vue"

export const SiButton = {
    install: (app: App, config: Object)=>{
        app.component("SiButton", Button);
    }
}

export default SiButton