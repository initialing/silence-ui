<template>
    <button
        :class="['si-btn', `si-btn-${insideTheme}`]"
        :type="type"
        :disabled="disabled"
        @click="HandleClick"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRef } from "vue";
import type { ComputedRef } from "vue";

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
        theme: {
            require: false,
            type: String as PropType<"" | "default" | "danger" | undefined>,
            default: "",
            validator: (val: unknown) =>
                val === "" ||
                val === "default" ||
                val === "danger" ||
                val === undefined,
        },
        disabled: {
            require: false,
            type: Boolean,
            deafult: false,
            validator: (val: unknown) => typeof val === "boolean",
        },
    },
    emits: {
        click: (evt: MouseEvent) => {
            return !!evt;
        },
    },
    setup(props, { emit }) {
        const theme = toRef(props, "theme");
        const insideTheme: ComputedRef<string> = computed((): string => {
            let temp: string;
            switch (theme.value) {
                case "danger": {
                    temp = "danger";
                    break;
                }
                default: {
                    temp = "default";
                    break;
                }
            }
            return temp;
        });

        const HandleClick = (evt: MouseEvent) => {
            emit("click", evt);
        };
        return {
            HandleClick,
            insideTheme,
        };
    },
});
</script>
