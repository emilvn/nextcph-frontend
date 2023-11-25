import PageLayout from "../../components/layout.tsx";
import type { ChannelType } from "../../types/channel.types.ts";
import useSalesUser from "../../hooks/useSalesUser.ts";
import Loading from "../../components/loading.tsx";
import { ISale } from "../../types/sales.types.ts";
import { IProduct } from "../../types/products.types.ts";

function GenerateSaleHistory({ sales }: { sales: ISale[] }) {

	const groupedSales: { [key: string]: ISale[] } = groupedSalesByDate({ sales });
	console.log(groupedSales);
	for (const group in groupedSales) {
		console.log(group);
	}
	return <div>123</div>
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

function Sale({ sale }: { sale: ISale }) {
	console.log(sale.products);
	return (
		<div>
			<div>{convertToDanishTime(sale.created_at)}</div>
			{sale.products.map((product) => (
				<Product key={product.product.id} product={product.product} />
			))}
		</div>
	)
}

function Product({ product }: { product: IProduct }) {
	return (
		<div>
			<ul>
				<li>{product.name} {product.price},-</li>
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
	if (isLoading) return (<Loading.LoadingPage />);
	if (!sales || sales.length === 0) return (<PageLayout>No sales found...</PageLayout>);

	const groupedSales: { [key: string]: ISale[] } = groupedSalesByDate({ sales });
	console.log(groupedSales);

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
			</div>
		</PageLayout>
	)

	// return (
	// 	<PageLayout>
	// 		<Header />
	// 		<div>
	// 			{sales.map((sale) => (
	// 				<Sale key={sale.id} sale={sale} />
	// 			))}
	// 		</div>
	// 	</PageLayout>
	// );
}

export default SaleHistory

