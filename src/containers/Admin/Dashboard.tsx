import PageLayout from "../../components/layout.tsx";
import {ChannelType} from "../../types/channel.types.ts";

function Dashboard({channel}:{channel:ChannelType}) {
  return (
    <PageLayout>
      Dashboard - {channel}
    </PageLayout>
  )
}

export default Dashboard