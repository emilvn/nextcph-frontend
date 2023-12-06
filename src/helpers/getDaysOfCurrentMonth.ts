function getDaysOfCurrentMonth(month: number, year: number): number[] {
    return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => {
        return i + 1;
    });
}

export { getDaysOfCurrentMonth }