function getMonthsArray() {
    const months = Array.from({ length: 12 }, (_, i) => {
        const month = new Date(0, i + 1, 0).toLocaleDateString("da-DK", { month: "short" });
        return month.charAt(0).toUpperCase() + month.slice(1);
    });
    return months;
}

export { getMonthsArray };