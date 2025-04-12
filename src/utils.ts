export const getDateObj = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const dateStr = date.toISOString().split("T")[0];

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = weekdays[date.getDay()];

    return { day, dateStr };
};

export const generateCompletionArr = (dates: string[], frequency: string[]) => {
    const prevSixDays = [];
    const prevSixComplete = [];

    let offsetFromToday = 1;
    while (prevSixDays.length < 6) {
        const prevDay = getDateObj(offsetFromToday);

        if (frequency.includes(prevDay.day)) {
            prevSixDays.push(prevDay);

            const completed = dates.includes(prevDay.dateStr);
            prevSixComplete.push(completed);
        }

        offsetFromToday++;
    }

    return prevSixComplete.reverse();
};
