function convertToDanishDate(utcTimestamp: string): string {
    const date = new Date(utcTimestamp);

    const danishDate = date.toLocaleString('da-DK', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return danishDate;
}

function convertToDanishTime(utcTimestamp: string): string {
    const date = new Date(utcTimestamp);

    const danishDate = date.toLocaleString('da-DK', {
        hour: '2-digit',
        minute: '2-digit',
    }).replace(".", ":");

    return danishDate;
}

export { convertToDanishDate, convertToDanishTime }