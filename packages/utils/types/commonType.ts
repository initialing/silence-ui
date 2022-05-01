export type basicFunc = (val: unknown) => void;

export type ObjHasValueLabel = {
    value: string | number | boolean;
    label: string | number;
};

export type dayCell = {
    today: boolean;
    presentMonth: boolean;
    preMonth: boolean;
    nextMonth: boolean;
    day: string;
};
