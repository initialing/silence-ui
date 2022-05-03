export function checkDate(date: string | number | Date): boolean {
    if (new Date(date).toString().toUpperCase() === "INVALID DATE") {
        return false;
    }
    return true;
}
