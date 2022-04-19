<template>
    <p class="si-option">{{ label }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
});
</script>
