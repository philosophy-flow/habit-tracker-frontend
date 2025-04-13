const getDateObj = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const dateStr = date.toLocaleDateString("en-CA");

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = weekdays[date.getDay()];

    return { day, dateStr };
};

export const generateCompletionArr = (
    datesCompleted: string[],
    frequency: string[],
) => {
    const prevSixDays = [];
    const prevSixComplete = [];

    let offsetFromToday = 1;
    while (prevSixDays.length < 6) {
        const prevDay = getDateObj(offsetFromToday);

        if (frequency.includes(prevDay.day)) {
            prevSixDays.push(prevDay);

            const completed = datesCompleted.includes(prevDay.dateStr);
            prevSixComplete.push(completed);
        }

        offsetFromToday++;
    }

    return prevSixComplete.reverse();
};

export const calculateStreak = (
    datesCompleted: string[],
    frequency: string[],
    startDate: string,
) => {
    let streak = 0;
    let offsetFromToday = 1;
    let currentDate = getDateObj(offsetFromToday);

    while (currentDate.dateStr >= startDate) {
        if (frequency.includes(currentDate.day)) {
            const completed = datesCompleted.includes(currentDate.dateStr);
            if (completed) {
                streak += 1;
            } else {
                return streak;
            }
        }
        offsetFromToday++;
        currentDate = getDateObj(offsetFromToday);
    }

    return streak;
};
