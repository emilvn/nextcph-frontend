import { useState, useEffect } from "react";
import DashboardLineChartByMonth from "../../components/DashboardLineChartByMonth.tsx";
import PageLayout from "../../components/layout.tsx";
import { ChannelType } from "../../types/channel.types.ts";
import MonthPicker from "../../components/MonthPicker.tsx";
import useDashboard from "../../hooks/useDashboard.ts";
import { ISale } from "../../types/sales.types.ts";

function Dashboard({ channel }: { channel: ChannelType }) {
  const [currentSales, setCurrentSales] = useState<ISale[]>([]);
  const { monthlySales, isLoading, setMonth, setYear, month, year } = useDashboard(channel);

  const dateStates = {
    setMonth,
    setYear,
    month,
    year
  };

  const lineChartData = {
    currentSales,
    isLoading,
    month,
    year,
    channel
  };

  useEffect(() => {
    setCurrentSales(monthlySales);
  }, [monthlySales]);

  return (
    <PageLayout>
      <div className="bg-next-white">
        <MonthPicker dateStates={dateStates} />
        <DashboardLineChartByMonth lineChartData={lineChartData} />
      </div>
    </PageLayout>
  );
}

export default Dashboard;