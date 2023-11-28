import type {ChannelType} from "../../../types/channel.types.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {IProduct} from "../../../types/products.types.ts";
import {type Dispatch, type SetStateAction, useEffect} from "react";
import type {ActionMeta, Options} from "react-select";
import Creatable from "react-select/creatable";
import {FaCheck} from "react-icons/fa";
import {IoCloseSharp} from "react-icons/io5";

interface IProductFormData {
	name: string;
	amount: string;
	price: number;
	stock: number;
	channel: ChannelType;
	categories: string[];
}

interface IProductFormProps {
	onSubmit: SubmitHandler<IProductFormData>;
	products: IProduct[];
	setModal: Dispatch<SetStateAction<boolean>>;
	handleCategoryChange: (newValue: Options<{ value: string }>, actionMeta: ActionMeta<{ value: string }>) => void;
	title: string;
	selectedProduct?: IProduct | null;
	selectedCategories: string[];
	setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}

function ProductForm(props: IProductFormProps) {
	const {register, handleSubmit, setValue, reset} = useForm<IProductFormData>();

	useEffect(() => {
		if (props.selectedProduct) {
			setValue('name', props.selectedProduct.name.split(", ")[0]);
			setValue('amount', props.selectedProduct.name.split(", ")[1]);
			setValue('price', props.selectedProduct.price);
			setValue('stock', props.selectedProduct.stock);
		}
	}, [props.selectedProduct, setValue]);

	const submitForm: SubmitHandler<IProductFormData> = async (data) => {
		data.categories = props.selectedCategories;
		await props.onSubmit(data);
		props.setModal(false);
		reset();
		props.setSelectedCategories([]);
	}

	return (
		<form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-2 w-80 text-next-blue">
			<h2 className="text-center text-2xl font-semibold text-next-blue">{props.title}</h2>
			<label>Produkt navn</label>
			<input
				className="border border-gray-300 p-2 w-full"
				type="text"
				{...register("name", {required: true})}
				placeholder="Navn på produkt..."
			/>
			<label>Mængde (fx. 500ml)</label>
			<input
				className="border border-gray-300 p-2 w-full"
				type="text"
				{...register("amount", {required: true})}
				placeholder="Mængde på produkt..."
			/>
			<label>Pris</label>
			<input
				className="border border-gray-300 p-2 w-full"
				type="number"
				{...register("price", {required: true})}
				placeholder="Pris på produkt..."
			/>
			<label>Lagerbeholdning</label>
			<input
				className="border border-gray-300 p-2 w-full"
				type="number"
				{...register("stock", {required: true})}
				placeholder="Antal af produkt på lager..."
			/>
			<label>Kategorier</label>
			<Creatable
				isMulti={true}
				onChange={props.handleCategoryChange}
				value={props.selectedCategories?.map(category => ({value: category, label: category}))}
				options={Array.from(new Set(props.products.flatMap(product =>
					product.categories.map(category => category.category.name))))
					.map((categoryName, index) => ({
						value: categoryName,
						label: categoryName,
						key: index
					}))}
			/>
			<div className="flex justify-around mt-10">
				<button
					className="bg-next-darker-orange text-next-blue px-4 py-2 border-[1.5px] border-next-blue hover:bg-next-blue hover:text-next-orange"
					type="submit"
				>
					<FaCheck size={25}/>
				</button>
				<button
					className="border-[1.5px] border-next-darker-orange bg-next-blue text-next-orange py-2 px-4 hover:bg-next-darker-orange hover:text-next-blue ml-4"
					onClick={() => props.setModal(false)}
				>
					<IoCloseSharp size={25}/>
				</button>
			</div>
		</form>
	);
}

export default ProductForm;
export type {IProductFormData};