import { useState, useEffect } from "react"
import LineChart from "./components/LineChart.tsx"
import PageLayout from "../../../components/layout.tsx"
import type { ChannelType } from "../../../types/channel.types.ts"
import MonthPicker from "./components/MonthPicker.tsx"
import useDashboard from "../../../hooks/useDashboard.ts"
import { ISale } from "../../../types/sales.types.ts"
import { BarChart } from "./components/BarChart.tsx"
import Statistics from "./components/Statistics.tsx"
import Loading from "../../../components/loading.tsx"

function Dashboard({ channel }: { channel: ChannelType }) {
    const [currentSales, setCurrentSales] = useState<ISale[]>([])
    const [showStatisticsTable, setShowStatisticsTable] = useState(false)
    const {
        monthlySales,
        overviewData,
        isLoading,
        setMonth,
        setYear,
        month,
        year
    } = useDashboard(channel)

    const monthPickerStates = {
        month,
        year,
        showStatisticsTable,
        setMonth,
        setYear,
        setShowStatisticsTable
    }

    const lineChartComponentData = {
        currentSales,
        isLoading,
        month,
        year,
        channel
    }

    const barChartComponentData = {
        overviewCategories: overviewData.categories,
        isLoading,
        channel
    }

    const statisticsData = {
        overviewData,
        isLoading,
        channel,
        showStatisticsTable,
        setShowStatisticsTable
    }

    useEffect(() => {
        setCurrentSales(monthlySales)
    }, [monthlySales])

    if (
        isLoading ||
        statisticsData.isLoading ||
        barChartComponentData.isLoading ||
        lineChartComponentData.isLoading
    ) {
        return (
            <PageLayout>
                <div className="flex w-full justify-center items-center h-80">
                    <Loading.LoadingSpinner size={60} />
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <div className="bg-next-white">
                <MonthPicker monthPickerStates={monthPickerStates} />
                <Statistics statisticsData={statisticsData} />
                <div className="flex">
                    <div className="w-full">
                        <LineChart
                            lineChartComponentData={lineChartComponentData}
                        />
                    </div>
                    <div className="w-full">
                        <BarChart
                            barChartComponentData={barChartComponentData}
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default Dashboard; 