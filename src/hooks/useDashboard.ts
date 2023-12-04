import { useEffect, useState } from "react";
import type { INewSale, ISale } from "../types/sales.types.ts";
import type { ChannelType } from "../types/channel.types.ts";
import SaleApi from "../utils/SaleApi.ts";

function useDashboard(channel: ChannelType, month?: string) {
    const [sales, setSales] = useState<ISale[]>([]);
    const [monthlySales, setMonthlySales] = useState<ISale[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const api = new SaleApi();

    useEffect(() => {
        async function loadSales() {
            try {
                if (!!month) {
                    const monthlySales = await api.getByMonth(channel, month);
                    setMonthlySales(monthlySales);
                    return;
                }
                const sales = await api.getByChannel(channel);
                setSales(sales);
            }
            catch (e) {
                console.error(e);
            }
        }

        loadSales().then(() => setIsLoading(false));
    }, []);

    const create = async (sale: INewSale) => {
        try {
            const newSale = await api.create(sale);
            const newSales = [...sales, newSale];
            setSales(newSales);
        } catch (e) {
            console.error(e);
        }
    }

    const destroy = async (sale: ISale) => {
        try {
            await api.deleteById(sale.id);
            const index = sales.findIndex((s) => s.id === sale.id);
            sales.splice(index, 1);
            setSales([...sales]);
        } catch (e) {
            console.error(e);
        }
    }

    return { sales, monthlySales, isLoading, create, destroy };
}

export default useDashboard;