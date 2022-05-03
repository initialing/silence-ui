<template>
    <div :id="`si-datepicker-${datePickerId}`" class="si-datepicker">
        <input
            v-model="inputValue"
            class="si-datepicker__input"
            autocomplete="off"
            type="text"
            @change="inputChange"
            @focus="inputFocus"
        />

        <teleport to="body">
            <div
                :id="`si-datepicker-panel-${datePickerPanelId}`"
                :class="[
                    'si-datepicker-panel',
                    `si-datepicker-panel-${datePanelShow ? 'show' : 'hide'}`,
                ]"
            >
                <div class="si-datepicker-panel-inner">
                    <div class="si-datepicker-panel-content">
                        <div class="si-datepicker-panel-function">
                            <div class="si-datepicker-panel-function_label">
                                <button
                                    class="si-datepicker-panel-function_btn si-datepicker-panel-function_pre_year"
                                    @click.prevent="preYear"
                                ></button
                                ><button
                                    class="si-datepicker-panel-function_btn si-datepicker-panel-function_pre_month"
                                    @click.prevent="preMonth"
                                ></button>
                            </div>
                            <div class="si-datepicker-panel-function_label">
                                <span class="si-datepicker-panel-function_year"
                                    >{{ panelYear }}年</span
                                ><span
                                    class="si-datepicker-panel-function_month"
                                    >{{ panelMonth }}月</span
                                >
                            </div>
                            <div class="si-datepicker-panel-function_label">
                                <button
                                    class="si-datepicker-panel-function_btn si-datepicker-panel-function_next_month"
                                    @click.prevent="nextMonth"
                                ></button
                                ><button
                                    class="si-datepicker-panel-function_btn si-datepicker-panel-function_next_year"
                                    @click.prevent="nextYear"
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
                                                    {
                                                        'active-day':
                                                            day.active,
                                                    },
                                                    { 'now-day': day.today },
                                                ]"
                                                @click.prevent="selectDate(day)"
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
            </div>
        </teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, toRefs } from "vue";
import type { Ref } from "vue";
import { generateId } from "@silence-ui/utils/common/generator";
import { calcPanelPosition } from "@silence-ui/utils/common/setPosition";
import { checkDate } from "@silence-ui/utils/common/tools";
import type { dayCell } from "@silence-ui/utils/types/commonType";

