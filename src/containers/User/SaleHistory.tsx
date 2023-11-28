import PageLayout from "../../components/layout.tsx";
import type { ChannelType } from "../../types/channel.types.ts";
import useSales from "../../hooks/useSales.ts";
import Loading from "../../components/loading.tsx";
import type { ISale } from "../../types/sales.types.ts";
import type { ISaleProduct } from "../../types/products.types.ts";
import { useUser } from "@clerk/clerk-react";
import type { UserResource } from "@clerk/types";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
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

	if (!user) return <div>Bruger ikke fundet...</div>

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
		<button onClick={toggleMySales} className="btn-blue w-48 h-20 text-2xl">{buttonText}</button>
	)
}

function SaleList({ sales }: { sales: ISale[] }) {
	const groupedSales: { [key: string]: ISale[] } = groupSalesByDate({ sales });
	return (
		<div className="mt-16 flex flex-col gap-[1px]">
			{Object.entries(groupedSales).map(([group, salesInGroup]) => (
				<div key={group}>
					<h1 className="pt-10 text-3xl font-bold text-next-blue">{group}</h1>
					<ul className="flex flex-col gap-[1px] bg-white">
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
		<div className="bg-next-white">
			<div className="pt-4 text-2xl font-semibold text-next-blue">{convertToDanishTime(sale.created_at)}</div>
			<table>
				<thead>
					<tr className="text-left">
						<th>Produkt</th>
						<th>Antal</th>
						<th>Pris</th>
					</tr>
				</thead>
				<tbody>
					{sale.products.map((product) => (
						<Product key={product.product.id} product={product} />
					))}
				</tbody>
			</table>
		</div>
	)
}

function Product({ product }: { product: ISaleProduct }) {
	return (
		<tr className="text-next-blue border-y border-white font-semibold">
			<td className="w-[32rem] p-4">{product.product.name}</td>
			<td className="w-20">{product.product_quantity} stk.</td>
			<td>{calculateProductsTotalPrice(product.product.price, product.product_quantity)},-</td>
		</tr>)
}

function SaleHistory({ channel }: { channel: ChannelType }) {
	const { sales, isLoading } = useSales(channel);
	const { user } = useUser();

	const [currentSales, setCurrentSales] = useState<ISale[]>([]);
	useEffect(() => {
		setCurrentSales(sortSalesByDate({ sales }));
	}, [sales]);

	if (isLoading) return (<Loading.LoadingPage />);
	if (!sales || sales.length === 0) return (<PageLayout><div className="p-4 text-next-blue text-xl">Ingen salg endnu...</div></PageLayout>);

	return (
		<PageLayout>
			<div className="bg-next-white text-next-darker-orange p-3 flex justify-between">
				<div className="w-full p-4">
					<div className="bg-next-blue p-4 fixed top-20 left-20 right-20 flex justify-between items-center">
						<h1 className="text-4xl font-bold">Salgshistorik</h1>
						<ButtonFilterSales setCurrentSales={setCurrentSales} sales={sales} user={user} />
					</div>
					<SaleList sales={currentSales} />
				</div>
			</div>
		</PageLayout>
	)
}

export default SaleHistory;