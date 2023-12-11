import { useEffect, useState } from "react";
import type { INewProduct, IProduct } from "../types/products.types.ts";
import ProductApi from "../utils/ProductApi.ts";
import type { ChannelType } from "../types/channel.types.ts";
import toast from "react-hot-toast";
import handleError from "../utils/errors.ts";

enum SortBy {
    name = "name",
    amount = "amount",
    price = "price",
    stock = "stock",
    min_stock = "min_stock",
    max_stock = "max_stock",
    category = "category"
}

interface ISortByOption {
    value: SortBy;
    ascending: boolean;
}

function sortProducts(products: IProduct[], sortBy: ISortByOption) {
    const { value, ascending } = sortBy;
    return products.sort((a, b) => {
        switch (value) {
            case SortBy.name:
                return ascending
                    ? a[value].localeCompare(b.name)
                    : b[value].localeCompare(a.name);
            case SortBy.amount:
                return ascending
                    ? a.name
                          .split(",")[1]
                          .trim()
                          .localeCompare(b.name.split(",")[0].trim())
                    : b.name
                          .split(",")[1]
                          .trim()
                          .localeCompare(a.name.split(",")[0].trim());
            case SortBy.price:
            case SortBy.stock:
            case SortBy.min_stock:
            case SortBy.max_stock:
                return ascending ? a[value] - b[value] : b[value] - a[value];
            case SortBy.category:
                return ascending
                    ? a.categories[0].category.name.localeCompare(
                          b.categories[0].category.name
                      )
                    : b.categories[0].category.name.localeCompare(
                          a.categories[0].category.name
                      );
        }
    });
}

function useProducts(channel: ChannelType) {
    const [products, setProducts] = useState<IProduct[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState<ISortByOption>({
        value: SortBy.name,
        ascending: true
    });

    const api = new ProductApi();

    const loadProducts = () => {
        setIsLoading(true);
        api.getByChannel(channel)
            .then((products) => {
                sortProducts(products, sortBy);
                setProducts(products);
                setIsLoading(false);
            })
            .catch((e: unknown) => {
                handleError(e, "Kunne ikke hente produkter");
            });
    };

    useEffect(() => {
        loadProducts();
    }, [channel]);

    useEffect(() => {
        setProducts([...sortProducts(products, sortBy)]);
    }, [sortBy]);

    const create = async (product: INewProduct) => {
        try {
            const newProduct = await api.create(product);
            const newProducts = [...products, newProduct];
            setProducts(newProducts);
            toast.success("Produktet er oprettet");
        } catch (e: unknown) {
            handleError(e, "Kunne ikke oprette produkt");
        }
    };

    const update = async (product: INewProduct) => {
        try {
            const updatedProduct = await api.update(product);
            const index = products.findIndex((p) => p.id === updatedProduct.id);
            products[index] = updatedProduct;
            setProducts([...products]);
            toast.success("Produktet er opdateret");
        } catch (e: unknown) {
            handleError(e, "Kunne ikke opdatere produkt");
        }
    };

    const destroy = async (product: IProduct) => {
        try {
            await api.deleteById(product.id);
            const index = products.findIndex((p) => p.id === product.id);
            products.splice(index, 1);
            setProducts([...products]);
            toast.success("Produktet er slettet");
        } catch (e: unknown) {
            handleError(e, "Kunne ikke slette produkt");
        }
    };

    return {
        products,
        loadProducts,
        isLoading,
        create,
        update,
        destroy,
        setSortBy,
        sortBy
    };
}

export default useProducts;
export { type ISortByOption, SortBy };
