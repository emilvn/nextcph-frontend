import { ChannelType } from "../types/channel.types";
import { ISale } from "../types/sales.types";
import Loading from "../components/loading";
import { useState, useEffect } from "react";
import useSales from "../hooks/useSales";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { setSalesDataByDay } from "../helpers/setSalesDataByDay.ts";
import { setChartData } from "../helpers/setChartData.ts";

interface ILineChatProps {
    channel: ChannelType;
    month: string;
}

function DashboardLineChartByMonth({ channel, month }: ILineChatProps) {
    const [currentSales, setCurrentSales] = useState<ISale[]>([]);
    const { monthlySales, isLoading } = useSales(channel, month);
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    useEffect(() => {
        setCurrentSales(monthlySales);
    }, [monthlySales]);

    if (isLoading) return (<Loading.LoadingPage />);

    const daysOfCurrentMonthArray = Array.from(Array(new Date(new Date(month).getFullYear(), new Date(month).getMonth() + 1, 0).getDate()).keys()).map((_, index) => index + 1);
    const monthlyData = setSalesDataByDay(currentSales, daysOfCurrentMonthArray);
    const { chartData, chartOptions } = setChartData(daysOfCurrentMonthArray, monthlyData);

    const data = chartData;
    const options = chartOptions;

    return (
        <div>
            <Line className="bg-next-white" options={options} data={data} />
        </div>
    )
}

export default DashboardLineChartByMonth;