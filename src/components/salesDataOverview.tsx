import { ChannelType } from '../types/channel.types';
import useDashboard from '../hooks/useDashboard';
import { IOverviewData, IOverviewCategory } from '../types/dashboard.types';
import loading from './loading';

const renderGridContent = (data: IOverviewData, formatNumber: (number: number, addCurrency?: boolean) => string) => (
  <div className="grid grid-cols-4 gap-4 mb-4">
    <div className="bg-white p-4 border border-gray-200 rounded">
      <p className="text-gray-800">Total omsætning</p>
      <p className="text-lg font-bold">{formatNumber(data.totalRevenue, true)}</p>
    </div>
    <div className="bg-white p-4 border border-gray-200 rounded">
      <p className="text-gray-800">Total antal salg</p>
      <p className="text-lg font-bold">{data.totalSales} stk. </p>
    </div>
    <div className="bg-white p-4 border border-gray-200 rounded">
      <p className="text-gray-800">Gennemsnitlig daglig omsætning</p>
      <p className="text-lg font-bold">{formatNumber(data.averageDailyRevenue, true)}</p>
    </div>
    <div className="bg-white p-4 border border-gray-200 rounded">
      <p className="text-gray-800">Gennemsnitlig daglig antal salg</p>
      <p className="text-lg font-bold">{data.averageDailySales.toFixed(2)} stk. </p>
    </div>
  </div>
);

const renderTableContent = (categories: IOverviewCategory[], formatNumber: (number: number, addCurrency?: boolean, isPercentage?: boolean) => string) => (
  <table className="min-w-full">
    <thead>
      <tr>
        <th className="bg-gray-200 border border-gray-300 p-2">Kategori</th>
        <th className="bg-gray-200 border border-gray-300 p-2">Total</th>
        <th className="bg-gray-200 border border-gray-300 p-2">Procent</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((category: IOverviewCategory, index: number) => (
        <tr key={index}>
          <td className="border border-gray-300 p-2">{category.name}</td>
          <td className="border border-gray-300 p-2">{formatNumber(category.total, true)}</td>
          <td className="border border-gray-300 p-2">{formatNumber(category.percentage, false, true)}%</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const formatNumber = (number: number | undefined, addCurrency: boolean = false, isPercentage: boolean = false) => {
  if (number == null) {
    return addCurrency ? 'N/A DKK' : 'N/A';
  }

  const decimalPlaces = isPercentage ? (number % 1 === 0 ? 0 : 1) : 2;
  const formattedNumber = number.toLocaleString('da-DK', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return addCurrency ? `${formattedNumber} DKK` : formattedNumber;
};


const renderOverviewContent = (data: IOverviewData, formatNumber: (number: number, addCurrency?: boolean) => string) => (
  <div>
    {renderGridContent(data, formatNumber)}
    {data.categories && renderTableContent(data.categories, formatNumber)}
  </div>
)

function SalesDataOverview({ channel }: { channel: ChannelType }) {
  const { isLoading, overviewData } = useDashboard(channel);

  return (
    <div className="bg-gray-100 p-4">
      {isLoading && (
        <loading.LoadingSpinner />
      )}
      {!isLoading && (
        <div className="border border-gray-300 p-4">
          <h2 className="text-lg font-bold mb-4">Salgs data oversigt</h2>
          {Array.isArray(overviewData) ? (
            overviewData.map((data, index) => <div key={index}>{renderOverviewContent(data, formatNumber)}</div>)
          ) : (
            <div>{renderOverviewContent(overviewData as IOverviewData, formatNumber)}</div>
          )}
        </div>
       )}
    </div>
  );
}

export default SalesDataOverview;
