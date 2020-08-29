function task2(n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            for (let k = 1; k <= n; k++) {
                if (i ** 2 + j ** 2 === k ** 3) {
                    arr.push(i, j, k);
                }
            }
        }
    }
    const unique = [...new Set(arr)].sort((a, b) => a > b);
    return unique;
}
