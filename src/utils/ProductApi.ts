import Api from "./Api.ts";
import axios from "axios";
import { INewProduct, IProduct } from "../types/products.types.ts";
import { ChannelType } from "../types/channel.types.ts";

class ProductApi extends Api<IProduct, INewProduct> {
    url: string;

    constructor() {
        super();
        this.url = this.endpoint + "/products";
    }

    public async getByChannel(
        channel: ChannelType,
        lowStock?: boolean
    ): Promise<IProduct[]> {
        const lowStockQuery = lowStock ? "&low_stock=true" : "";
        const response = await axios.get(
            this.url + "?channel=" + channel + lowStockQuery
        );
        if (response.status >= 400) {
            throw new Error("Failed to fetch");
        } else if (response.status === 204) {
            return [];
        }
        return response.data;
    }

    public async create(data: INewProduct): Promise<IProduct> {
        const response = await axios.post(this.url, data);
        if (response.status !== 201 || !response.data) {
            throw new Error("Failed to create");
        }
        return response.data;
    }

    public async update(data: INewProduct): Promise<IProduct> {
        const response = await axios.put(this.url + "/" + data.id, data);
        if (response.status !== 200 || !response.data) {
            throw new Error("Failed to update");
        }
        return response.data;
    }

    public async deleteById(id: string): Promise<IProduct> {
        const response = await axios.delete(this.url + "/" + id);
        if (response.status !== 200) {
            throw new Error("Failed to delete");
        }
        return response.data;
    }
}

export default ProductApi;
