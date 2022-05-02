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
                                >{{ panelYear }}年</span
                            ><span class="si-datepicker-panel-function_month"
                                >{{ panelMonth }}月</span
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
                            <tbody>
                                <tr>
                                    <th>日</th>
                                    <th>一</th>
                                    <th>二</th>
                                    <th>三</th>
                                    <th>四</th>
                                    <th>五</th>
                                    <th>六</th>
                                </tr>
                                <tr
                                    v-for="(week, index) in dateArray"
                                    :key="index"
                                    class="table__row"
                                >
                                    <td
                                        v-for="(day, dayIndex) in week"
                                        :key="dayIndex"
                                        :class="[
                                            { 'pre-month': day.preMonth },
                                            {
                                                'current-month':
                                                    day.presentMonth,
                                            },
                                            { 'next-month': day.nextMonth },
                                        ]"
                                    >
                                        <div
                                            :class="[
                                                { 'active-day': day.active },
                                                { 'now-day': day.today },
                                            ]"
                                        >
                                            <sapn>{{ day.day }}</sapn>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
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
        const aDayTime: number = 24 * 60 * 60 * 1000;
        const datePickerId: Ref<number> = ref(generateId());
        const datePickerPanelId: Ref<number> = ref(generateId());
        const datePanelShow: Ref<boolean> = ref(true);
        const dateArray: Ref<Array<Array<dayCell>> | null> = ref(null);
        const panelYear: Ref<number> = ref(0);
        const panelMonth: Ref<number> = ref(0);
        const getDateArray = () => {
            const now = new Date();
            const nowTime = now.getTime();
            const fullYear = now.getFullYear();
            const month = now.getMonth() + 1;
            let resArray: Array<Array<dayCell>> = new Array<Array<dayCell>>(6);
            for (let i = 0; i < 6; i++) {
                resArray[i] = new Array<dayCell>(7);
            }
            let nowDay = now.getDay();
            let nowDate = now.getDate();
            resArray[(nowDate / 7) | 0][nowDay] = {
                today: true,
                presentMonth: true,
                preMonth: false,
                nextMonth: false,
                day: nowDate,
                date: now,
                active: true,
            };
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 7; j++) {
                    if (i * 7 + j + 1 < ((nowDate / 7) | 0) * 7 + nowDay + 1) {
                        let dValue =
                            ((nowDate / 7) | 0) * 7 + nowDay - i * 7 - j;
                        let tempDate = new Date(nowTime - dValue * aDayTime);
                        if (
                            tempDate.getFullYear() < fullYear ||
                            tempDate.getMonth() + 1 < month
                        ) {
                            resArray[i][j] = {
                                today: false,
                                presentMonth: false,
                                preMonth: true,
                                nextMonth: false,
                                day: tempDate.getDate(),
                                date: tempDate,
                                active: false,
                            };
                        } else {
                            resArray[i][j] = {
                                today: false,
                                presentMonth: true,
                                preMonth: false,
                                nextMonth: false,
                                day: tempDate.getDate(),
                                date: tempDate,
                                active: false,
                            };
                        }
                    } else if (
                        i * 7 + j + 1 >
                        ((nowDate / 7) | 0) * 7 + nowDay + 1
                    ) {
                        let dValue =
                            i * 7 + j - ((nowDate / 7) | 0) * 7 - nowDay;
                        let tempDate = new Date(nowTime + dValue * aDayTime);
                        if (
                            tempDate.getFullYear() > fullYear ||
                            tempDate.getMonth() + 1 > month
                        ) {
                            resArray[i][j] = {
                                today: false,
                                presentMonth: false,
                                preMonth: false,
                                nextMonth: true,
                                day: tempDate.getDate(),
                                date: tempDate,
                                active: false,
                            };
                        } else {
                            resArray[i][j] = {
                                today: false,
                                presentMonth: true,
                                preMonth: false,
                                nextMonth: false,
                                day: tempDate.getDate(),
                                date: tempDate,
                                active: false,
                            };
                        }
                    }
                }
            }
            return { resArray, fullYear, month };
        };
        onMounted(() => {
            calcPanelPosition(
                `si-datepicker-${datePickerId.value}`,
                `si-datepicker-panel-${datePickerPanelId.value}`,
                280
            );
            let { resArray, fullYear, month } = getDateArray();
            dateArray.value = resArray;
            panelYear.value = fullYear;
            panelMonth.value = month;
        });
        return {
            datePickerId,
            datePickerPanelId,
            datePanelShow,
            dateArray,
            panelYear,
            panelMonth,
        };
    },
});
</script>
