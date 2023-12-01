import DashboardLineChartByMonth from "../../components/DashboardLineChartByMonth.tsx";
import PageLayout from "../../components/layout.tsx";
import { ChannelType } from "../../types/channel.types.ts";

function Dashboard({ channel }: { channel: ChannelType }) {
  const month = "2023-11-01";
  return (
    <PageLayout>
      <DashboardLineChartByMonth channel={channel} month={month} />
    </PageLayout>
  )
}

export default Dashboard