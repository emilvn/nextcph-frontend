import { useEffect, useState } from "react"
import type { ChannelType } from "../types/channel.types.ts"
import { AxiosError } from "axios"
import type { IOverviewData } from "../types/dashboard.types.ts"
import SaleApi from "../utils/SaleApi.ts"
import toast from "react-hot-toast"
import type { ISale } from "../types/sales.types.ts"

function useDashboard(channel: ChannelType) {
    const [overviewData, setOverviewData] = useState<IOverviewData>({
        totalRevenue: 0,
        totalSales: 0,
        averageDailySales: 0,
        averageDailyRevenue: 0,
        categories: []
    })
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())
    const [monthlySales, setMonthlySales] = useState<ISale[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const api = new SaleApi()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const monthlySales = await api.getByMonth(
                    channel,
                    year + "-" + month
                )
                setMonthlySales(monthlySales)
                const data = await api.getDashboardOverviewData(
                    channel,
                    year + "-" + month
                )
                setOverviewData(data)
            } catch (e: unknown) {
                setMonthlySales([])
                if (e instanceof AxiosError) {
                    setOverviewData({
                        totalRevenue: 0,
                        totalSales: 0,
                        averageDailySales: 0,
                        averageDailyRevenue: 0,
                        categories: []
                    })
                    console.error(e.response?.data || e.message)
                    if (e.response?.status !== 404) {
                        toast.error("Der er ingen salg for denne måned")
                    }
                }
            }
        }

        fetchData().then(() => {
            setIsLoading(false)
        })
    }, [month, year])

    return {
        overviewData,
        isLoading,
        monthlySales,
        setMonth,
        setYear,
        month,
        year
    }
}

export default useDashboard;

