import type { ChannelType } from "./channel.types.ts";
import type { ICategory } from "./categories.types.ts";

interface IProduct {
    id: string;
    name: string;
    price: number;
    stock: number;
    min_stock: number;
    max_stock: number;
    channel: ChannelType;
    categories: ICategory[];
    createdAt: string;
    updatedAt: string;
}

interface INewProduct {
    id?: string;
    name: string;
    price: number;
    stock: number;
    min_stock: number;
    max_stock: number;
    channel: ChannelType;
    categories: string[];
}

export interface INewSaleProduct {
    name?: string;
    price: number;
    stock: number;
    id: string;
    quantity: number;
    channel: ChannelType;
}

interface ISaleProduct {
    product: IProduct;
    product_quantity: number;
}

export type { ISaleProduct, INewProduct, IProduct };
