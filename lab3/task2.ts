
export function task2(n: number): number[] {
    const arr: number[] = [];
    for (let i: number = 1; i <= n; i++) {
        for (let j: number = 1; j <= n; j++) {
            for (let k: number = 1; k <= n; k++) {
                if (i ** 2 + j ** 2 === k ** 3) {
                    arr.push(i, j, k);
                }
            }
        }
    }
    const unique = arr.filter((n, i) => arr.indexOf(n) === i). sort((a, b) => a - b );
    return unique as number[];
}
