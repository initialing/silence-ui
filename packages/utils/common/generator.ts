let identify = 1;

export function generateId(): number {
    return identify++;
}

export function getRandomName(): string {
    return URL.createObjectURL(new Blob()).slice(-12, -1);
}
