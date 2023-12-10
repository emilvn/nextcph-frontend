import { useEffect, useState } from "react";
import type { IProduct } from "../types/products.types.ts";
import ProductApi from "../utils/ProductApi.ts";
import type { ChannelType } from "../types/channel.types.ts";

function useLowStockProducts(channel: ChannelType) {
    const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const api = new ProductApi();


    const loadLowStockProducts = () => {
        setIsLoading(true);
        api.getLowStock(channel).then((products) => {
            setLowStockProducts(products);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadLowStockProducts();
    }, []);

    return { lowStockProducts, isLoading };
}

export default useLowStockProducts;

