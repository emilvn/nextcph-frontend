import { useEffect, useState } from "react";
import type { ChannelType } from "../types/channel.types.ts";
import type { IOverviewData } from "../types/dashboard.types.ts";
import SaleApi from "../utils/SaleApi.ts";
import type { ISale } from "../types/sales.types.ts";
import handleError from "../utils/errors.ts";

function useDashboard(channel: ChannelType) {
    const [overviewData, setOverviewData] = useState<IOverviewData>({
        totalRevenue: 0,
        totalSales: 0,
        totalProductsSold: 0,
        averageDailySales: 0,
        averageDailyRevenue: 0,
        categories: []
    });
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthlySales, setMonthlySales] = useState<ISale[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const api = new SaleApi();

    const loadDashboardData = async () => {
        try {
            const monthlySales = await api.getByMonth(
                channel,
                year + "-" + month
            );
            const data = await api.getDashboardOverviewData(
                channel,
                year + "-" + month
            );
            setMonthlySales(monthlySales);
            setOverviewData(data);
        } catch (e: unknown) {
            setMonthlySales([]);
            setOverviewData({
                totalRevenue: 0,
                totalSales: 0,
                totalProductsSold: 0,
                averageDailySales: 0,
                averageDailyRevenue: 0,
                categories: []
            });
            handleError(e, "Kunne ikke hente dashboard data");
        }
    };

    useEffect(() => {
        loadDashboardData().then(() => {
            setIsLoading(false);
        });
    }, [month, year]);

    return {
        overviewData,
        isLoading,
        monthlySales,
        setMonth,
        setYear,
        month,
        year
    };
}

export default useDashboard;
