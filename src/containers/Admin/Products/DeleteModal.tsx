import type {IProduct} from "../../../types/products.types.ts";
import type {Dispatch, SetStateAction} from "react";
import type {INewProduct, IUpdateProduct} from "../../../types/products.types.ts";
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
			void productState.destroy(productState.productToDelete);
			closeDeleteConfirmation();
			toast.success('Produktet er slettet');
		} else {
			toast.error('Fejl ved sletning af produkt');
		}
	};

	return (
		<Modal>
			<h3 className="text-next-blue text-xl font-semibold">Er du sikker på, at du vil slette dette produkt?</h3>
			<div className="flex justify-around mt-10">
				<button
					//erstat hele denne style med btn-orange, pånær py-2 px-4
					className="bg-next-darker-orange text-next-blue border-[1.5px] border-next-blue hover:bg-next-blue hover:text-next-darker-orange transition-colors font-semibold py-2 px-4"
					onClick={confirmDelete}
				>
					JA, SLET
				</button>
				<button
					//erstat hele denne style med btn-blue
					className="bg-next-blue text-next-darker-orange border-[1.5px] border-next-darker-orange hover:bg-next-darker-orange hover:text-next-blue transition-colors font-semibold py-2 px-4"
					onClick={() => closeDeleteConfirmation()}
				>
					NEJ, ANNULLÉR
				</button>
			</div>
		</Modal>
	);
}

export default DeleteModal;
export type {IDeleteModalProps};