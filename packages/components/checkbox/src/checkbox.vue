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
import { defineComponent, ref, watch, toRefs, inject } from "vue";
import type { Ref } from "vue";
import { basicFunc } from "@silence-ui/utils/types/commonType";

export default defineComponent({
    name: "SiCheckbox",
    props: {
        modelValue: {
            require: false,
            type: Boolean,
            default: null,
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
        const groupCheckboxModel: Ref<Array<unknown>> = inject(
            "groupCheckboxModel"
        ) as Ref;
        const updateCheckboxModel = inject("updateCheckboxModel") as basicFunc;
        const checkboxSet = new Set();
        const checkboxInput = ref(null);
        const { modelValue } = toRefs(props);
        const { label } = toRefs(props);
        if (modelValue.value !== null) {
            value.value = modelValue.value;
            watch(modelValue, (newVal) => {
                (checkboxInput.value as unknown as HTMLInputElement).checked =
                    newVal;
                value.value = newVal;
            });
        } else if (groupCheckboxModel.value) {
            groupCheckboxModel.value.forEach((item) => checkboxSet.add(item));
            value.value = checkboxSet.has(label.value);
            watch(groupCheckboxModel, (newVal: Array<unknown>) => {
                checkboxSet.clear();
                newVal.forEach((item) => checkboxSet.add(item));
                (checkboxInput.value as unknown as HTMLInputElement).checked =
                    checkboxSet.has(label.value);
                value.value = checkboxSet.has(label.value);
            });
        }
        const handleInput = () => {
            emit("update:modelValue", !value.value);
            if (value.value) {
                checkboxSet.delete(label.value);
            } else {
                checkboxSet.add(label.value);
            }
            updateCheckboxModel(checkboxSet);
        };
        return {
            value,
            checkboxInput,
            handleInput,
        };
    },
});
</script>
