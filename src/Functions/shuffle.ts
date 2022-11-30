export default function shuffle(arr: Array<any>): Array<any>{
    let shuffledArr: Array<any> = [];
    let startLen = arr.length;
    let tick = 0;
    for (let i = Math.floor(Math.random() * startLen); tick < startLen ;i = Math.floor(Math.random() * arr.length)){
        shuffledArr.push(arr[i]);
        arr.splice(i, 1);
        tick++
    }
    return shuffledArr;
}