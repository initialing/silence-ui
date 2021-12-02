import { createApp } from "vue"
import App from "./app.vue"
import { SiButton } from "@silence-ui/components";

import "@silence-ui/style/src/index.scss"




let app = createApp(App);
app.use(SiButton);
app.mount("#sishow");