import { ChannelType } from "../types/channel.types";
import { ISale } from "../types/sales.types";
import Loading from "../components/loading";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { monthlySalesDataByDay } from "../helpers/setSalesDataByDay.ts";
import { setChartData } from "../helpers/setChartData.ts";
import { getDaysOfCurrentMonth } from "../helpers/getDaysOfCurrentMonth.ts";

interface ILineChatProps {
    lineChartData: {
        currentSales: ISale[];
        isLoading: boolean;
        month: number;
        year: number;
        channel: ChannelType;
    }
}

function DashboardLineChartByMonth({ lineChartData }: ILineChatProps) {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    if (lineChartData.isLoading) return (<Loading.LoadingPage />);

    const daysOfCurrentMonthArray = getDaysOfCurrentMonth(lineChartData.month, lineChartData.year);
    const monthlyData = monthlySalesDataByDay(lineChartData.currentSales, daysOfCurrentMonthArray);
    const { chartData, chartOptions } = setChartData(daysOfCurrentMonthArray, monthlyData);

    return (
        <div>
            <Line className="bg-next-white p-20" options={chartOptions} data={chartData} />
        </div>
    )
}

export default DashboardLineChartByMonth;