function task5(arr) {
    let max = -1000; // let it be the littlest number
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][i]) {
            max = arr[i][i] > max ? arr[i][i] : max;   
        }
    }
    return max;
} 
