import { ChartOptions } from "chart.js";
import type { IOverviewCategory } from "../types/dashboard.types";

function setBarChartData(overviewData: IOverviewCategory[]) {
    const barChartData = {
        labels: overviewData.map((category) => category.name),
        datasets: [
            {
                label: 'Salg pr kategori i %',
                data: overviewData.map((category) => category.percentage),
                backgroundColor: '#F96B4C',
                borderColor: '#010E2B',
                borderWidth: 1,
            },
        ],
    };
    const barChartOptions: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return label + ': ' + value.toFixed(1) + '%';
                    }
                }
            },
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                color: '#010E2B',
                font: {
                    size: 20,
                },
                text: `Søjle Diagram`,
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        if (value) return value.toString() + '%';
                    },
                },
            },
            x: {
                ticks: {
                    color: '#010E2B',
                },
            }
        },
    };

    return { barChartData, barChartOptions };
}

export { setBarChartData }