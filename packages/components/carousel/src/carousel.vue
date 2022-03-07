<template>
    <div class="si-carousel" :style="{ width: width, height: height }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { checkPixelString } from "@silence-ui/utils/common/propValidators";
import { defineComponent } from "vue";

export default defineComponent({
    name: "SiCarousel",
    props: {
        width: {
            require: false,
            type: String,
            default: "100vw",
            validator: (val: string) => checkPixelString(val),
        },
        height: {
            require: false,
            type: String,
            default: "100vh",
            validator: (val: string) => checkPixelString(val),
        },
    },
    setup() {
        return {};
    },
});
</script>
