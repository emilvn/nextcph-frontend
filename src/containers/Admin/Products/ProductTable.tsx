import type {INewProduct, IProduct, IUpdateProduct} from "../../../types/products.types.ts";
import type {Dispatch, SetStateAction} from "react";
import {formatPrice} from "../../../helpers/formatting.ts";

function ProductTableHeader() {
	return (
		<thead className="text-3xl">
		<tr>
			<th className="text-left p-2">Navn</th>
			<th className="text-left p-2">Mængde</th>
			<th className="text-left p-2">Pris</th>
			<th className="text-left p-2">Lager</th>
			<th className="text-left p-2">Min. Lager</th>
			<th className="text-left p-2">Max. Lager</th>
			<th className="text-left p-2">Kategori</th>
			<th></th>
			<th></th>
		</tr>
		</thead>
	)
}

interface IProductRowProps {
	product: IProduct;
	handleEdit: (product: IProduct) => void;
	handleDelete: (product: IProduct) => void;
}

function ProductRow(props: IProductRowProps) {
	const {product, handleEdit, handleDelete} = props;
	const productNameArr = product.name.split(", ");
	const productName = productNameArr[0];
	const productAmount = productNameArr[1];

	return (
		<tr key={product.id} className="border-b text-xl text-next-blue">
			<td className="p-4">{productName}</td>
			<td className="p-4">{productAmount ? productAmount : '1 stk'}</td>
			<td className="p-4">{formatPrice(product.price)}</td>
			<td className="p-4 text-center">{product.stock}</td>
			<td className="p-4 text-center">{product.min_stock}</td>
			<td className="p-4 text-center">{product.max_stock}</td>
			<td className="p-4">
				<ul>
					{product.categories.map((category) => (
						<li key={category.category.id}>{category.category.name}</li>
					))}
				</ul>
			</td>
			<td>
				<button
					className="btn-white w-24"
					onClick={() => handleEdit(product)}
				>
					Rediger
				</button>
			</td>
			<td>
				<button
					className="btn-white w-24"
					onClick={() => handleDelete(product)}
				>
					Slet
				</button>
			</td>
		</tr>
	);
}

interface IProductTableProps {
	productState: {
		products: IProduct[];
		create: (product: INewProduct) => Promise<void>;
		update: (product: IUpdateProduct) => Promise<void>;
		destroy: (product: IProduct) => Promise<void>;
		selectedProduct: IProduct | null;
		setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
		productToDelete: IProduct | null;
		setProductToDelete: Dispatch<SetStateAction<IProduct | null>>;
	};
	modalStates: {
		isOpenCreate: boolean;
		isOpenUpdate: boolean;
		isOpenDelete: boolean;
		setIsOpenCreate: Dispatch<SetStateAction<boolean>>;
		setIsOpenUpdate: Dispatch<SetStateAction<boolean>>;
		setIsOpenDelete: Dispatch<SetStateAction<boolean>>;
	};
	setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}

function ProductTable(props: IProductTableProps) {
	const {modalStates, productState, setSelectedCategories} = props;
	const handleEdit = (product: IProduct) => {
		productState.setSelectedProduct(product);
		setSelectedCategories(product.categories.map(category => category.category.name));
		modalStates.setIsOpenUpdate(true);
	};
	const openDeleteConfirmation = (product: IProduct) => {
		productState.setProductToDelete(product);
		modalStates.setIsOpenDelete(true);
	};

	const handleDelete = (product: IProduct) => {
		openDeleteConfirmation(product);
	};


	return (
		<table className="w-full">
			<ProductTableHeader/>
			<tbody>
			{productState.products && productState.products.map((product) => (
				<ProductRow
					key={product.id}
					product={product}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			))}

			</tbody>
		</table>
	)
}

export default ProductTable;