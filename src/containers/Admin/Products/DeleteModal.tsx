import type {IProduct} from "../../../types/products.types.ts";
import type {Dispatch, SetStateAction} from "react";
import type {INewProduct, IUpdateProduct} from "../../../types/products.types.ts";
import {FaCheck} from "react-icons/fa";
import {IoCloseSharp} from "react-icons/io5";
import Modal from "../../../components/Modal.tsx";
import toast from "react-hot-toast";

interface IDeleteModalProps {
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
	setIsOpenDelete: Dispatch<SetStateAction<boolean>>;
}

function DeleteModal(props: IDeleteModalProps) {
	const {productState, setIsOpenDelete} = props;
	const closeDeleteConfirmation = () => {
		productState.setProductToDelete(null);
		setIsOpenDelete(false);
	};
	const confirmDelete = async () => {
		if (productState.productToDelete) {
			await productState.destroy(productState.productToDelete);
			closeDeleteConfirmation();
			toast.success('Produktet er slettet')
		} else {
			toast.error('Fejl ved sletning af produkt')
		}
	};

	return (
		<Modal>
			<h3 className="mb-4">Er du sikker på, at du vil slette dette produkt?</h3>
			<div className="flex justify-around mt-10">
				<button
					className="bg-next-darker-orange text-next-blue py-2 px-4 rounded hover:bg-next-blue hover:text-next-orange"
					onClick={confirmDelete}
				>
					<FaCheck size={25}/>
				</button>
				<button
					className="bg-next-blue text-next-orange py-2 px-4 rounded hover:bg-next-darker-orange hover:text-next-blue ml-4"
					onClick={() => closeDeleteConfirmation()}
				>
					<IoCloseSharp size={25}/>
				</button>
			</div>
		</Modal>
	);
}

export default DeleteModal;
export type {IDeleteModalProps};