import PageLayout from "../../components/layout.tsx";
import type { ChannelType } from "../../types/channel.types.ts";
import useSalesUser from "../../hooks/useSalesUser.ts";
import Loading from "../../components/loading.tsx";
import { ISale } from "../../types/sales.types.ts";

function Sales({ sales }: { sales: ISale[] }) {
	return <div>et salg</div>
}

function SaleHistory({ channel }: { channel: ChannelType }) {

	const { sales, isLoading } = useSalesUser(channel);
	console.log(sales);
	if (isLoading) return (<Loading.LoadingPage />);
	if (!sales || sales.length === 0) return (<PageLayout>No sales found...</PageLayout>);

	return (
		<PageLayout>
			<div>
				<Sales sales={sales} />
			</div>
		</PageLayout>
	);
}

export default SaleHistory

