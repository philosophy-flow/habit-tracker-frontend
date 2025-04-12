export const getDateStr = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    return date.toISOString().split("T")[0];
};

export const generateCompletionArr = (dates: string[]) => {
    const prevSixComplete = [];

    let i = 6;
    while (i > 0) {
        const prevDay = getDateStr(i);
        const completed = dates.includes(prevDay);

        prevSixComplete.push(completed);
        i--;
    }

    return prevSixComplete;
};
