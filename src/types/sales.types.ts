import type { INewSaleProduct, ISaleProduct } from "./products.types.ts";

interface INewSale {
    id?: string;
    user_id: string;
    products: INewSaleProduct[];
}

interface ISale {
    id: string;
    user_id: string;
    products: ISaleProduct[];
    created_at: string;
    updated_at: string;
}

export type { INewSale, ISale };
