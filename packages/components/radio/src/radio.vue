<template>
    <span class="si-radio" role="radio" tabindex="-1">
        <input
            :id="`si-radio__${id}`"
            class="si-radio__input"
            type="radio"
            autocomplete="off"
            tabindex="-1"
            aria-hidden="true"
            :value="value"
        />
        <label :for="`si-radio__${id}`"><slot></slot></label>
    </span>
</template>
<script lang="ts">
import { defineComponent, ref, readonly } from "vue";
import type { Ref } from "vue";
import { generateId } from "@silence-ui/utils/common/generator";

export default defineComponent({
    name: "SiRadio",
    props: {
        value: {
            require: true,
            type: [String, Boolean, Number],
            default: "",
        },
    },
    setup() {
        const id: Ref<number> = readonly(ref(generateId()));
        return {
            id,
        };
    },
});
</script>
