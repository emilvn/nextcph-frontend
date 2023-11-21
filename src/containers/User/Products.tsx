import PageLayout from "../../components/layout.tsx";
import {ChannelType} from "../../types/channel.types.ts";

function Products({channel}:{channel:ChannelType}) {
  return (
      <PageLayout>
            Products - {channel}
      </PageLayout>
    );
}

export default Products