import {useEffect, useState} from "react";
import type {INewProduct, IProduct, IUpdateProduct} from "../types/products.types.ts";
import ProductApi from "../utils/ProductApi.ts";
import type {ChannelType} from "../types/channel.types.ts";

function useProducts(channel:ChannelType){
	const [products, setProducts] = useState<IProduct[]>([]);

	const [isLoading, setIsLoading] = useState(true);

	const api = new ProductApi();

	useEffect(() => {
		async function loadProducts() {
			try{
				const products = await api.getByChannel(channel);
				setProducts(products);
			}
			catch (e) {
				console.error(e);
			}
		}

		loadProducts().then(() => setIsLoading(false));
	});

	const create = async (product:INewProduct) => {
		try{
			const newProduct = await api.create(product);
			const newProducts = [...products, newProduct];
			setProducts(newProducts);
		}catch(e){
			console.error(e);
		}
	}

	const update = async (product:IUpdateProduct) => {
		try{
			const updatedProduct = await api.updateById(product);
			const index = products.findIndex((p) => p.id === updatedProduct.id);
			products[index] = updatedProduct;
			setProducts([...products]);
		} catch(e){
			console.error(e);
		}
	}

	const destroy = async (product:IProduct) => {
		try{
			await api.deleteById(product.id);
			const index = products.findIndex((p) => p.id === product.id);
			products.splice(index, 1);
			setProducts([...products]);
		} catch(e){
			console.error(e);
		}
	}

	return {products, isLoading, create, update, destroy};
}

export default useProducts;