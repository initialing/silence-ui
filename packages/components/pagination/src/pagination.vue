<template>
    <div class="si-pagination">
        <div class="si-pagination-pre">
            <button
                :class="[
                    'si-pagination-pre__btn',
                    `${
                        modelValue === 1
                            ? 'si-pagination-pre__disable'
                            : 'si-pagination-pre__active'
                    }`,
                ]"
                :disabled="modelValue === 1"
                @click.prevent="toPrePage"
            >
                上一页
            </button>
        </div>
        <div class="si-pagination-pages">
            <button
                v-for="(page, index) in pageItems"
                :key="index"
                :class="[
                    'si-pagination-pagebtn',
                    { 'si-pagination-page': !page.isEllipsis },
                    { 'si-pagination-selected': page.val === modelValue },
                    `${
                        page.isEllipsis
                            ? 'si-pagination-page' + page.ellipsisType
                            : ''
                    }`,
                ]"
                @click.prevent="changePage(page)"
            >
                {{ page.isEllipsis ? "" : page.val }}
            </button>
        </div>
        <div class="si-pagination-next">
            <button
                :class="[
                    'si-pagination-next__btn',
                    `${
                        modelValue === ((total / pageSize) | 0) + 1
                            ? 'si-pagination-next__disable'
                            : 'si-pagination-next__active'
                    }`,
                ]"
                :disabled="modelValue === ((total / pageSize) | 0) + 1"
                @click.prevent="toNextPage"
            >
                下一页
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, onMounted, watch } from "vue";
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
            pageItems.value = [];
            let nowPage: number = modelValue.value;
            let max: number = ((total.value / pageSize.value) | 0) + 1;
            if (nowPage < 1) nowPage = 1;
            if (nowPage > max) nowPage = max;
            let i = 1;
            let page = 1;
            if (max <= 7) {
                while (i <= 7) {
                    pageItems.value.push({
                        isEllipsis: false,
                        val: page,
                        ellipsisType: null,
                    });
                    i++;
                    page++;
                }
            } else {
                let pre = false;
                let next = false;
                if (nowPage - 1 > 3) {
                    pre = true;
                }
                if (max - nowPage > 3) {
                    next = true;
                }
                while (i <= 7) {
                    if (i == 2 && pre) {
                        if (next) {
                            page = nowPage - 1;
                        } else {
                            page = nowPage - (4 - (max - nowPage));
                        }
                        pageItems.value.push({
                            isEllipsis: true,
                            val: page - 1,
                            ellipsisType: "pre",
                        });
                        i++;
                        continue;
                    }
                    if (i == 6 && next) {
                        pageItems.value.push({
                            isEllipsis: true,
                            val: page,
                            ellipsisType: "next",
                        });
                        page = max;
                        i++;
                        continue;
                    }
                    pageItems.value.push({
                        isEllipsis: false,
                        val: page,
                        ellipsisType: null,
                    });
                    i++;
                    page++;
                }
            }

            emit("update:modelValue", nowPage);
        };
        watch(modelValue, (newVal) => {
            setPageItems();
        });
        const emitChange = (val: number) => {
            emit("update:modelValue", val);
            emit("change", val);
        };
        const changePage = (page: pageItem) => {
            emitChange(page.val);
        };
        const toPrePage = () => {
            if (modelValue.value == 1) return;
            emitChange(modelValue.value - 1);
        };
        const toNextPage = () => {
            if (modelValue.value == ((total.value / pageSize.value) | 0) + 1)
                return;
            emitChange(modelValue.value + 1);
        };
        onMounted(() => {
            setPageItems();
        });
        return {
            pageItems,
            changePage,
            toPrePage,
            toNextPage,
        };
    },
});
</script>
