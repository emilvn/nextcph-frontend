import { useState, useEffect } from "react";
import LineChart from "./LineChart.tsx";
import PageLayout from "../../components/layout.tsx";
import { ChannelType } from "../../types/channel.types.ts";
import MonthPicker from "./MonthPicker.tsx";
import useDashboard from "../../hooks/useDashboard.ts";
import { ISale } from "../../types/sales.types.ts";
import { BarChart } from "./BarChart.tsx";
import Statistics from "./Statistics.tsx";

function Dashboard({ channel }: { channel: ChannelType }) {
  const [currentSales, setCurrentSales] = useState<ISale[]>([]);
  const { monthlySales, overviewData, isLoading, setMonth, setYear, month, year } = useDashboard(channel);

  const dateStates = {
    month,
    year,
    setMonth,
    setYear,
  };

  const lineChartComponentData = {
    currentSales,
    isLoading,
    month,
    year,
    channel
  };

  const barChartComponentData = {
    overviewCategories: overviewData.categories,
    isLoading,
    channel,
  };

  const statisticsData = {
    overviewData,
    isLoading,
    channel,
  };

  useEffect(() => {
    setCurrentSales(monthlySales);
  }, [monthlySales]);

  return (
    <PageLayout>
      <div className="bg-next-white">
        <MonthPicker dateStates={dateStates} />
        <Statistics statisticsData={statisticsData} />
        <div className="flex">
          <div className="w-full">
            <LineChart lineChartComponentData={lineChartComponentData} />
          </div>
          <div className="w-full">
            <BarChart barChartComponentData={barChartComponentData} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Dashboard; 