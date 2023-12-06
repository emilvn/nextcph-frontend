import Api from "./Api.ts";
import type { INewSale, ISale } from "../types/sales.types.ts";
import axios from "axios";
import { ChannelType } from "../types/channel.types.ts";
import type { IOverviewData, ICategoryNames } from "../types/dashboard.types.ts";

interface ISaleDataWithPagination {
	data: ISale[];
	pagination: {
		totalCount: number,
		totalPages: number,
		currentPage: number,
		pageSize: number
	}
}

class SaleApi extends Api<ISale, INewSale> {
	url: string;
	constructor() {
		super();
		this.url = this.endpoint + "/sales";
	}
	public async getByChannel(channel: ChannelType, page: number, user_id?: string): Promise<ISaleDataWithPagination> {
		const response = await axios.get(`${this.url}?channel=${channel}&page=${page}&pageSize=15${user_id ? "&user_id=" + user_id : ""}`);
		if (response.status !== 200 || !response.data) {
			throw new Error("Failed to fetch");
		}
		return response.data;
	}

	public async getByMonth(channel: ChannelType, month?: string): Promise<ISale[]> {
		const query: string = month ? "/month/?channel=" + channel + "&month=" + month : "month/?channel=" + channel;
		const response = await axios.get(this.url + query);
		console.log(response);
		if (response.status !== 200 || !response.data) {
			throw new Error("Failed to fetch");
		}
		return response.data;
	}

	public async getById(id: string): Promise<ISale> {
		const response = await axios.get(this.url + "/" + id);
		if (response.status !== 200 || !response.data) {
			throw new Error("Failed to fetch");
		}
		return response.data;
	}

	public async create(data: INewSale): Promise<ISale> {
		const response = await axios.post(this.url, data);
		if (response.status !== 201 || !response.data) {
			throw new Error("Failed to create");
		}
		return response.data;
	}

	public async deleteById(id: string): Promise<ISale> {
		const response = await axios.delete(this.url + "/" + id);
		if (response.status !== 200) {
			throw new Error("Failed to delete");
		}
		return response.data;
	}

	public async getDashboardOverviewData(channel: ChannelType, month: string): Promise<IOverviewData> {
		const response = await axios.get(this.url + "/statistics?channel=" + channel + "&month=" + month);
		if (response.status !== 200 || !response.data) {
			throw new Error("Failed to fetch dashboard overview data");
		}
		return response.data;
	}

	public async getCategoryNames(channel: ChannelType): Promise<ICategoryNames[]> {
		const response = await axios.get(this.url + "/categories?channel=" + channel);
		if (response.status !== 200 || !response.data) {
			throw new Error("Failed to fetch category names");
		}
		return response.data;
	}

}
export default SaleApi;