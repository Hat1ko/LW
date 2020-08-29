function task1(num1, num2, num3) {
    const arr = [num1, num2, num3];
    return arr.filter(num => num > 0).reduce((a,b) =>  a + b, 0);
}
