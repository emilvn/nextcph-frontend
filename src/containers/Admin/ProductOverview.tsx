import PageLayout from "../../components/layout.tsx";
import {ChannelType} from "../../types/channel.types.ts";

function ProductOverview({channel}:{channel:ChannelType}) {
  return (
    <PageLayout>
      ProductOverview - {channel}
    </PageLayout>
  )
}

export default ProductOverview