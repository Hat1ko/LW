function task4(arr) {
    return arr.filter(num => num > 0).reduce((a + b), 0);
}