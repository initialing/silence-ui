<template>
    <button class="si-btn" :type="type" @click="btnClick">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    name: "SiButton",
    props: {
        type: {
            required: false,
            type: String as PropType<"button" | "submit" | "reset" | undefined>,
            default: "button",
            validator: (val: unknown) =>
                val === "button" ||
                val === "submit" ||
                val === "reset" ||
                val === undefined,
        },
    },
    emits: ["click"],
    setup(props, { emit }) {
        const btnClick = () => {
            emit("click");
        };
        return {
            btnClick,
        };
    },
});
</script>