export default defineComponent({
    name: "SiDatePicker",
    props: {
        modelValue: {
            require: false,
            type: [Number, String, Date],
            default: null,
        },
    },
    emits: {
        "update:modelValue": (val: Date) => {
            return true || val;
        },
        change: (val: Date) => {
            return true || val;
        },
    },
    setup(props, { emit }) {
        const aDayTime: number = 24 * 60 * 60 * 1000;
        const datePickerId: Ref<number> = ref(generateId());
        const datePickerPanelId: Ref<number> = ref(generateId());
        const datePanelShow: Ref<boolean> = ref(false);
        const dateArray: Ref<Array<Array<dayCell>> | null> = ref(null);
        const panelYear: Ref<number> = ref(0);
        const panelMonth: Ref<number> = ref(0);
        const inputValue: Ref<string> = ref("");
        const activeDate: Ref<dayCell | null> = ref(null);
        const dateModel: Ref<Date | null> = ref(null);
        const { modelValue } = toRefs(props);
        watch(modelValue, (newVal) => {
            if (checkDate(newVal)) {
                setPanel(
                    new Date(modelValue.value),
                    new Date(modelValue.value),
                    true
                );
                dateModel.value = new Date(modelValue.value);
            }
        });
        const setPanel = (
            date: Date,
            activeDay: Date | null,
            setinput: boolean
        ) => {
            let { resArray, fullYear, month } = getDateArray(date, activeDay);
            if (setinput && date) {
                setInputValue(date);
            }
            dateArray.value = resArray;
            panelYear.value = fullYear;
            panelMonth.value = month;
        };
        const setTodyAndActive = (
            dayCell: dayCell,
            date: Date | null
        ): void => {
            const now = new Date();
            if (
                now.getFullYear() === dayCell.date.getFullYear() &&
                now.getMonth() === dayCell.date.getMonth() &&
                now.getDate() === dayCell.date.getDate()
            ) {
                dayCell.today = true;
            }
            if (date) {
                if (
                    date.getFullYear() === dayCell.date.getFullYear() &&
                    date.getMonth() === dayCell.date.getMonth() &&
                    date.getDate() === dayCell.date.getDate()
                ) {
                    dayCell.active = true;
                    activeDate.value = dayCell;
                }
            }
        };
        const getDateArray = (date: Date, activeDay: Date | null) => {
            const dateTime = date.getTime();
            const fullYear = date.getFullYear();
            const month = date.getMonth() + 1;
            let resArray: Array<Array<dayCell>> = new Array<Array<dayCell>>(6);
            for (let i = 0; i < 6; i++) {
                resArray[i] = new Array<dayCell>(7);
            }
            let dateDay = date.getDay();
            let dateDate = date.getDate();
            resArray[(dateDate / 7) | 0][dateDay] = {
                today: false,
                presentMonth: true,
                preMonth: false,
                nextMonth: false,
                day: dateDate,
                date: date,
                active: false,
            };
            setTodyAndActive(resArray[(dateDate / 7) | 0][dateDay], activeDay);
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 7; j++) {
                    if (
                        i * 7 + j + 1 <
                        ((dateDate / 7) | 0) * 7 + dateDay + 1
                    ) {
                        let dValue =
                            ((dateDate / 7) | 0) * 7 + dateDay - i * 7 - j;
                        let tempDate = new Date(dateTime - dValue * aDayTime);
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
                        ((dateDate / 7) | 0) * 7 + dateDay + 1
                    ) {
                        let dValue =
                            i * 7 + j - ((dateDate / 7) | 0) * 7 - dateDay;
                        let tempDate = new Date(dateTime + dValue * aDayTime);
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
                    setTodyAndActive(resArray[i][j], activeDay);
                }
            }
            return { resArray, fullYear, month };
        };
        onMounted(() => {
            calcPanelPosition(
                `si-datepicker-${datePickerId.value}`,
                `si-datepicker-panel-${datePickerPanelId.value}`,
                310
            );
            if (modelValue.value && checkDate(modelValue.value)) {
                setPanel(
                    new Date(modelValue.value),
                    new Date(modelValue.value),
                    true
                );
                dateModel.value = new Date(modelValue.value);
            } else {
                setPanel(new Date(), null, false);
            }
        });
        const selectDate = (day: dayCell) => {
            datePanelShow.value = false;
            emit("update:modelValue", day.date);
            emit("change", day.date);
        };
        const setInputValue = (date: Date) => {
            inputValue.value = `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()}`;
        };
        const inputChange = (evt: Event) => {
            const newVal = (evt.target as HTMLInputElement).value;
            if (!checkDate(newVal)) {
                if (!dateModel.value) {
                    inputValue.value = "";
                } else {
                    setInputValue(dateModel.value);
                }
            } else {
                emit("update:modelValue", new Date(newVal));
                emit("change", new Date(newVal));
            }
        };
        const inputFocus = () => {
            datePanelShow.value = true;
            calcPanelPosition(
                `si-datepicker-${datePickerId.value}`,
                `si-datepicker-panel-${datePickerPanelId.value}`,
                310
            );
        };
        const panelChage = (date: Date) => {
            if (
                dateModel.value &&
                date.getFullYear() === dateModel.value.getFullYear() &&
                date.getMonth() === dateModel.value.getMonth()
            ) {
                setPanel(date, dateModel.value, false);
            } else {
                setPanel(date, null, false);
            }
        };
        const preYear = () => {
            panelChage(new Date(panelYear.value - 1, panelMonth.value - 1));
        };
        const preMonth = () => {
            panelChage(new Date(panelYear.value, panelMonth.value - 2));
        };
        const nextYear = () => {
            panelChage(new Date(panelYear.value + 1, panelMonth.value - 1));
        };
        const nextMonth = () => {
            panelChage(new Date(panelYear.value, panelMonth.value));
        };
        return {
            datePickerId,
            datePickerPanelId,
            datePanelShow,
            dateArray,
            panelYear,
            panelMonth,
            selectDate,
            inputValue,
            inputChange,
            inputFocus,
            preYear,
            preMonth,
            nextYear,
            nextMonth,
        };
    },
});
</script>
