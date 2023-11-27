import PageLayout from "../../components/layout.tsx";
import type { ChannelType } from "../../types/channel.types.ts";
import useSalesUser from "../../hooks/useSalesUser.ts";
import Loading from "../../components/loading.tsx";
import { ISale } from "../../types/sales.types.ts";
import { ISaleProduct } from "../../types/products.types.ts";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { convertToDanishDate, convertToDanishTime } from "../../helpers/dateTime.ts";


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

function calculateProductsTotalPrice(price: number, qty: number): number {
	const totalPrice: number = price * qty;
	return totalPrice;
}

function groupedSalesByDate({ sales }: { sales: ISale[] }) {
	const groupedSales: { [key: string]: ISale[] } = {};
	sales.forEach((sale) => {
		const date = convertToDanishDate(sale.created_at);

		if (!groupedSales[date]) {
			groupedSales[date] = [];
		}

		groupedSales[date].push(sale);
	});

	return groupedSales;
}

function SaleHistory({ channel }: { channel: ChannelType }) {
	const { sales, isLoading } = useSalesUser(channel);
	const { user } = useUser();

	const [currentSales, setCurrentSales] = useState<{ sales: ISale[] }>({ sales });
	useEffect(() => {
		setCurrentSales(({ sales }));
	}, [sales]);

	if (isLoading) return (<Loading.LoadingPage />);
	if (!sales || sales.length === 0) return (<PageLayout>No sales found...</PageLayout>);

	const groupedSales: { [key: string]: ISale[] } = groupedSalesByDate(currentSales);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>, userId: string, { sales }: { sales: ISale[] }) {
		if (e.target.checked) {
			let filteredSales: ISale[];
			filteredSales = sales.filter((sale) => sale.user_id === userId);
			setCurrentSales({ sales: filteredSales });
		} else {
			setCurrentSales({ sales });
		}
	}

	return (
		<div className="bg-next-blue">
			<PageLayout>
				<div className="bg-next-blue text-next-darker-orange p-3 flex justify-between">
					<div>
						<h1 className="text-4xl font-bold">Salgshistorik</h1>
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
					</div>
					<div className="pr-10">
						<label>Mine salg: <input type="checkbox" onChange={(e) => handleChange(e, (user?.id) ? user.id : "", { sales })} /></label>
					</div>
				</div>
			</PageLayout>
		</div>
	)
}

export default SaleHistory

