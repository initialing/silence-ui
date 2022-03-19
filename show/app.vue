<template>
    <article>
        <p>button</p>
        <div class="show">
            <SiButton type="button" @click="btnClick(2, $event)">{{
                btname
            }}</SiButton>
            <SiButton
                theme="danger"
                :disabled="true"
                @click="btnClick(2, $event)"
                >danger</SiButton
            >
        </div>
        <p>input</p>
        <div class="show">
            <SiInput
                v-model="inputVal"
                type="text"
                :disabled="true"
                @focus="inputFocus"
                @blur="inputBlur"
                @change="inputChange"
                @input="inputInput"
            ></SiInput>
        </div>
        <div class="show">
            <SiRadioGroup>
                <SiRadio :value="1">choice 1</SiRadio>
                <SiRadio :value="2">choice 2</SiRadio>
            </SiRadioGroup>
        </div>
        <div style="margin-top: 20px">
            <SiCarousel>
                <SiCarouselItem
                    ><div class="carousel" style="background-color: aqua"></div
                ></SiCarouselItem>
                <SiCarouselItem
                    ><div
                        class="carousel"
                        style="background-color: yellow"
                    ></div
                ></SiCarouselItem>
                <SiCarouselItem
                    ><div class="carousel" style="background-color: brown"></div
                ></SiCarouselItem>
            </SiCarousel>
        </div>
    </article>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
let btname: Ref<string> = ref("");
let inputVal: Ref<string> = ref("");
const btnClick = (num: number, evt: MouseEvent) => {
    console.log("click ==>", evt.currentTarget);
};
const inputFocus = ($ev) => {
    console.log("focus", $ev);
};
const inputBlur = () => {
    console.log("blur", inputVal.value);
};
const inputChange = (val) => {
    console.log("change", val);
};
const inputInput = (val) => {
    console.log("input", val);
};
onMounted((): void => {
    btname.value = "default";
});
</script>

<style>
body {
    margin: 0px;
}
.show {
    width: 100%;
    display: flex;
}
.si-btn {
    margin-right: 10px;
}
.carousel {
    width: 100%;
    height: 100%;
}
</style>
