import { ChannelType } from '../types/channel.types';
import useDashboard from '../hooks/useDashboard';

function SalesDataOverview({ channel }: { channel: ChannelType }) {
  const { isLoading, overviewData } = useDashboard(channel);
  if(!isLoading) console.log(overviewData)
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          hejsa
        </div>
      )}
    </div>
  );
}

export default SalesDataOverview;
