<template>
    <label
        class="si-radio"
        :class="{ 'si-radio-checked': value === label }"
        role="radio"
        tabindex="0"
        :aria-checked="value === label"
        @click.prevent="handleInput"
    >
        <span
            class="si-radio__inner"
            :class="{ 'si-radio__inner-checked': value === label }"
        >
            <span class="si-radio__head"
                ><span class="si-radio__head-inner"></span
            ></span>
            <input
                ref="radioInput"
                class="si-radio__input"
                type="radio"
                autocomplete="off"
                tabindex="-1"
                aria-hidden="true"
                :value="label"
            />
        </span>
        <span><slot></slot></span>
    </label>
</template>
<script lang="ts">
import { defineComponent, ref, watch, toRefs, inject } from "vue";
import type { Ref } from "vue";
import { basicFunc } from "@silence-ui/utils/types/commonType";

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
        const value = ref();
        const groupModel: Ref = inject("groupModel") as Ref;
        const updateModel = inject("updateModel") as basicFunc;
        const radioInput = ref(null);
        const { modelValue } = toRefs(props);
        if (groupModel.value !== "") {
            value.value = groupModel.value;
            watch(groupModel, (newVal) => {
                (radioInput.value as unknown as HTMLInputElement).checked =
                    newVal === props.label;
                value.value = newVal;
            });
        } else {
            value.value = modelValue.value;
            watch(modelValue, (newVal) => {
                (radioInput.value as unknown as HTMLInputElement).checked =
                    newVal === props.label;
                value.value = newVal;
            });
        }
        const handleInput = () => {
            emit("update:modelValue", props.label);
            updateModel(props.label);
        };
        return {
            value,
            handleInput,
            radioInput,
        };
    },
});
</script>
