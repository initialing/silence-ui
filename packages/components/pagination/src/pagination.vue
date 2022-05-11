<template>
    <div class="si-pagination">
        <div class="si-pagination-pre">
            <button :class="['si-pagination-pre__btn']">上一页</button>
        </div>
        <div class="si-pagination-pages">
            <button
                v-for="(page, index) in pageItems"
                :key="index"
                :class="[
                    'si-pagination-pagebtn',
                    { 'si-pagination-page': !page.isEllipsis },
                    { 'si-pagination-selected': page.val === modelValue },
                ]"
                @click="changePage(page)"
            >
                {{ page.isEllipsis ? "" : page.val }}
            </button>
        </div>
        <div class="si-pagination-next">
            <button :class="['si-pagination-next__btn']">下一页</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, onMounted } from "vue";
import type { Ref } from "vue";
import type { pageItem } from "@silence-ui/utils/types/commonType";

export default defineComponent({
    name: "SiPagination",
    props: {
        modelValue: {
            required: false,
            type: Number,
            default: 1,
        },
        total: {
            required: false,
            type: Number,
            default: 1,
        },
        pageSize: {
            required: false,
            type: Number,
            default: 1,
        },
    },
    emits: {
        "update:modelValue": (val: number) => {
            return true || val;
        },
        change: (val: number) => {
            return true || val;
        },
    },
    setup(props, { emit }) {
        const { modelValue, total, pageSize } = toRefs(props);
        const pageItems: Ref<Array<pageItem>> = ref([]);
        const setPageItems = () => {
            let nowPage = modelValue.value;
            let max = ((total.value / pageSize.value) | 0) + 1;
            if (nowPage < 1) nowPage = 1;
            if (nowPage > max) nowPage = max;
            let i = 1;
            if (max <= 7) {
                while (i <= max) {
                    pageItems.value.push({
                        isEllipsis: false,
                        val: i,
                        ellipsisType: null,
                    });
                    i++;
                }
            }

            emit("update:modelValue", nowPage);
        };
        const changePage = (page: pageItem) => {
            let changeToPage = 0;
            if (!page.isEllipsis) {
                changeToPage = page.val;
            }
            emit("update:modelValue", changeToPage);
            emit("change", changeToPage);
        };
        onMounted(() => {
            setPageItems();
        });
        return {
            pageItems,
            changePage,
        };
    },
});
</script>
