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
            <SiRadioGroup v-model="radioVal">
                <SiRadio class="radio" label="1">choice 1</SiRadio>
                <SiRadio class="radio" label="2">choice 2</SiRadio>
            </SiRadioGroup>
        </div>
        <div class="show">
            <SiCheckboxGroup v-model="check" @click="clickCb">
                <SiCheckbox class="radio" label="1">check 1</SiCheckbox>
                <SiCheckbox class="radio" label="2">check 2</SiCheckbox>
            </SiCheckboxGroup>
        </div>
        <div class="show">
            <SiFreeSelector v-model="fsmodel" :selections="fsoptions">
                <template #tags="tagProp"
                    ><SiTag
                        :value="tagProp.item.key"
                        :label="tagProp.item.name"
                    ></SiTag
                ></template>
                <template #options="optionProp"
                    ><SiOption>{{ optionProp.item.name }}</SiOption></template
                >
            </SiFreeSelector>
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
import { onMounted, Ref, ref, watch, toRefs } from "vue";
let btname: Ref<string> = ref("");
let inputVal: Ref<string> = ref("");
let radioVal: Ref<string> = ref("1");
let check1: Ref<boolean> = ref(false);
let check2: Ref<boolean> = ref(false);
let check: Ref<Array<unknown>> = ref(["1"]);
let fsmodel: Ref<Array<unknown>> = ref([]);
let fsoptions: Ref<Array<unknown>> = ref([]);
fsmodel.value = [
    { key: 1, name: "A" },
    { key: 2, name: "B" },
];
fsoptions.value = [
    { key: 1, name: "A" },
    { key: 2, name: "B" },
    { key: 3, name: "C" },
    { key: 4, name: "D" },
];
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
console.log("check", check);
const clickCb = (val) => {
    console.log("clickCb", val);
    console.log("check", check.value);
};
watch(radioVal, (val) => {
    console.log("radio", val);
});
watch(check1, (val) => {
    console.log("check1", val);
    console.log("check2", check2.value);
    console.log("check", check.value);
});
watch(check, (val) => {
    console.log("check", val);
});
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
.radio {
    margin-left: 10px;
}
</style>
