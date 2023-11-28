import PageLayout from "../../components/layout.tsx";
import type { ChannelType } from "../../types/channel.types.ts";
import useSales from "../../hooks/useSales.ts";
import Loading from "../../components/loading.tsx";
import { ISale } from "../../types/sales.types.ts";
import { ISaleProduct } from "../../types/products.types.ts";
import { useUser } from "@clerk/clerk-react";
import { UserResource } from "@clerk/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { convertToDanishTime } from "../../helpers/dateTime.ts";
import { groupSalesByDate } from "../../helpers/groupSalesByDate.ts";
import { sortSalesByDate } from "../../helpers/sortSalesByDate.ts";
import { calculateProductsTotalPrice } from "../../helpers/CalculateProductPrice.ts";

interface ButtonFilterSalesProps {
	setCurrentSales: Dispatch<SetStateAction<ISale[]>>;
	sales: ISale[];
	user: UserResource | null | undefined
}

function ButtonFilterSales({ setCurrentSales, sales, user }: ButtonFilterSalesProps) {
	const [isMySalesToggleClicked, setMySalesToggleClicked] = useState(false);
	const [buttonText, setButtonText] = useState("Mine salg");

	if (!user) return <div>No User</div>

	function toggleMySales() {
		if (isMySalesToggleClicked) {
			setCurrentSales(sales);
			setButtonText("Mine salg");
		} else {
			const filteredSales: ISale[] = sales.filter((sale) => sale.user_id === user?.id);
			setCurrentSales(filteredSales);
			setButtonText("Alle salg");
		}
		setMySalesToggleClicked(!isMySalesToggleClicked);
	}
	return (
		<button onClick={toggleMySales} className="btn-blue w-48 h-20 fixed top-24 right-24 text-2xl">{buttonText}</button>
	)
}

function SaleList({ sales }: { sales: ISale[] }) {
	const groupedSales: { [key: string]: ISale[] } = groupSalesByDate({ sales });
	return (
		<div>
			{Object.entries(groupedSales).map(([group, salesInGroup]) => (
				<div key={group}>
					<h1 className="pt-10 text-2xl font-semibold">{group}</h1>
					<ul>
						{salesInGroup.map((sale) => (
							<Sale key={sale.id} sale={sale} />
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

function Sale({ sale }: { sale: ISale }) {
	return (
		<div>
			<div className="pt-4 text-lg font-semibold">{convertToDanishTime(sale.created_at)}</div>
			{sale.products.map((product) => (
				<Product key={product.product.id} product={product} />
			))}
		</div>
	)
}

function Product({ product }: { product: ISaleProduct }) {
	return (
		<div className="flex justify-between w-96 text-white">
			<div className="pr-1">{product.product_quantity}x {product.product.name}</div>
			<div>{calculateProductsTotalPrice(product.product.price, product.product_quantity)},-</div>
		</div>)
}

function SaleHistory({ channel }: { channel: ChannelType }) {
	const { sales, isLoading } = useSales(channel);
	const { user } = useUser();

	const [currentSales, setCurrentSales] = useState<ISale[]>([]);
	useEffect(() => {
		setCurrentSales(sortSalesByDate({ sales }));
	}, [sales]);

	if (isLoading) return (<Loading.LoadingPage />);
	if (!sales || sales.length === 0) return (<PageLayout>No sales found...</PageLayout>);

	return (
		<div className="bg-next-blue">
			<PageLayout>
				<div className="bg-next-blue text-next-darker-orange p-3 flex justify-between">
					<div>
						<h1 className="text-4xl font-bold">Salgshistorik</h1>
						<SaleList sales={currentSales} />
					</div>
					<ButtonFilterSales setCurrentSales={setCurrentSales} sales={sales} user={user} />
				</div>
			</PageLayout>
		</div>
	)
}

export default SaleHistory