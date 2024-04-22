export function requestTime(time) {
    const dt = new Date(time);
    return `${dt.getDate()}/${dt.getMonth()+1}/${dt.getFullYear()}`;
}