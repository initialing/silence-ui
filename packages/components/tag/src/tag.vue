<template>
    <label class="si-tag" @mouseenter="mouseIn" @mouseleave="mouseOut"
        >{{ label
        }}<span
            :class="[
                'si-tag-close',
                { 'si-tag-close-hide': !hover },
                { 'si-tag-close-show': hover },
            ]"
            @click.prevent="deleteTag"
        ></span
    ></label>
</template>
<script lang="ts">
import { defineComponent, ref, inject } from "vue";
import type { Ref } from "vue";
import type { basicFunc } from "@silence-ui/utils/types/commonType";

export default defineComponent({
    name: "SiTag",
    props: {
        value: {
            require: true,
            type: [String, Number, Boolean],
            default: null,
        },
        label: {
            require: true,
            type: [String, Number],
            default: null,
        },
    },
    setup(props) {
        const hover: Ref<boolean> = ref(false);
        const deleteFreeSelectorTag: basicFunc = inject(
            "deleteFreeSelectorTag"
        ) as basicFunc;
        const mouseIn = () => {
            hover.value = true;
        };
        const mouseOut = () => {
            hover.value = false;
        };
        const deleteTag = () => {
            deleteFreeSelectorTag(props.value);
        };
        return {
            hover,
            mouseIn,
            mouseOut,
            deleteTag,
        };
    },
});
</script>
