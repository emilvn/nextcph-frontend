import PageLayout from "../../components/layout.tsx";
import type { ChannelType } from "../../types/channel.types.ts";
import useSales from "../../hooks/useSales.ts";
import Loading from "../../components/loading.tsx";
import type { ISale } from "../../types/sales.types.ts";
import type { ISaleProduct } from "../../types/products.types.ts";
import { useUser } from "@clerk/clerk-react";
import type { UserResource } from "@clerk/types";
import {useState, useEffect, type Dispatch, type SetStateAction, ReactNode} from "react";
import { convertToDanishTime } from "../../helpers/dateTime.ts";
import { groupSalesByDate } from "../../helpers/groupSalesByDate.ts";
import { calculateProductsTotalPrice } from "../../helpers/CalculateProductPrice.ts";
import InfiniteScroll from "react-infinite-scroll-component";

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
		<button onClick={toggleMySales} className="btn-blue w-48 text-2xl">{buttonText}</button>
	)
}

function SaleList({ sales}: { sales: ISale[] }) {
	const groupedSales: { [key: string]: ISale[] } = groupSalesByDate({ sales });
	return (
		<div className="flex flex-col gap-[1px] lg:w-1/2">
			{Object.entries(groupedSales).map(([group, salesInGroup]) => (
				<div key={group} className="bg-next-white">
					<h1 className="mt-10 text-3xl font-bold bg-next-blue text-next-white p-2 ">{group}</h1>
					<div className="flex flex-col gap-[1px] bg-white">
						{salesInGroup.map((sale) => (
							<Sale key={sale.id} sale={sale} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}

function Sale({ sale }: { sale: ISale }) {
	const totalQuantity = sale.products.reduce((acc, product) => acc + product.product_quantity, 0);
	const totalPrice = sale.products.reduce((acc, product) => acc + calculateProductsTotalPrice(product.product.price, product.product_quantity), 0);
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
					<tr className="border-next-grey font-bold border-t-2">
						<td className="w-[32rem] p-1 text-next-darker-orange font-bold">Total</td>
						<td className="w-20">{totalQuantity} stk.</td>
						<td>{totalPrice},-</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

function Product({ product }: { product: ISaleProduct }) {
	return (
		<tr className="text-next-blue border-y border-white font-semibold">
			<td className="w-[32rem] p-1">{product.product.name}</td>
			<td className="w-20">{product.product_quantity} stk.</td>
			<td>{product.product.price},-</td>
		</tr>)
}

function Header({children}: {children: ReactNode}) {
	return (
		<div className="z-10 bg-next-blue p-2 fixed top-20 left-20 right-20 flex justify-between items-center">
			<h1 className="text-3xl font-bold text-next-darker-orange">Salgshistorik</h1>
			{children}
		</div>
	);
}

function SaleHistory({ channel }: { channel: ChannelType }) {
	const { sales, isLoading, setPage, hasMore } = useSales(channel);
	const { user } = useUser();
	const [currentSales, setCurrentSales] = useState<ISale[]>([]);

	useEffect(() => {
		setCurrentSales(sales);
	}, [sales]);

	if (isLoading) return (<Loading.LoadingPage />);
	if (!sales || sales.length === 0) return (<PageLayout><div className="p-4 text-next-blue text-xl">Ingen salg endnu...</div></PageLayout>);

	function fetchNextPage() {
		setTimeout(() => {
			setPage((prevPage) => prevPage + 1);
		}, 1000);
	}

	return (
		<PageLayout>
		<Header>
			<ButtonFilterSales setCurrentSales={setCurrentSales} sales={sales} user={user} />
		</Header>
		<InfiniteScroll
			dataLength={currentSales.length}
			next={fetchNextPage}
			hasMore={hasMore}
			className="mt-28 border-b bg-next-white"
			style={{ overflow: "hidden" }}
			endMessage={
				<div className="flex justify-center items-center p-4 text-next-grey lg:w-1/2">
					Ikke flere salg at vise...
				</div>
			}
			loader={
				<div className="flex justify-center items-center p-4 lg:w-1/2">
					<Loading.LoadingSpinner size={48}/>
				</div>
			}
		>
			<SaleList sales={currentSales} />
		</InfiniteScroll>
	</PageLayout>
	)
}

export default SaleHistory;