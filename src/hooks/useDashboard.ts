import {useEffect, useState} from "react";
import type {ChannelType} from "../types/channel.types.ts";
import {AxiosError} from "axios";
import type {IOverviewData} from "../types/dashboard.types.ts";
import SaleApi from "../utils/SaleApi.ts";
import toast from "react-hot-toast";
import type {ISale} from "../types/sales.types.ts";

function useDashboard(channel: ChannelType) {
    const [overviewData, setOverviewData] = useState<IOverviewData|null>(null);
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [year, setYear] = useState(new Date().getFullYear());
	const [monthlySales, setMonthlySales] = useState<ISale[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

	useEffect(() =>{
		const getDashboardOverviewData = async () => {
			try {
				const data = await api.getDashboardOverviewData(channel);
				setOverviewData(data);
			} catch (e: unknown) {
					if(e instanceof AxiosError){
						console.error(e.response?.data || e.message);
					}
					toast.error("Kunne ikke hente dashboard overview data");
				}
		};
		getDashboardOverviewData().then(() => setIsLoading(false));
	}, [])

    return {overviewData, isLoading, monthlySales, setMonth, setYear, month, year };
}

export default useDashboard;

