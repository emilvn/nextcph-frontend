import { ChannelType } from "../types/channel.types";
import { ISale } from "../types/sales.types";
import Loading from "../components/loading";
import { useState, useEffect } from "react";
import useSales from "../hooks/useSales";
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


function setSalesDataByDay(sales: ISale[], daysOfCurrentMonthArray: number[]) {
    const salesByDay = daysOfCurrentMonthArray.map((day) => {
        const salesByDay = sales.filter((sale) => new Date(sale.created_at).getDate() === day);

        const totalPrice = salesByDay.reduce((acc, sale) => {
            const saleTotal = sale.products.reduce((total, product) => {
                return total + (product.product_quantity * product.product.price);
            }, 0);
            return acc + saleTotal;
        }, 0);
        return totalPrice;
    });
    return salesByDay;

}

function DashboardLineChartByMonth({ channel }: { channel: ChannelType }) {
    const month = "2023-12-01";
    const { monthlySales, isLoading } = useSales(channel, month);

    const [currentSales, setCurrentSales] = useState<ISale[]>([]);
    useEffect(() => {
        setCurrentSales(monthlySales);
    }, [monthlySales]);

    if (isLoading) return (<Loading.LoadingPage />);

    const daysOfCurrentMonthArray = Array.from(Array(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).keys()).map((_, index) => index + 1);
    const monthlyData = setSalesDataByDay(currentSales, daysOfCurrentMonthArray);
    const data = {
        labels: daysOfCurrentMonthArray,
        datasets: [{
            label: 'Sales by day',
            data: monthlyData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }]
    };
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
    );

    const options = {
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
            },

        },
    };

    return (
        <div>
            <Line className="mx-96" options={options} data={data} />
        </div>
    )
}

export default DashboardLineChartByMonth;