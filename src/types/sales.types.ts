import type {ISaleProduct, INewSaleProduct} from "./products.types.ts";

interface INewSale {
	id?: string;
	user_id: string;
	products: INewSaleProduct[];
}

interface ISale {
	id: string;
	user_id: string;
	products: ISaleProduct[];
	createdAt: string;
	updatedAt: string;
}

export type {INewSale, ISale}