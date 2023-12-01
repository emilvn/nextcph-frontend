function convertToDanishDate(utcTimestamp: string): string {
    const date = new Date(utcTimestamp);

    return date.toLocaleString('da-DK', {
        year: 'numeric',
        month: 'long',
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

function formatPrice(price: number): string {
    return new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(price);
}


export { convertToDanishDate, convertToDanishTime, formatPrice }