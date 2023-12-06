import type { ChannelType } from '../../types/channel.types.ts';
import type { IOverviewData, IOverviewCategory } from '../../types/dashboard.types.ts';
import loading from '../../components/loading.tsx';
import { useState } from 'react';
import { formatPercentage, formatPrice } from "../../helpers/formatting.ts";

function GridContent(data: IOverviewData) {
    return (
        <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-200 p-4 border border-next-white rounded">
                <p className="text-gray-800">Total omsætning</p>
                <p className="text-lg font-bold">{formatPrice(data.totalRevenue)}</p>
            </div>
            <div className="bg-gray-200 p-4 border border-next-white rounded">
                <p className="text-gray-800">Total antal salg</p>
                <p className="text-lg font-bold">{data.totalSales} stk. </p>
            </div>
            <div className="bg-gray-200 p-4 border border-next-white rounded">
                <p className="text-gray-800">Gennemsnitlig daglig omsætning</p>
                <p className="text-lg font-bold">{formatPrice(data.averageDailyRevenue)}</p>
            </div>
            <div className="bg-gray-200 p-4 border border-next-white rounded">
                <p className="text-gray-800">Gennemsnitlig daglig antal salg</p>
                <p className="text-lg font-bold">{data.averageDailySales.toFixed(2)} stk. </p>
            </div>
        </div>
    );
}

function TableContent(categories: IOverviewCategory[]) {
    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th className="bg-next-white border border-gray-300 p-2">Kategori</th>
                    <th className="bg-next-white border border-gray-300 p-2">Total</th>
                    <th className="bg-next-white border border-gray-300 p-2">Procent</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category: IOverviewCategory, index: number) => (
                    <tr key={index}>
                        <td className="border border-gray-300 p-2">{category.name}</td>
                        <td className="border border-gray-300 p-2">{formatPrice(category.total)}</td>
                        <td className="border border-gray-300 p-2">{formatPercentage(category.percentage)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

interface IStaticticsDataProps {
    statisticsData: {
        overviewData: IOverviewData;
        isLoading: boolean;
        channel: ChannelType;
    }
}

function Statistics({ statisticsData }: IStaticticsDataProps) {
    const [showTable, setShowTable] = useState(false);

    if (statisticsData.isLoading) return <loading.LoadingSpinner size={60} />
    if (!statisticsData.overviewData) return <div>No data found...</div>

    return (
        <div className="bg-next-white p-4">
            {!statisticsData.isLoading && (
                <div className="border border-gray-300 p-4">
                    <h2 className="text-lg text-center font-bold mb-4">Månedlige Salg</h2>
                    <div>
                        <div>
                            {GridContent(statisticsData.overviewData)}
                            {statisticsData.overviewData.categories && statisticsData.overviewData.categories.length > 0 && (
                                <button className="btn-white mt-4 w-full" onClick={() => setShowTable(!showTable)}>
                                    {showTable ? 'Skjul tabel' : 'Vis tabel'}
                                </button>
                            )}
                            {showTable && statisticsData.overviewData.categories && TableContent(statisticsData.overviewData.categories)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Statistics;