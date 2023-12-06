import { ChannelType } from "../../../types/channel.types.ts";
import { ISale } from "../../../types/sales.types.ts";
import Loading from "../../../components/loading.tsx";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { monthlySalesDataByDay } from "../../../helpers/setSalesDataByDay.ts";
import { setChartData } from "../../../helpers/setLineChartData.ts";
import { getDaysOfCurrentMonth } from "../../../helpers/getDaysOfCurrentMonth.ts";

interface ILineChartComponentProps {
    lineChartComponentData: {
        currentSales: ISale[];
        isLoading: boolean;
        month: number;
        year: number;
        channel: ChannelType;
    }
}

function LineChart({ lineChartComponentData }: ILineChartComponentProps) {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    if (lineChartComponentData.isLoading) return (<Loading.LoadingPage />);

    const daysOfCurrentMonthArray = getDaysOfCurrentMonth(lineChartComponentData.month, lineChartComponentData.year);
    const monthlyData = monthlySalesDataByDay(lineChartComponentData.currentSales, daysOfCurrentMonthArray);
    const { lineChartData, lineChartOptions } = setChartData(daysOfCurrentMonthArray, monthlyData);

    return (
        <div>
            <Line className="bg-next-white" options={lineChartOptions} data={lineChartData} />
        </div>
    )
}

export default LineChart;