import Api from "./Api.ts";
import type {
    INewSale,
    ISale,
    ISaleDataWithPagination
} from "../types/sales.types.ts";
import axios from "axios";
import { ChannelType } from "../types/channel.types.ts";
import type { IOverviewData } from "../types/dashboard.types.ts";

class SaleApi extends Api<ISale, INewSale> {
    url: string;

    constructor() {
        super();
        this.url = this.endpoint + "/sales";
    }

    public async getByChannel(
        channel: ChannelType,
        page: number,
        user_id?: string
    ): Promise<ISaleDataWithPagination> {
        const response = await axios.get(
            `${this.url}?channel=${channel}&page=${page}&pageSize=15${
                user_id ? "&user_id=" + user_id : ""
            }`
        );
        if (response.status >= 400) {
            throw new Error("Failed to fetch");
        } else if (response.status === 204) {
            return {
                data: [],
                pagination: {
                    totalCount: 0,
                    totalPages: 0,
                    currentPage: 0,
                    pageSize: 0
                }
            };
        }
        return response.data;
    }

    public async getByMonth(
        channel: ChannelType,
        month?: string
    ): Promise<ISale[]> {
        const query: string = month
            ? "/month/?channel=" + channel + "&month=" + month
            : "month/?channel=" + channel;
        const response = await axios.get(this.url + query);
        if (response.status >= 400) {
            throw new Error("Failed to fetch");
        } else if (response.status === 204) {
            return [];
        }
        return response.data;
    }

    public async getDashboardOverviewData(
        channel: ChannelType,
        month: string
    ): Promise<IOverviewData> {
        const response = await axios.get(
            this.url + "/statistics?channel=" + channel + "&month=" + month
        );
        if (response.status >= 400 || !response.data) {
            throw new Error("Failed to fetch dashboard overview data");
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
