<template>
    <div
        :class="`si-carousel-${carouselId}`"
        :style="{ width: width, height: height }"
    >
        <div class="si-carousel__inner">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { checkPixelString } from "@silence-ui/utils/common/propValidators";
import { generateId } from "@silence-ui/utils/common/generator";
import { defineComponent, onMounted, PropType, ref, readonly } from "vue";
import type { Ref } from "vue";

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
        direction: {
            require: false,
            type: String as PropType<
                "row" | "column" | "row-reverse" | "column-reverse"
            >,
            default: "row",
            validator: (val: unknown) =>
                val === "row" ||
                val === "column" ||
                val === "row-reverse" ||
                val === "column-reverse",
        },
    },
    setup() {
        const carouselId: Ref<number> = readonly(ref(generateId()));
        const boxWidth: Ref<number> = ref(0);
        onMounted(() => {
            const carousel: HTMLElement = document.getElementsByClassName(
                `si-carousel-${carouselId.value}`
            )[0] as HTMLElement;
            const carouselItems =
                carousel.getElementsByClassName("si-carousel-item");
            const carouselWidth = carousel.clientWidth;
            const carouselHeight = carousel.clientHeight;
            const length = carouselItems.length;
            boxWidth.value = carouselWidth * length;
            const carouselInner: HTMLElement = carousel.getElementsByClassName(
                "si-carousel__inner"
            )[0] as HTMLElement;
            carouselInner.style.width = boxWidth.value + "px";
            carouselInner.style.height = carouselHeight + "px";
            carousel.style.overflow = "hidden";
            carousel.style.float = "left";
            for (let i = 0; i < length; i++) {
                (carouselItems[i] as HTMLElement).style.width =
                    carouselWidth + "px";
                (carouselItems[i] as HTMLElement).style.float = "left";
            }
            let i = 0;
            setInterval(() => {
                let current = i % length;
                let next = (i + 1) % length;
                let currentElm: HTMLElement = carouselItems[
                    current
                ] as HTMLElement;
                let nextElm: HTMLElement = carouselItems[next] as HTMLElement;
                currentElm.style.transition = "transform .8s";
                currentElm.style.transform = `translateX(${
                    0 - (current + 1) * carouselWidth
                }px)`;
                nextElm.style.transition = "transform .8s";
                nextElm.style.transform = `translateX(${
                    0 - next * carouselWidth
                }px)`;
                i++;
                setTimeout(() => {
                    currentElm.style.transition = "";
                    nextElm.style.transition = "";
                    for (let j = 0; j < length; j++) {
                        if (j === i % length) continue;
                        if (j < i % length) {
                            (
                                carouselItems[j] as HTMLElement
                            ).style.transform = `translateX(${
                                (length - j - (i % length)) * carouselWidth
                            }px)`;
                        } else {
                            (
                                carouselItems[j] as HTMLElement
                            ).style.transform = `translateX(${
                                0 - (i % length) * carouselWidth
                            }px)`;
                        }
                    }
                    i %= length;
                }, 800);
            }, 2000);
        });
        return {
            carouselId,
            boxWidth,
        };
    },
});
</script>
