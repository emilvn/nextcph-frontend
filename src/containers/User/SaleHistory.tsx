import PageLayout from "../../components/layout.tsx";
import type {ChannelType} from "../../types/channel.types.ts";

function SaleHistory({channel}:{channel:ChannelType}) {
	return (
		<PageLayout>
			SaleHistory - {channel}
		</PageLayout>
	);
}

export default SaleHistory