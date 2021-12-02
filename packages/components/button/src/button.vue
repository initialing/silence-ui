<template>
    <button class="si-btn">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    name: "SiButton"
})

</script>