import type { ChannelType } from '../../types/channel.types.ts';
import useDashboard from '../../hooks/useDashboard.ts';
import type { IOverviewData, IOverviewCategory } from '../../types/dashboard.types.ts';
import loading from '../../components/loading.tsx';
import { useState } from 'react';

function GridContent(data: IOverviewData, formatNumber: (number: number, addCurrency?: boolean) => string) {
    return (
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
}

function TableContent(categories: IOverviewCategory[], formatNumber: (number: number, addCurrency?: boolean, isPercentage?: boolean) => string) {
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
                    <td className="border border-gray-300 p-2">{formatNumber(category.total, true)}</td>
                    <td className="border border-gray-300 p-2">{formatNumber(category.percentage, false, true)}%</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function formatNumber(number: number | undefined, addCurrency: boolean = false, isPercentage: boolean = false) {
    if (number == null) {
        return addCurrency ? 'N/A DKK' : 'N/A';
    }

    // Bestemmer antallet af decimaler baseret på om det er en procentdel:
    // Hvis det er en procentdel (isPercentage er sand), og tallet har ingen decimaler,
    // så brug 0 decimaler, ellers brug 1 decimal.
    // Hvis det ikke er en procentdel (isPercentage er falsk), brug altid 2 decimaler.

    const decimalPlaces = isPercentage ? (number % 1 === 0 ? 0 : 1) : 2;
    const formattedNumber = number.toLocaleString('da-DK', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });

    return addCurrency ? `${formattedNumber} DKK` : formattedNumber;
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
                            {GridContent(overviewData, formatNumber)}
                            <button className="btn-blue mt-4 w-full" onClick={() => setShowTable(!showTable)}>
                                {showTable ? 'Skjul tabel' : 'Vis tabel'}
                            </button>
                            {showTable && overviewData.categories && TableContent(overviewData.categories, formatNumber)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SalesDataOverview;
