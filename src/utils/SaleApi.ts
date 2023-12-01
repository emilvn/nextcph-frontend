import Api from "./Api.ts";
import type { INewSale, ISale } from "../types/sales.types.ts";
import axios from "axios";
import { ChannelType } from "../types/channel.types.ts";

class SaleApi extends Api<ISale, INewSale> {
	url: string;
	constructor() {
		super();
		this.url = this.endpoint + "/sales";
	}
	public async getByChannel(channel: ChannelType): Promise<ISale[]> {
		const response = await axios.get(this.url + "?channel=" + channel);
		if (response.status !== 200 || !response.data) {
			throw new Error("Failed to fetch");
		}
		return response.data;
	}

	public async getByMonth(channel: ChannelType, month: string): Promise<ISale[]> {
		const response = await axios.get(this.url + "?channel=" + channel);
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

	public async getByUserId(user_id: string, channel: ChannelType): Promise<ISale[]> {
		const response = await axios.get(this.url + "?user_id=" + user_id + "&channel=" + channel);
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
}
export default SaleApi;