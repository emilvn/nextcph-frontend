function setChartData(daysOfCurrentMonthArray: number[], monthlyData: number[]) {
    const lineChartData = {
        labels: daysOfCurrentMonthArray,
        datasets: [{
            label: 'Salg pr dag i DKK',
            data: monthlyData,
            fill: false,
            borderColor: '#010E2B',
            tension: 0.1,
            backgroundColor: '#F96B4C',
        }]
    };
    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                color: '#010E2B',
                text: 'Linje Diagram',
                font: {
                    size: 20,
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: '#010E2B',
                },
            },
            x: {
                ticks: {
                    color: '#010E2B',
                },
            }
        }
    };

    return { lineChartData, lineChartOptions };
}

export { setChartData }