import { createApp } from "vue";
import App from "./app.vue";
import { SiButton, SiInput } from "@silence-ui/components";

import "@silence-ui/style/src/index.scss";

const app = createApp(App);
app.use(SiButton);
app.use(SiInput);
app.mount("#sishow");
