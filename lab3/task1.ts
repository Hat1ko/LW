export function task1(num1: number, num2: number, num3: number): number {
    const arr: number[] = [num1, num2, num3];
    return arr.filter(num => num > 0).reduce((a,b) =>  a + b, 0);
}
