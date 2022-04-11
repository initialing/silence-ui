<template>
    <div>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent, provide, toRefs } from "vue";

export default defineComponent({
    name: "SiRadioGroup",
    props: {
        modelValue: {
            require: false,
            type: [String, Boolean, Number],
            default: "",
        },
    },
    emits: {
        "update:modelValue": (val: string | boolean | number | null) => {
            return true || val;
        },
    },
    setup(props, { emit }) {
        const { modelValue } = toRefs(props);
        const updateRadioModel = (val) => {
            emit("update:modelValue", val);
        };
        provide("groupRadioModel", modelValue);
        provide("updateRadioModel", updateRadioModel);

        return {};
    },
});
</script>
