import type { ChannelType } from "../../../types/channel.types.ts";
import type { ActionMeta, Options } from "react-select";
import { Dispatch, SetStateAction } from "react";
import type {
    INewProduct,
    IProduct,
    IUpdateProduct
} from "../../../types/products.types.ts";
import { ISortByOption } from "../../../hooks/useProducts.ts";

export type HandleCategoryChange = (
    newValue: Options<{ value: string }>,
    actionMeta: ActionMeta<{ value: string }>
) => void;

interface ICategoryState {
    selectedCategories: string[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    handleCategoryChange: HandleCategoryChange;
}

interface IModalStates {
    isOpenCreate: boolean;
    isOpenUpdate: boolean;
    isOpenDelete: boolean;
    setIsOpenCreate: Dispatch<SetStateAction<boolean>>;
    setIsOpenUpdate: Dispatch<SetStateAction<boolean>>;
    setIsOpenDelete: Dispatch<SetStateAction<boolean>>;
}

interface IProductState {
    products: IProduct[];
    create: (product: INewProduct) => Promise<void>;
    update: (product: IUpdateProduct) => Promise<void>;
    destroy: (product: IProduct) => Promise<void>;
    selectedProduct: IProduct | null;
    setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
    productToDelete: IProduct | null;
    setProductToDelete: Dispatch<SetStateAction<IProduct | null>>;
    setSortBy: Dispatch<SetStateAction<ISortByOption>>;
    sortBy: ISortByOption;
}

interface IModalProps {
    channel: ChannelType;
    categoryState: ICategoryState;
}

interface IProductFormData {
    name: string;
    amount: string;
    price: number;
    stock: number;
    min_stock: number;
    max_stock: number;
    channel: ChannelType;
    categories: string[];
}

export type {
    IProductFormData,
    IModalProps,
    IProductState,
    IModalStates,
    ICategoryState
};
