<template>
    <label class="si-tag" @mouseenter="mouseIn" @mouseleave="mouseOut"
        >{{ label
        }}<span
            v-show="hover"
            class="si-tag-close"
            @click.prevent="deleteTag"
        ></span
    ></label>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Ref } from "vue";

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
        const mouseIn = () => {
            hover.value = true;
        };
        const mouseOut = () => {
            hover.value = false;
        };
        const deleteTag = () => {
            console.log("delete", props.value);
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
