import {useEffect, useState} from "react";
import type {INewSale, ISale} from "../types/sales.types.ts";
import type {ChannelType} from "../types/channel.types.ts";
import SaleApi from "../utils/SaleApi.ts";

function useSalesAdmin(channel:ChannelType){
	const [sales, setSales] = useState<ISale[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const api = new SaleApi();

	useEffect(() => {
		async function loadSales() {
			try{
				const sales = await api.getByChannel(channel);
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

	const destroy = async (sale:ISale) => {
		try{
			await api.deleteById(sale.id);
			const index = sales.findIndex((s) => s.id === sale.id);
			sales.splice(index, 1);
			setSales([...sales]);
		} catch(e){
			console.error(e);
		}
	}

	return {sales, isLoading, create, destroy};
}

export default useSalesAdmin;