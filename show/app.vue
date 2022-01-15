<template>
    <div style="width: 100vw; display: flex">
        <SiButton type="button" @click="btnClick">{{ btname }}</SiButton>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
let btname: Ref<string> = ref("");
const btnClick = () => {
    console.log("click");
};
onMounted((): void => {
    btname.value = "button";
});
</script>

<style scoped></style>
