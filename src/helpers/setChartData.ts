function setChartData(daysOfCurrentMonthArray: number[], monthlyData: number[]) {
    const chartData = {
        labels: daysOfCurrentMonthArray,
        datasets: [{
            label: 'Sales by day',
            data: monthlyData,
            fill: false,
            borderColor: '#010E2B',
            tension: 0.1,
            backgroundColor: '#F96B4C',
        }]
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Monthly Sales',
                font: {
                    size: 20,
                }
            }
        },
    };
    return { chartData, chartOptions, daysOfCurrentMonthArray };
}

export { setChartData }