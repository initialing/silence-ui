<template>
    <article>
        <p>button</p>
        <div class="show">
            <si-button type="button" @click="btnClick(2, $event)">{{
                btname
            }}</si-button>
            <si-button
                theme="danger"
                :disabled="true"
                @click="btnClick(2, $event)"
                >danger</si-button
            >
        </div>
        <p>input</p>
        <div class="show">
            <si-input
                v-model="inputVal"
                type="text"
                :disabled="true"
                @focus="inputFocus"
                @blur="inputBlur"
                @change="inputChange"
                @input="inputInput"
            ></si-input>
        </div>
        <p>radio</p>
        <div class="show">
            <si-radio-group v-model="radioVal">
                <si-radio class="radio" label="1">choice 1</si-radio>
                <si-radio class="radio" label="2">choice 2</si-radio>
            </si-radio-group>
        </div>
        <p>checkbox</p>
        <div class="show">
            <si-checkbox-group v-model="check" @click="clickCb">
                <si-checkbox class="radio" label="1">check 1</si-checkbox>
                <si-checkbox class="radio" label="2">check 2</si-checkbox>
            </si-checkbox-group>
        </div>
        <p>free selector</p>
        <div class="show">
            <si-free-selector
                v-model="fsmodel"
                :selections="fsoptions"
                @selector-input="selectorInput"
            >
                <template #tags="tagProp"
                    ><si-tag
                        :value="tagProp.item.value"
                        :label="tagProp.item.label"
                    ></si-tag
                ></template>
                <template #options="optionProp"
                    ><si-option
                        :value="optionProp.item.key"
                        :label="optionProp.item.name"
                    ></si-option
                ></template>
            </si-free-selector>
        </div>
        <p>date picker</p>
        <div class="show">
            <si-date-picker
                v-model="date"
                @change="datePickerChange"
            ></si-date-picker>
        </div>
        <p>pagination</p>
        <div class="show">
            <si-pagination
                v-model="currentPage"
                :page-size="pageSize"
                :total="totalCount"
            ></si-pagination>
        </div>
        <!-- <div style="margin-top: 20px">
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
        </div> -->
    </article>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from "vue";
let btname: Ref<string> = ref("");
let inputVal: Ref<string> = ref("");
let radioVal: Ref<string> = ref("1");
let check1: Ref<boolean> = ref(false);
let check2: Ref<boolean> = ref(false);
let check: Ref<Array<unknown>> = ref(["1"]);
let fsmodel: Ref<Array<unknown>> = ref([]);
let fsoptions: Ref<Array<unknown>> = ref([]);
let date: Ref<string | number | Date> = ref("2022-5-1");
let currentPage: Ref<number> = ref(1);
let totalCount: Ref<number> = ref(10);
let pageSize: Ref<number> = ref(10);
fsmodel.value = [
    { value: 1, label: "A" },
    { value: 2, label: "B" },
];
let a = [
    { key: 1, name: "A" },
    { key: 3, name: "C" },
];
let b = [
    { key: 2, name: "B" },
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
const selectorInput = (val) => {
    if (val == "a") {
        fsoptions.value = a;
    } else {
        fsoptions.value = b;
    }
};
const datePickerChange = (val) => {
    console.log(val);
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
    padding-left: 30px;
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
