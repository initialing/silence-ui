<template>
    <label
        :class="['si-checkbox', { 'si-checkbox-checked': value }]"
        @click.prevent="handleInput"
    >
        <span
            :class="[
                'si-checkbox__inner',
                { 'si-checkbox__inner-checked': value },
            ]"
        >
            <span
                :class="[
                    'si-checkbox__inner-head',
                    { 'si-checkbox__inner-head-checked': value },
                ]"
            ></span>
            <input
                ref="checkboxInput"
                class="si-checkbox__input"
                type="checkbox"
                aria-hidden="false"
            />
        </span>
        <span class="si-checkbox-content"><slot></slot></span>
    </label>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from "vue";

export default defineComponent({
    name: "SiCheckbox",
    props: {
        modelValue: {
            require: false,
            type: Boolean,
            default: false,
        },
        label: {
            require: true,
            type: [String, Boolean, Number],
            default: "",
        },
    },
    emits: {
        "update:modelValue": (val: boolean | null) => {
            return true || val;
        },
    },
    setup(props, { emit }) {
        const value = ref();
        const checkboxInput = ref(null);
        const { modelValue } = toRefs(props);
        watch(modelValue, (newVal) => {
            (checkboxInput.value as unknown as HTMLInputElement).checked =
                newVal;
            value.value = newVal;
        });
        const handleInput = () => {
            emit("update:modelValue", !value.value);
        };
        return {
            value,
            checkboxInput,
            handleInput,
        };
    },
});
</script>
