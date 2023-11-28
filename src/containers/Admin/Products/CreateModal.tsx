import type {Dispatch, SetStateAction} from "react";
import type {INewProduct, IProduct} from "../../../types/products.types.ts";
import ProductForm, {type IProductFormData} from "./ProductForm.tsx";
import Modal from "../../../components/Modal.tsx";
import type {ChannelType} from "../../../types/channel.types.ts";
import type {ActionMeta, Options} from "react-select";

interface IModalProps {
	channel: ChannelType;
	categoryState: {
		selectedCategories: string[];
		setSelectedCategories: Dispatch<SetStateAction<string[]>>;
		handleCategoryChange: (newValue: Options<{ value: string }>, actionMeta: ActionMeta<{ value: string }>) => void;
	};
	notifiers: {
		notifySuccess: (message: string) => string;
		notifyError: (message: string) => string;
	};
}

interface ICreateModalProps extends IModalProps {
	setIsOpenCreate: Dispatch<SetStateAction<boolean>>;
	create: (product: INewProduct) => Promise<void>;
	products: IProduct[];
}

function CreateModal(props: ICreateModalProps) {
	const {categoryState, notifiers, create, setIsOpenCreate, channel, products} = props;
	const handleSubmit = async (data: IProductFormData): Promise<void> => {
		const newProduct: INewProduct = {
			name: `${data.name || ''}, ${data.amount || ''}`,
			price: Number(data.price) || 0,
			stock: Number(data.stock) || 0,
			channel: channel,
			categories: data.categories
		}
		void create(newProduct);
		props.setIsOpenCreate(false);
		notifiers.notifySuccess('Produkt oprettet');
		categoryState.setSelectedCategories([]);
	}

	return (
		<Modal>
			<ProductForm
				setSelectedCategories={categoryState.setSelectedCategories}
				title={"Tilføj Produkt"}
				selectedCategories={categoryState.selectedCategories}
				handleCategoryChange={categoryState.handleCategoryChange}
				onSubmit={handleSubmit}
				products={products}
				setModal={setIsOpenCreate}
			/>
		</Modal>
	);
}

export default CreateModal;
export type {ICreateModalProps, IModalProps};