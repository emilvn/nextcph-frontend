import PageLayout from "../../components/layout.tsx";
import {ChannelType} from "../../types/channel.types.ts";
import {DashboardCategory} from "../../components/DashboardCategory.tsx";

function Dashboard({channel}: { channel: ChannelType }) {
    return (
        <PageLayout>
            <DashboardCategory channel={channel}/>
        </PageLayout>
    )
}

export default Dashboard