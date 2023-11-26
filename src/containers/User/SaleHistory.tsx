import PageLayout from "../../components/layout.tsx";
import type { ChannelType } from "../../types/channel.types.ts";
import useSalesUser from "../../hooks/useSalesUser.ts";
import Loading from "../../components/loading.tsx";
import { ISale } from "../../types/sales.types.ts";
import { ISaleProduct } from "../../types/products.types.ts";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

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

function Sale({ sale }: { sale: ISale }) {
	return (
		<div>
			<div>{convertToDanishTime(sale.created_at)}</div>
			{sale.products.map((product) => (
				<Product key={product.product.id} product={product} />
			))}
		</div>
	)
}

function Product({ product }: { product: ISaleProduct }) {
	console.log(product)
	return (
		<div>
			<ul>
				<li>{product.product_quantity}x {product.product.name} {calculateProductTotalPrice(product.product.price, product.product_quantity)},-</li>
			</ul>

		</div>)
}

function Header() {
	return <h1>Sales History</h1>
}

function calculateProductTotalPrice(price: number, qty: number): number {
	const totalPrice: number = price * qty;
	return totalPrice;
}

function convertToDanishDate(utcTimestamp: string): string {
	const date = new Date(utcTimestamp);

	const danishDate = date.toLocaleString('da-DK', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	return danishDate;
}

function convertToDanishTime(utcTimestamp: string): string {
	const date = new Date(utcTimestamp);

	const danishDate = date.toLocaleString('da-DK', {
		hour: '2-digit',
		minute: '2-digit',
	});

	return danishDate;
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
		<PageLayout>
			<Header />
			<div>
				{Object.entries(groupedSales).map(([group, salesInGroup]) => (
					<div key={group}>
						<h1>{group}</h1>
						<ul>
							{salesInGroup.map((sale) => (
								<Sale key={sale.id} sale={sale} />
							))}
						</ul>
					</div>
				))}
				<input type="checkbox" onChange={(e) => handleChange(e, (user?.id) ? user.id : "", { sales })} />
			</div>
		</PageLayout>
	)
}

export default SaleHistory

