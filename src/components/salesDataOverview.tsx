import { useEffect } from 'react';
import { ChannelType } from '../types/channel.types';
import useSales from '../hooks/useSales';

function SalesDataOverview({ channel }: { channel: ChannelType }) {
  const { isLoading, getDashboardOverviewData } = useSales(channel);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardOverviewData();
        console.table(data); 
      } catch (error) {
        console.error('Fejl ved hentning af dashboard oversigtsdata', error);
      }
    };

    fetchData();
  }, [getDashboardOverviewData]); 

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          hej
        </div>
      )}
    </div>
  );
}

export default SalesDataOverview;
