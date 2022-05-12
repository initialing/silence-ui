import Pagination from "./src/pagination.vue";
import { AddInstall } from "@silence-ui/utils/common/addInstall";
import type { App } from "vue";

export const SiPagination = AddInstall(Pagination, (app: App) => {
    app.component("SiPagination", Pagination);
});

export default SiPagination;
