export default function dateParser(t: Date){
    let YYYY = t.getFullYear();
    let MM = ((t.getMonth() + 1 < 10) ? '0' : '') + (t.getMonth() + 1);
    let DD = ((t.getDate() < 10) ? '0' : '') + t.getDate();
    let HH = ((t.getHours() < 10) ? '0' : '') + t.getHours();
    let mm = ((t.getMinutes() < 10) ? '0' : '') + t.getMinutes();
    let ss = ((t.getSeconds() < 10) ? '0' : '') + t.getSeconds();

    let time_of_call = YYYY+'-'+MM+'-'+DD+' '+HH+':'+mm+':'+ss;
    return time_of_call;
}
