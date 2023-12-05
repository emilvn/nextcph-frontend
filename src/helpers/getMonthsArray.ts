function getMonthsArray() {
    const months = Array.from({ length: 12 }, (_, i) => {
        return new Date(0, i + 1, 0).toLocaleDateString("DK", { month: "short" });
    });
    return months;
}

export { getMonthsArray };