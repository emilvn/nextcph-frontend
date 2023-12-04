import SalesDataOverview from "../../components/salesDataOverview.tsx";
import PageLayout from "../../components/layout.tsx";
import { ChannelType } from "../../types/channel.types.ts";

function Dashboard({channel}:{channel:ChannelType}) {
  return (
    <PageLayout>
      Dashboard - {channel}
      <SalesDataOverview channel={channel}/>
    </PageLayout>
  )
}

export default Dashboard