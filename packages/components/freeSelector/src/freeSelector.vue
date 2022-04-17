<template>
    <div class="si-freeselector">
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
            />
        </div>
        <teleport to="body">
            <div class="si-freeselector-choosepanel">
                <ul>
                    <li v-for="(item, index) in selections" :key="index">
                        <slot name="options" :item="item" :index="index"></slot>
                    </li>
                </ul>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
});
</script>
