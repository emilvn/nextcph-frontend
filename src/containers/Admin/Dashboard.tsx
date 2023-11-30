import PageLayout from "../../components/layout.tsx";
import {ChannelType} from "../../types/channel.types.ts";
import SalesDataOverview from "../../components/salesDataOverview.tsx";

function Dashboard({channel}:{channel:ChannelType}) {
  return (
    <PageLayout>
      Dashboard - {channel}
      <SalesDataOverview/>
    </PageLayout>
  )
}

export default Dashboard