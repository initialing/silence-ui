<template>
    <p
        :class="[
            'si-option',
            `si-option-${activeValue.includes(value) ? 'active' : 'normal'}`,
        ]"
        @click.prevent="handleClick"
    >
        {{ label }}
    </p>
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch } from "vue";
import type { Ref } from "vue";
import type {
    basicFunc,
    ObjHasValueLabel,
} from "@silence-ui/utils/types/commonType";

export default defineComponent({
    name: "SiOption",
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
        const activeValue: Ref<Array<unknown>> = ref([]);
        const selectorModel: Ref<Array<ObjHasValueLabel>> = inject(
            "selectorModel"
        ) as Ref;
        const updateSelectorModel = inject("updateSelectorModel") as basicFunc;
        activeValue.value = selectorModel.value.map((item) => item.value);
        const handleClick = () => {
            if (activeValue.value.includes(props.value)) {
                updateSelectorModel(
                    selectorModel.value.filter(
                        (item) => item.value !== props.value
                    )
                );
            } else {
                let temp = selectorModel.value;
                temp.push({ value: props.value, label: props.label });
                activeValue.value.push(props.value);
                updateSelectorModel(temp);
            }
        };
        watch(selectorModel, (newVal) => {
            activeValue.value = newVal.map((item) => item.value);
        });
        return {
            activeValue,
            handleClick,
        };
    },
});
</script>
