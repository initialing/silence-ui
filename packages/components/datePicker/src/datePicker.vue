<template>
    <div :id="`si-datepicker-${datePickerId}`" class="si-datepicker">
        <input class="si-datepicker__input" autocomplete="off" type="text" />

        <teleport to="body">
            <div
                :id="`si-datepicker-panel-${datePickerPanelId}`"
                :class="[
                    'si-datepicker-panel',
                    `si-datepicker-panel-${datePanelShow ? 'hide' : 'show'}`,
                ]"
            >
                <div class="si-datepicker-panel-content">
                    <div class="si-datepicker-panel-function">
                        <div class="si-datepicker-panel-function_label">
                            <button
                                class="si-datepicker-panel-function_btn si-datepicker-panel-function_pre_year"
                            ></button
                            ><button
                                class="si-datepicker-panel-function_btn si-datepicker-panel-function_pre_month"
                            ></button>
                        </div>
                        <div class="si-datepicker-panel-function_label">
                            <span class="si-datepicker-panel-function_year"
                                >2022年</span
                            ><span class="si-datepicker-panel-function_month"
                                >4月</span
                            >
                        </div>
                        <div class="si-datepicker-panel-function_label">
                            <button
                                class="si-datepicker-panel-function_btn si-datepicker-panel-function_next_month"
                            ></button
                            ><button
                                class="si-datepicker-panel-function_btn si-datepicker-panel-function_next_year"
                            ></button>
                        </div>
                    </div>
                    <div class="si-datepicker-panel-body">
                        <table class="si-datepicker-panel-table">
                            <tr>
                                <th>周一</th>
                                <th>周二</th>
                                <th>周三</th>
                                <th>周四</th>
                                <th>周五</th>
                                <th>周六</th>
                                <th>周日</th>
                            </tr>
                            <tr v-for="(week, index) in dateArray" :key="index">
                                <td
                                    v-for="(day, dayIndex) in week"
                                    :key="dayIndex"
                                >
                                    <div>
                                        <sapn>{{ day.day }}</sapn>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import type { Ref } from "vue";
import { generateId } from "@silence-ui/utils/common/generator";
import { calcPanelPosition } from "@silence-ui/utils/common/setPosition";
import type { dayCell } from "@silence-ui/utils/types/commonType";

export default defineComponent({
    name: "SiDatePicker",
    setup() {
        const datePickerId: Ref<number> = ref(generateId());
        const datePickerPanelId: Ref<number> = ref(generateId());
        const datePanelShow: Ref<boolean> = ref(true);
        const dateArray: Ref<Array<Array<dayCell>> | null> = ref(null);
        onMounted(() => {
            calcPanelPosition(
                `si-datepicker-${datePickerId.value}`,
                `si-datepicker-panel-${datePickerPanelId.value}`,
                330
            );
            dateArray.value = [
                [
                    {
                        today: false,
                        presentMonth: true,
                        preMonth: false,
                        nextMonth: false,
                        day: "1",
                    },
                    {
                        today: false,
                        presentMonth: true,
                        preMonth: false,
                        nextMonth: false,
                        day: "2",
                    },
                ],
            ];
        });
        return {
            datePickerId,
            datePickerPanelId,
            datePanelShow,
            dateArray,
        };
    },
});
</script>
