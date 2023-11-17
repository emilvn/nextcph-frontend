import useProducts from "./hooks/useProducts.ts";
import useSalesUser from "./hooks/useSalesUser.ts";
import {FormEvent, useState} from "react";
import {INewProduct, IProduct} from "./types/products.types.ts";

export function Test({user_id}: {user_id: string}) {
	const channel = "COSMETIC";
	const {
		sales
	} = useSalesUser(channel, user_id);
	const {
		products,
		create:createProduct,
		update:updateProduct,
		destroy:destroyProduct,
		isLoading:productsIsLoading
	} = useProducts(channel);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const newProduct: INewProduct = {
			name: e.currentTarget.productname.value,
			price: Number(e.currentTarget.price.value),
			channel,
			categories: e.currentTarget.categories.value.split(","),
			stock: Number(e.currentTarget.stock.value),
		};
		createProduct(newProduct);
	}

	return (<>
			<div>
				<form action="" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">Name</label>
						<input type="text" name="productname"/>
					</div>
					<div>
						<label htmlFor="price">Price</label>
						<input type="number" name="price"/>
					</div>
					<div>
						<label htmlFor="categories">Categories</label>
						<input type="text" name="categories"/>
					</div>
					<div>
						<label htmlFor="stock">Stock</label>
						<input type="number" name="stock"/>
					</div>
					<button type="submit">Create product</button>
				</form>
			</div>
			<div>
				{!!productsIsLoading && <div>Loading...</div>}
				{!!products && products.map((product) => <Product key={product.id} product={product} update={updateProduct} destroy={destroyProduct}/>)}
			</div>
			<div>
				{!!sales && sales.map((sale) => <div key={sale.id}>{sale.id}</div>)}
			</div>
	</>);
}
interface IProductProps {
	product: IProduct;
	update: (product: IProduct) => void;
	destroy: (product: IProduct) => void;
}
function Product({product, update, destroy}: IProductProps) {
	const [name, setName] = useState(product.name);
	const [price, setPrice] = useState(product.price);

	function handleUpdate() {
		const updatedProduct: IProduct={
			...product,
			name,
			price
		}
		update(updatedProduct);
	}

	function handleDestroy() {
		destroy(product);
	}

	return (<>
			<div>
				<div>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
				</div>
				<div>
					<input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
				</div>
				<div>
					<button onClick={handleUpdate}>Update</button>
					<button onClick={handleDestroy}>Destroy</button>
				</div>
			</div>
	</>);
}