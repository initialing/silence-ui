<template>
    <div @click="clickCheckbox">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, provide } from "vue";

export default defineComponent({
    name: "SiCheckboxGroup",
    props: {
        modelValue: {
            require: false,
            type: Array,
            default: () => [],
        },
    },
    emits: {
        "update:modelValue": (val: Array<unknown>) => {
            return true || val;
        },
        click: (val: Array<unknown>) => {
            return true || val;
        },
    },
    setup(props, { emit }) {
        const { modelValue } = toRefs(props);
        const updateCheckboxModel = (val: Set<unknown>) => {
            emit("update:modelValue", Array.from(val));
        };
        provide("groupCheckboxModel", modelValue);
        provide("updateCheckboxModel", updateCheckboxModel);
        const clickCheckbox = () => {
            emit("click", [8, 2, 4]);
        };
        return { clickCheckbox };
    },
});
</script>
