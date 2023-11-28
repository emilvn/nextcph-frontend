import {INewProduct, IProduct, IUpdateProduct} from "../../../types/products.types.ts";
import {Dispatch, SetStateAction} from "react";
import ProductForm, {IProductFormData} from "./ProductForm.tsx";
import Modal from "../../../components/Modal.tsx";
import type {IModalProps} from "./CreateModal.tsx";

interface IUpdateModalProps extends IModalProps {
	productState: {
		products: IProduct[];
		create: (product: INewProduct) => Promise<void>;
		update: (product: IUpdateProduct) => Promise<void>;
		destroy: (product: IProduct) => Promise<void>;
		selectedProduct: IProduct | null;
		setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
		productToDelete: IProduct | null;
		setProductToDelete: Dispatch<SetStateAction<IProduct | null>>;
	}
	setIsOpenUpdate: Dispatch<SetStateAction<boolean>>;
}

function UpdateModal(props: IUpdateModalProps) {
	const {productState, categoryState, channel, notifiers, setIsOpenUpdate} = props;
	const handleUpdate = async (data: IProductFormData): Promise<void> => {
		if(!productState.selectedProduct) return;
		const updatedProduct: IUpdateProduct = {
			id: productState.selectedProduct.id,
			name: `${data.name || ''}, ${data.amount || ''}`,
			price: Number(data.price) || 0,
			stock: Number(data.stock) || 0,
			channel: channel
		};
		void productState.update(updatedProduct);
		setIsOpenUpdate(false);
		categoryState.setSelectedCategories([]);
		productState.setSelectedProduct(null);
		notifiers.notifySuccess('Produktet er redigeret')
	};

	return (
		<Modal>
			<ProductForm
				setSelectedCategories={categoryState.setSelectedCategories}
				title={"Redigér Produkt"}
				handleCategoryChange={categoryState.handleCategoryChange}
				onSubmit={handleUpdate}
				products={productState.products}
				selectedProduct={productState.selectedProduct}
				selectedCategories={categoryState.selectedCategories}
				setModal={setIsOpenUpdate}
			/>
		</Modal>
	);
}

export default UpdateModal;
export type {IUpdateModalProps};