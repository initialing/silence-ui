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
import { defineComponent, ref, onMounted } from "vue";
import type { Ref } from "vue";
import { generateId } from "@silence-ui/utils/common/generator";

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
    },
    setup() {
        const panelId: Ref<number> = ref(generateId());
        const selectorId: Ref<number> = ref(generateId());
        const showPanel: Ref<boolean> = ref(false);
        onMounted(() => {
            const selector: HTMLElement = document.getElementById(
                `si-freeselector-${selectorId.value}`
            ) as HTMLElement;
            const panel: HTMLElement = document.getElementById(
                `si-panel-${panelId.value}`
            ) as HTMLElement;
            const selectorWidth = selector.clientWidth;
            const selectorHeight = selector.clientHeight;
            const selectorX = selector.offsetLeft;
            const selectorY = selector.offsetTop;
            panel.style.width = selectorWidth + "px";
            panel.style.top = selectorHeight + selectorY + 10 + "px";
            panel.style.left = selectorX + "px";
        });
        const inputFocus = () => {
            showPanel.value = true;
        };
        const inputBlur = () => {
            showPanel.value = false;
        };
        return {
            panelId,
            selectorId,
            inputFocus,
            inputBlur,
            showPanel,
        };
    },
});
</script>
