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
import {
    defineComponent,
    onBeforeMount,
    onMounted,
    PropType,
    ref,
    toRef,
} from "vue";
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
    setup(props) {
        const carouselId: Ref<number> = ref(generateId());
        const boxWidth: Ref<number> = ref(0);
        const boxHeight: Ref<number> = ref(0);
        onMounted(() => {
            const carousel: HTMLElement = document.getElementsByClassName(
                `si-carousel-${carouselId.value}`
            )[0] as HTMLElement;
            const carouselItems =
                carousel.getElementsByClassName("si-carousel-item");
            const carouselWidth = carousel.clientWidth;
            const carouselHeight = carousel.clientHeight;
            boxWidth.value = carouselWidth * carouselItems.length;
            const carouselInner: HTMLElement = carousel.getElementsByClassName(
                "si-carousel__inner"
            )[0] as HTMLElement;
            carouselInner.style.width = boxWidth.value + "px";
            carouselInner.style.height = carouselHeight + "px";
            carousel.style.overflow = "hidden";
            carousel.style.float = "left";
            for (let i = 0; i < carouselItems.length; i++) {
                (carouselItems[i] as HTMLElement).style.width =
                    carouselWidth + "px";
                (carouselItems[i] as HTMLElement).style.float = "left";
            }
        });
        return {
            carouselId,
            boxWidth,
        };
    },
});
</script>
