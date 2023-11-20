import {useEffect, useState} from "react";
import type {INewSale, ISale} from "../types/sales.types.ts";
import type {ChannelType} from "../types/channel.types.ts";
import SaleApi from "../utils/SaleApi.ts";

function useSalesUser(channel:ChannelType, user_id:string){
	const [sales, setSales] = useState<ISale[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const api = new SaleApi();

	useEffect(() => {
		async function loadSales() {
			try{
				const sales = await api.getByUserId(user_id, channel);
				setSales(sales);
			}
			catch (e) {
				console.error(e);
			}
		}

		loadSales().then(() => setIsLoading(false));
	}, []);

	const create = async (sale:INewSale) => {
		try{
			const newSale = await api.create(sale);
			const newSales = [...sales, newSale];
			setSales(newSales);
		}catch(e){
			console.error(e);
		}
	}

	return {sales, isLoading, create};
}

export default useSalesUser;