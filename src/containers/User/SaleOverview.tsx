import type {INewSaleProduct, IProduct} from "../../types/products.types.ts";
import type {Dispatch, ReactNode, SetStateAction} from "react";
import type {INewSale} from "../../types/sales.types.ts";
import {useUser} from "@clerk/clerk-react";
import toast from "react-hot-toast";
import {FaArrowLeft, FaCheck, FaMinus, FaPlus, FaShoppingCart, FaTrash} from "react-icons/fa";
import {formatPrice} from "../../helpers/formatting.ts";

function ProductList({ children }: { children: ReactNode}) {
	return (
		<table className="w-full">
			<thead>
			<tr className="border-b-2">
				<th className="text-left md:text-xl">Produkt</th>
				<th className="text-left md:text-xl">Antal</th>
				<th className="text-left md:text-xl">Pris</th>
			</tr>
			</thead>
			<tbody>
				{children}
			</tbody>
		</table>
	);
}

interface IProductRowProps {
	product: INewSaleProduct;
	addToSale: () => void;
	removeFromSale: () => void;
}
function ProductRow({ product, addToSale, removeFromSale}: IProductRowProps) {
	return (
		<tr className="border-b-2">
			<td className="p-4 font-semibold md:text-3xl">{product.name}</td>
			<td className="md:text-3xl">{product.quantity}</td>
			<td className="md:text-xl">{formatPrice(product.price)}</td>
			<td>
				<button className="btn-white" onClick={addToSale}>
					<FaPlus className="text-xl inline-block"/>
				</button>
			</td>
			<td>
				<button className="btn-white" onClick={removeFromSale}>
					<FaMinus className="text-xl inline-block"/>
				</button>
			</td>
		</tr>
	);
}


function SaleButtons(props: { finishSale: () => Promise<void>, resetSale: () => void }) {
	return <>
		<button
			className="btn-blue flex justify-center items-center gap-2 md:text-2xl h-16"
			onClick={props.finishSale}
		>
			<FaCheck/> Gennemfør salg
		</button>
		<button
			className="btn-white flex justify-center items-center gap-2 md:text-lg"
			onClick={props.resetSale}
		>
			<FaTrash/> Ryd salg
		</button>
	</>;
}
interface ISaleOverviewProps {
	currentSaleProducts: INewSaleProduct[];
	setIsOpenSales: Dispatch<SetStateAction<boolean>>;
	setCurrentSaleProducts: Dispatch<SetStateAction<INewSaleProduct[]>>;
	create: (sale: INewSale) => Promise<void>;
	addToSale: (product: IProduct | INewSaleProduct) => void;
	removeFromSale: (product: IProduct | INewSaleProduct) => void;
}

function SaleOverview(props:ISaleOverviewProps) {
	const {
		currentSaleProducts,
		setIsOpenSales,
		setCurrentSaleProducts,
		create,
		removeFromSale,
		addToSale
	} = props;
	const {user} = useUser();
	const saleTotal = currentSaleProducts.reduce((acc, product) => acc + (product.price*product.quantity), 0);
	async function finishSale() {
		if(!user || !user.id) {
			toast.error("Du skal være logget ind for at oprette et salg");
			return;
		}
		const sale: INewSale = {
			products: currentSaleProducts,
			user_id: user.id
		}
		void create(sale);
		setTimeout(() => {
			setIsOpenSales(false);
			setCurrentSaleProducts([]);
		}, 1000);
	}

	function resetSale() {
		setCurrentSaleProducts([]);
		setIsOpenSales(false);
	}

	return (<>
			<div className="mt-40 flex max-md:flex-col gap-4 min-h-[calc(100vh-300px)]">
				<div className="fixed top-20 max-md:w-full md:left-20 md:right-20 flex gap-4 bg-next-blue p-4 justify-between">
					<h2 className="text-2xl text-next-darker-orange font-bold">SALG</h2>
					<button className="btn-blue flex justify-center items-center gap-2" onClick={() => setIsOpenSales(false)}>
						<FaArrowLeft/> Tilbage
					</button>
				</div>
				<div className="flex flex-col gap-4 w-full md:mr-[400px]">
					{currentSaleProducts.length === 0 &&
						<div className="flex flex-col justify-center items-center p-8 h-full ml-[400px]">
							<FaShoppingCart className="text-8xl text-center"/>
							<p className="text-center">Der er ikke tilføjet nogen produkter til salg</p>
						</div>
					}
					{currentSaleProducts.length !== 0 &&
						<ProductList>
							{currentSaleProducts.map((product) => (
								<ProductRow
									key={product.id}
									product={product}
									addToSale={() => addToSale(product)}
									removeFromSale={() => removeFromSale(product)}
								/>
							))}
						</ProductList>
					}
				</div>
				{currentSaleProducts.length !== 0 &&
					<div className="md:fixed max-md:right-0 md:right-20 flex flex-col justify-center gap-4 p-4 bg-next-white border border-next-blue h-80">
						<div className="w-80">
							<h2 className="text-2xl font-bold">Total</h2>
							<p className="text-2xl text-right">{currentSaleProducts.reduce((a,product) => a+ product.quantity, 0)} produkter</p>
							<p className="text-2xl font-semibold text-right">{formatPrice(saleTotal)}</p>
						</div>
						<SaleButtons
							finishSale={finishSale}
							resetSale={resetSale}
						/>
					</div>
				}
			</div>
		</>);
}

export default SaleOverview;