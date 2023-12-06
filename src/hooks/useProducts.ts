import {useEffect, useState} from "react";
import type {INewProduct, IProduct, IUpdateProduct} from "../types/products.types.ts";
import ProductApi from "../utils/ProductApi.ts";
import type {ChannelType} from "../types/channel.types.ts";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

function useProducts(channel: ChannelType) {
    const [products, setProducts] = useState<IProduct[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const api = new ProductApi();


    const loadProducts = () => {
        setIsLoading(true);
        api.getByChannel(channel).then((products) => {
            setProducts(products);
            setIsLoading(false);
        }).catch((e:unknown) => {
            if(e instanceof AxiosError) console.error(e.response?.data || e.message);
            toast.error("Kunne ikke hente produkter");
        });
    }

    useEffect(() => {
        loadProducts();
    }, []);

    const create = async (product: INewProduct) => {
        try {
            const newProduct = await api.create(product);
            const newProducts = [...products, newProduct];
            setProducts(newProducts);
        } catch (e:unknown) {
            if(e instanceof AxiosError) console.error(e.response?.data || e.message);
            toast.error("Kunne ikke oprette produkt");
        }
    }

    const update = async (product: IUpdateProduct) => {
        try {
            const updatedProduct = await api.update(product);
            const index = products.findIndex((p) => p.id === updatedProduct.id);
            products[index] = updatedProduct;
            setProducts([...products]);
        } catch (e:unknown) {
            if(e instanceof AxiosError) console.error(e.response?.data || e.message);
            toast.error("Kunne ikke opdatere produkt");
        }
    }

    const destroy = async (product: IProduct) => {
        try {
            await api.deleteById(product.id);
            const index = products.findIndex((p) => p.id === product.id);
            products.splice(index, 1);
            setProducts([...products]);
        } catch (e:unknown) {
            if(e instanceof AxiosError) console.error(e.response?.data || e.message);
            toast.error("Kunne ikke slette produkt");
        }
    }

    return {products, loadProducts, isLoading, create, update, destroy};
}

export default useProducts;

