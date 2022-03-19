<template>
    <div :id="`si-radiogroup__${id}`">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent, readonly, ref, onMounted } from "vue";
import type { Ref } from "vue";
import { generateId, getRandomName } from "@silence-ui/utils/common/generator";

export default defineComponent({
    name: "SiRadioGroup",
    setup() {
        const id: Ref<number> = readonly(ref(generateId()));
        const radioName: Ref<string> = readonly(ref(getRandomName()));
        onMounted(() => {
            const radioGroup = document.getElementById(
                `si-radiogroup__${id.value}`
            );
            const radios =
                radioGroup?.getElementsByClassName("si-radio__input");
            if (radios && radios.length > 0) {
                for (let i = 0; i < radios.length; i++) {
                    radios[i].setAttribute("name", radioName.value);
                }
            }
        });
        return {
            id,
        };
    },
});
</script>
