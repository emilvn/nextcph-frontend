import { useState, useEffect } from "react";
import DashboardLineChartByMonth from "../../components/DashboardLineChartByMonth.tsx";
import PageLayout from "../../components/layout.tsx";
import { ChannelType } from "../../types/channel.types.ts";
import MonthPicker from "../../components/MonthPicker.tsx";
import useDashboard from "../../hooks/useDashboard.ts";
import { ISale } from "../../types/sales.types.ts";

function Dashboard({ channel }: { channel: ChannelType }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentSales, setCurrentSales] = useState<ISale[]>([]);
  const { monthlySales, isLoading } = useDashboard(channel, selectedYear + "-" + selectedMonth);

  const dateStates = {
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
  };

  const lineChartData = {
    currentSales,
    setCurrentSales,
    monthlySales,
    isLoading,
    month: selectedYear + "-" + selectedMonth,
    channel
  };

  useEffect(() => {
    setCurrentSales(monthlySales);
  }, [selectedMonth, selectedYear, monthlySales]);

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
