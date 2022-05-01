<template>
    <div :id="`si-freeselector-${selectorId}`" class="si-freeselector">
        <div class="si-freeselector-head">
            <label
                v-for="(tag, index) in modelValue"
                :key="index"
                class="si-freeselector-head__tag"
            >
                <slot name="tags" :item="tag" :index="index"></slot>
            </label>
            <input
                class="si-freeselector-head__innerinput"
                :placeholder="placeholder"
                @focus="inputFocus"
                @blur="inputBlur"
                @input="inputHadle"
            />
        </div>
        <teleport to="body">
            <div
                :id="`si-panel-${panelId}`"
                :class="[
                    'si-freeselector-choosepanel',
                    `si-freeselector-choosepanel-${
                        showPanel ? 'show' : 'hide'
                    }`,
                ]"
            >
                <ul class="si-freeselector-choosepanel__list">
                    <li
                        v-for="(item, index) in selections"
                        :key="index"
                        class="si-freeselector-choosepanel__item"
                    >
                        <slot name="options" :item="item" :index="index"></slot>
                    </li>
                </ul>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    provide,
    toRefs,
    InputHTMLAttributes,
} from "vue";
import type { Ref } from "vue";
import { generateId } from "@silence-ui/utils/common/generator";
import { calcPanelPosition } from "@silence-ui/utils/common/setPosition";
import type { ObjHasValueLabel } from "@silence-ui/utils/types/commonType";

export default defineComponent({
    name: "SiFreeSelector",
    props: {
        selections: {
            require: false,
            type: Array,
            default: () => [],
        },
        modelValue: {
            require: false,
            type: Array,
            default: () => [],
        },
        placeholder: {
            require: false,
            type: String,
            default: "请输入",
        },
    },
    emits: {
        "update:modelValue": (val: Array<unknown>) => {
            return true || val;
        },
        selectorInput: (val: unknown) => {
            return true || val;
        },
    },
    setup(props, { emit }) {
        const { modelValue } = toRefs(props);
        const panelId: Ref<number> = ref(generateId());
        const selectorId: Ref<number> = ref(generateId());
        const showPanel: Ref<boolean> = ref(false);
        onMounted(() => {
            calcPanelPosition(
                `si-freeselector-${selectorId.value}`,
                `si-panel-${panelId.value}`
            );
        });
        const inputFocus = () => {
            showPanel.value = true;
            calcPanelPosition(
                `si-freeselector-${selectorId.value}`,
                `si-panel-${panelId.value}`
            );
        };
        const inputBlur = () => {
            showPanel.value = false;
        };

        const updateFreeSelectorModel = (val) => {
            emit("update:modelValue", val);
        };
        const deleteFreeSelectorTag = (val) => {
            console.log("delete", val);
            emit(
                "update:modelValue",
                (modelValue.value as Array<ObjHasValueLabel>).filter(
                    (item) => item.value !== val
                )
            );
        };

        const inputHadle = (evt: Event) => {
            emit("selectorInput", (evt.target as InputHTMLAttributes).value);
        };
        provide("selectorModel", modelValue);
        provide("updateSelectorModel", updateFreeSelectorModel);
        provide("deleteFreeSelectorTag", deleteFreeSelectorTag);
        return {
            panelId,
            selectorId,
            inputFocus,
            inputBlur,
            showPanel,
            inputHadle,
        };
    },
});
</script>
