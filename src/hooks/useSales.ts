import { useEffect, useState } from "react";
import type { INewSale, ISale } from "../types/sales.types.ts";
import type { ChannelType } from "../types/channel.types.ts";
import SaleApi from "../utils/SaleApi.ts";
import toast from "react-hot-toast";
import handleError from "../utils/errors.ts";

function useSales(channel: ChannelType) {
    const [sales, setSales] = useState<ISale[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [hasMore, setHasMore] = useState(true);

    const api = new SaleApi();

	const loadSales = async () => {
		try {
			const newSalesData = await api.getByChannel(channel, page, userId);
			const newSales = newSalesData.data;
			const uniqueSaleIds = new Set(sales.map(s => s.id));
			const uniqueNewSales = newSales.filter(s => !uniqueSaleIds.has(s.id));
			setSales([...sales, ...uniqueNewSales]);
			if (newSalesData.pagination.totalPages === page) {
				setHasMore(false);
			}
		}
		catch (e: unknown) {
            handleError(e, "Kunne ikke hente salg");
		}
	}

	useEffect(() => {
		loadSales().then(() => setIsLoading(false));
	}, [page, userId]);

    const create = async (sale: INewSale) => {
        try {
            const newSale = await api.create(sale);
            const newSales = [...sales, newSale];
            setSales(newSales);
            toast.success("Salg oprettet");
        } catch (e: unknown) {
            handleError(e, "Kunne ikke oprette salg");
        }
    };

    const destroy = async (sale: ISale) => {
        try {
            await api.deleteById(sale.id);
            const index = sales.findIndex((s) => s.id === sale.id);
            sales.splice(index, 1);
            setSales([...sales]);
        } catch (e) {
            handleError(e, "Kunne ikke slette salg");
        }
    };

    return {
        sales,
        isLoading,
        create,
        destroy,
        setPage,
        hasMore,
        setUserId,
        userId
    };
}

export default useSales;
