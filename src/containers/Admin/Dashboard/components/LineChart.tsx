import { ChannelType } from "../../../../types/channel.types.ts"
import { ISale } from "../../../../types/sales.types.ts"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import { Line } from "react-chartjs-2"
import {
    getDaysOfCurrentMonth,
    monthlySalesDataByDay,
    setChartData
} from "../../../../helpers/dashboard.ts"

interface ILineChartComponentProps {
    lineChartComponentData: {
        currentSales: ISale[]
        isLoading: boolean
        month: number
        year: number
        channel: ChannelType
    }
}

function LineChart({ lineChartComponentData }: ILineChartComponentProps) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    const daysOfCurrentMonthArray = getDaysOfCurrentMonth(
        lineChartComponentData.month,
        lineChartComponentData.year
    )
    const monthlyData = monthlySalesDataByDay(
        lineChartComponentData.currentSales,
        daysOfCurrentMonthArray
    )
    const { lineChartData, lineChartOptions } = setChartData(
        daysOfCurrentMonthArray,
        monthlyData
    )

    return (
        <div>
            <Line
                className="bg-next-white"
                options={lineChartOptions}
                data={lineChartData}
            />
        </div>
    )
}

export default LineChart;