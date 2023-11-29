function convertToDanishDate(utcTimestamp: string): string {
    const date = new Date(utcTimestamp);

    return date.toLocaleString('da-DK', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

function convertToDanishTime(utcTimestamp: string): string {
    const date = new Date(utcTimestamp);

    return date.toLocaleString('da-DK', {
        hour: '2-digit',
        minute: '2-digit',
    }).replace(".", ":");
}

export { convertToDanishDate, convertToDanishTime }