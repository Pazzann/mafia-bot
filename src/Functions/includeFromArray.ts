export default function (str: string, arr: Array<string>): boolean{
    for(let line of arr){
        if (str.includes(line))
            return true;
    }
    return false;
}