

import {useEffect, useState} from "react";
import type {ChannelType} from "../types/channel.types.ts";
import {AxiosError} from "axios";
import type {IOverviewData} from "../types/dashboard.types.ts";
import SaleApi from "../utils/SaleApi.ts";
import toast from "react-hot-toast";

function useDashboard(channel: ChannelType) {
    const [overviewData, setOverviewData] = useState<IOverviewData|null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const api = new SaleApi();

    
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

    return {overviewData, isLoading,};
}

export default useDashboard;

