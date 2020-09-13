export function task4(arr: number[]): number {
    return arr.filter(num => num > 0).reduce((a, b) => (a + b), 0);
}
