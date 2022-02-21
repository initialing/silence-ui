<template>
    <div :class="['si-input', { 'si-input-disabled': disabled }]">
        <input
            :value="modelValue"
            :class="[
                'si-input__input',
                { 'si-input-disabled__input': disabled },
            ]"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
    name: "SiInput",
    props: {
        type: {
            require: false,
            type: String as PropType<"text" | "password" | "number">,
            default: "text",
            validator: (val: unknown) =>
                val === "text" || val === "password" || val === "number",
        },
        modelValue: {
            type: [Number, String],
            default: null,
        },
        placeholder: {
            required: false,
            type: String,
            default: "请输入内容",
        },
        disabled: {
            require: false,
            type: Boolean,
            default: false,
            validator: (val: unknown) => typeof val === "boolean",
        },
    },
    emits: {
        focus: (evt: FocusEvent) => {
            return !!evt;
        },
        blur: (evt: Event) => {
            return !!evt;
        },
        change: (val: string | number | null) => {
            return true || val;
        },
        input: (val: string | number | null) => {
            return true || val;
        },
        "update:modelValue": (val: string | number | null) => {
            return true || val;
        },
    },
    setup(porps, { emit }) {
        const handleFocus = (evt: FocusEvent) => {
            emit("focus", evt);
        };
        const handleInput = (evt: Event) => {
            emit("input", (evt.target as HTMLInputElement).value);
            emit("update:modelValue", (evt.target as HTMLInputElement).value);
        };
        const handleBlur = (evt: Event) => {
            emit("blur", evt);
        };
        const handleChange = (evt: Event) => {
            emit("change", (evt.target as HTMLInputElement).value);
        };
        return {
            handleFocus,
            handleInput,
            handleBlur,
            handleChange,
        };
    },
});
</script>
