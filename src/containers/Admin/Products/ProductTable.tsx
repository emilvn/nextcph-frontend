import {IProduct} from "../../../types/products.types.ts";
import {Dispatch, SetStateAction} from "react";
import {ChannelType} from "../../../types/channel.types.ts";

function ProductTableHeader() {
	return (
		<thead className="text-3xl">
		<tr>
			<th className="text-left p-2">Navn</th>
			<th className="text-left p-2">Mængde</th>
			<th className="text-left p-2">Pris</th>
			<th className="text-left p-2">Lager</th>
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
	return (
		<tr key={product.id} className="border-b text-xl text-next-blue">
			<td className="p-4">{product.name ? product.name.split(", ")[0] : 'N/A'}</td>
			<td className="p-4">{product.name && product.name.split(", ")[1] ? product.name.split(", ")[1].trim() : 'N/A'}</td>
			<td className="p-4">{product.price}</td>
			<td className="p-4">{product.stock}</td>
			<td className="p-4">
				<ul>
					{product.categories.map((category) => (
						<li key={category.category.id}>{category.category.name}</li>
					))}
				</ul>
			</td>
			<td>
				<button
					//erstat hele denne style med btn-white, på nær w-24
					className="bg-next-white font-bold text-next-blue p-2 border-[1.5px] border-next-blue hover:bg-next-blue hover:text-next-white transition-colors w-24"
					onClick={() => handleEdit(product)}
				>
					Rediger
				</button>
			</td>
			<td>
				<button
					//erstat hele denne style med btn-white, på nær w-24
					className="bg-next-white font-bold text-next-blue p-2 border-[1.5px] border-next-blue hover:bg-next-blue hover:text-next-white transition-colors w-24"
					onClick={() => handleDelete(product)}
				>
					Slet
				</button>
			</td>
		</tr>
	);
}

interface IProductTableProps {
	products: IProduct[];
	setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
	channel: ChannelType;
	setSelectedCategories: Dispatch<SetStateAction<string[]>>;
	setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
	setProductToDelete: Dispatch<SetStateAction<IProduct | null>>;
	setShowDeleteConfirmation: Dispatch<SetStateAction<boolean>>;
}

function ProductTable(props: IProductTableProps) {
	const handleEdit = (product: IProduct) => {
		props.setSelectedProduct(product);
		props.setSelectedCategories(product.categories.map(category => category.category.name));
		props.setShowUpdateModal(true);
	};

	const handleDelete = (product: IProduct) => {
		openDeleteConfirmation(product);
	};

	const openDeleteConfirmation = (product: IProduct) => {
		props.setProductToDelete(product);
		props.setShowDeleteConfirmation(true);
	};

	return (
		<table className="w-full">
			<ProductTableHeader/>
			<tbody>
			{props.products && props.products.map((product) => (
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