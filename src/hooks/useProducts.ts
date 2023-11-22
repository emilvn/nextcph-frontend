import {useEffect, useState} from "react";
import type {INewProduct, IProduct, IUpdateProduct} from "../types/products.types.ts";
import ProductApi from "../utils/ProductApi.ts";
import type {ChannelType} from "../types/channel.types.ts";

function useProducts(channel: ChannelType) {
    const [products, setProducts] = useState<IProduct[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const api = new ProductApi();

    useEffect(() => {
        api.getByChannel(channel).then((products) => {
            setProducts(products);
            setIsLoading(false);
        }).catch((e) => {
            console.error(e);
        });
    }, []);

    const create = async (product: INewProduct) => {
        try {
            const newProduct = await api.create(product);
            const newProducts = [...products, newProduct];
            setProducts(newProducts);
        } catch (e) {
            console.error(e);
        }
    }

    const update = async (product: IUpdateProduct) => {
        try {
            const updatedProduct = await api.update(product);
            const index = products.findIndex((p) => p.id === updatedProduct.id);
            products[index] = updatedProduct;
            setProducts([...products]);
        } catch (e) {
            console.error(e);
        }
    }

    const destroy = async (product: IProduct) => {
        try {
            await api.deleteById(product.id);
            const index = products.findIndex((p) => p.id === product.id);
            products.splice(index, 1);
            setProducts([...products]);
        } catch (e) {
            console.error(e);
        }
    }

    return {products, isLoading, create, update, destroy};
}

export default useProducts;

