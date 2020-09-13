export function task5(arr: number[]): number {
    let max: number = -1000; // let it be the littlest number
    for (let i: number = 0; i < arr.length; i++) {
        if (arr[i][i]) {
            max = arr[i][i] > max ? arr[i][i] : max;   
        }
    }
    return max;
} 
