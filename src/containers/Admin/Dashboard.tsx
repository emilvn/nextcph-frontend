import DashboardLineChartByMonth from "../../components/DashboardLineChartByMonth.tsx";
import PageLayout from "../../components/layout.tsx";
import { ChannelType } from "../../types/channel.types.ts";

function Dashboard({ channel }: { channel: ChannelType }) {
  return (
    <PageLayout>
      <DashboardLineChartByMonth channel={channel} />
    </PageLayout>
  )
}

export default Dashboard