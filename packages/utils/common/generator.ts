let identify = 1;
let zIndex = 100;

export function generateId(): number {
    return identify++;
}

export function getRandomName(): string {
    return URL.createObjectURL(new Blob()).slice(-12, -1);
}

export function generateZIndex(): number {
    return ++zIndex;
}
