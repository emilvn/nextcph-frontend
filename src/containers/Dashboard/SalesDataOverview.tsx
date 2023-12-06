import type { ChannelType } from '../../types/channel.types.ts';
import useDashboard from '../../hooks/useDashboard.ts';
import type { IOverviewData, IOverviewCategory } from '../../types/dashboard.types.ts';
import loading from '../../components/loading.tsx';
import { useState } from 'react';
import {formatPercentage, formatPrice} from "../../helpers/formatting.ts";

function GridContent(data: IOverviewData) {
    return (
        <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 border border-gray-200 rounded">
                <p className="text-gray-800">Total omsætning</p>
                <p className="text-lg font-bold">{formatPrice(data.totalRevenue)}</p>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded">
                <p className="text-gray-800">Total antal salg</p>
                <p className="text-lg font-bold">{data.totalSales} stk. </p>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded">
                <p className="text-gray-800">Gennemsnitlig daglig omsætning</p>
                <p className="text-lg font-bold">{formatPrice(data.averageDailyRevenue)}</p>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded">
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
                <th className="bg-gray-200 border border-gray-300 p-2">Kategori</th>
                <th className="bg-gray-200 border border-gray-300 p-2">Total</th>
                <th className="bg-gray-200 border border-gray-300 p-2">Procent</th>
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

function SalesDataOverview({ channel }: { channel: ChannelType }) {
    const { isLoading, overviewData } = useDashboard(channel);
    const [showTable, setShowTable] = useState(false);

    if(isLoading) return <loading.LoadingSpinner size={60}/>
    if(!overviewData) return <div>No data found...</div>

    console.log(overviewData);

    return (
        <div className="bg-gray-100 p-4">
            {!isLoading && (
                <div className="border border-gray-300 p-4">
                    <h2 className="text-lg font-bold mb-4">Salgs data oversigt</h2>
                    <div>
                        <div>
                            {GridContent(overviewData)}
                            <button className="btn-blue mt-4 w-full" onClick={() => setShowTable(!showTable)}>
                                {showTable ? 'Skjul tabel' : 'Vis tabel'}
                            </button>
                            {showTable && overviewData.categories && TableContent(overviewData.categories)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SalesDataOverview;
