<template>
    <span
        class="si-radio"
        role="radio"
        tabindex="0"
        :aria-checked="modelValue === label"
        :value="modelValue"
        @click="handleInput"
    >
        <span></span>
        <input
            ref="radioInput"
            class="si-radio__input"
            type="radio"
            autocomplete="off"
            tabindex="-1"
            aria-hidden="true"
            :value="label"
        />
        <label><slot></slot></label>
    </span>
</template>
<script lang="ts">
import { defineComponent, ref, readonly, watch, toRefs } from "vue";
import type { Ref } from "vue";
import { generateId } from "@silence-ui/utils/common/generator";

export default defineComponent({
    name: "SiRadio",
    props: {
        modelValue: {
            require: false,
            type: [String, Boolean, Number],
            default: "",
        },
        label: {
            require: true,
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
        const id: Ref<number> = readonly(ref(generateId()));
        const radioInput = ref(null);
        const { modelValue } = toRefs(props);
        const handleInput = () => {
            emit("update:modelValue", props.label);
        };
        watch(modelValue, (newVal) => {
            (radioInput.value as unknown as HTMLInputElement).checked =
                newVal === props.label;
        });
        return {
            id,
            handleInput,
            radioInput,
        };
    },
});
</script>
