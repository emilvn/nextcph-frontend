import { useEffect, useState } from "react";
import type { ISale } from "../types/sales.types.ts";
import type { ChannelType } from "../types/channel.types.ts";
import SaleApi from "../utils/SaleApi.ts";

function useDashboard(channel: ChannelType) {
    const [monthlySales, setMonthlySales] = useState<ISale[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const api = new SaleApi();

    useEffect(() => {
        async function loadSales() {
            try {
                const monthlySales = await api.getByMonth(channel, year + "-" + month);
                setMonthlySales(monthlySales);
                return;
            }
            catch (e: unknown) {
                setMonthlySales([]);
            }
        }

        loadSales().then(() => setIsLoading(false));
    }, [month, year]);

    return { monthlySales, isLoading, setMonth, setYear, month, year };
}

export default useDashboard;