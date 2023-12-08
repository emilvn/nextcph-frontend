import type {IOverviewCategory} from "../types/dashboard.types.ts";
import {ChartOptions} from "chart.js";
import {ISale} from "../types/sales.types.ts";
import {convertToDanishDate} from "./formatting.ts";

function setBarChartData(overviewData: IOverviewCategory[]) {
	const barChartData = {
		labels: overviewData.map((category) => category.name),
		datasets: [
			{
				label: 'Omsætning pr. kategori i %',
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
				text: `Omsætning pr. Kategori`,
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

	return {barChartData, barChartOptions};
}

export {setBarChartData};

function setChartData(daysOfCurrentMonthArray: number[], monthlyData: number[]) {
	const lineChartData = {
		labels: daysOfCurrentMonthArray,
		datasets: [{
			label: 'Omsætning pr. dag i DKK',
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
				text: 'Daglig Omsætning',
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

	return {lineChartData, lineChartOptions};
}

export {setChartData};

function monthlySalesDataByDay(sales: ISale[], daysOfCurrentMonthArray: number[]): number[] {
	return daysOfCurrentMonthArray.map((day) => {
		const salesByDay = sales.filter((sale) => new Date(sale.created_at).getDate() === day);

		return salesByDay.reduce((acc, sale) => {
			const saleTotal = sale.products.reduce((total, product) => {
				return total + (product.product_quantity * product.product.price);
			}, 0);
			return acc + saleTotal;
		}, 0);
	});
}

export {monthlySalesDataByDay};

function groupSalesByDate({sales}: { sales: ISale[] }): { [key: string]: ISale[] } {
	const groupedSales: { [key: string]: ISale[] } = {};

	sales.forEach((sale) => {
		const date = convertToDanishDate(sale.created_at);
		if (!groupedSales[date]) {
			groupedSales[date] = [];
		}
		groupedSales[date].push(sale);
	});

	return groupedSales;
}

export {groupSalesByDate};

function getMonthsArray() {
	return Array.from({length: 12}, (_, i) => {
		const month = new Date(0, i + 1, 0).toLocaleDateString("da-DK", {month: "short"});
		return month.charAt(0).toUpperCase() + month.slice(1);
	});
}

export {getMonthsArray};

function getDaysOfCurrentMonth(month: number, year: number): number[] {
	return Array.from({length: new Date(year, month, 0).getDate()}, (_, i) => {
		return i + 1;
	});
}

export {getDaysOfCurrentMonth};