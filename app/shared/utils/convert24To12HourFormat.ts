export const convert24To12HourFormat = (time24Hr: any) => {
    const splitTime = time24Hr.split(':');
    const hour24 = parseInt(splitTime[0], 10);
    const minutes = splitTime[1];

    let period = 'AM';
    let hour12 = hour24;

    if (hour24 === 0) {
        period = 'AM';
        hour12 = 12;
    } else if (hour24 === 12) {
        period = 'PM';
        hour12 = 12;
    } else if (hour24 > 12) {
        period = 'PM';
        hour12 = hour24 - 12;
    } else {
        period = 'AM';
    }

    const format12Hr = `${hour12}:${minutes} ${period}`;
    return format12Hr;
};
