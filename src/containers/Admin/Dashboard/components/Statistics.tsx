import type { ChannelType } from "../../../../types/channel.types.ts";
import type {
    IOverviewCategory,
    IOverviewData
} from "../../../../types/dashboard.types.ts";
import {
    formatFraction,
    formatPercentage,
    formatPrice
} from "../../../../helpers/formatting.ts";
import type { Dispatch, SetStateAction } from "react";

function GridContent({ data }: { data: IOverviewData }) {
    return (
        <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-200 p-4 border border-next-white rounded">
                <p className="text-gray-800">Total omsætning</p>
                <p className="text-lg font-bold">
                    {formatPrice(data.totalRevenue)}
                </p>
            </div>
            <div className="bg-gray-200 p-4 border border-next-white rounded">
                <p className="text-gray-800">Totale antal salg</p>
                <p className="text-lg font-bold">{data.totalSales}</p>
            </div>
            <div className="bg-gray-200 p-4 border border-next-white rounded">
                <p className="text-gray-800">Gennemsnitlig daglig omsætning</p>
                <p className="text-lg font-bold">
                    {formatPrice(data.averageDailyRevenue)}
                </p>
            </div>
            <div className="bg-gray-200 p-4 border border-next-white rounded">
                <p className="text-gray-800">
                    Gennemsnitligt dagligt antal salg
                </p>
                <p className="text-lg font-bold">
                    {formatFraction(data.averageDailySales)}
                </p>
            </div>
        </div>
    );
}

function TableContent({ categories }: { categories: IOverviewCategory[] }) {
    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th className="bg-next-white border border-gray-300 p-2">
                        Kategori
                    </th>
                    <th className="bg-next-white border border-gray-300 p-2">
                        Total
                    </th>
                    <th className="bg-next-white border border-gray-300 p-2">
                        % af total omsætning
                    </th>
                </tr>
            </thead>
            <tbody>
                {categories.map(
                    (category: IOverviewCategory, index: number) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">
                                {category.name}
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                {formatPrice(category.total)}
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                {formatPercentage(
                                    category.percentageOfTotalRevenue
                                )}
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );
}

interface IStaticticsDataProps {
    statisticsData: {
        overviewData: IOverviewData;
        isLoading: boolean;
        channel: ChannelType;
        showStatisticsTable: boolean;
        setShowStatisticsTable: Dispatch<SetStateAction<boolean>>;
    };
}

function Statistics({ statisticsData }: IStaticticsDataProps) {
    if (!statisticsData.overviewData) return <div>No data found...</div>;

    return (
        <div className="bg-next-white p-4">
            {!statisticsData.isLoading && (
                <div className="border border-gray-300 p-4">
                    <h2 className="text-lg text-center font-bold mb-4">
                        Månedlige Salg
                    </h2>
                    <GridContent data={statisticsData.overviewData} />
                    {statisticsData.overviewData.totalSales > 0 && (
                        <>
                            <button
                                className="btn-white mt-4 w-full"
                                onClick={() =>
                                    statisticsData.setShowStatisticsTable(
                                        !statisticsData.showStatisticsTable
                                    )
                                }
                            >
                                {statisticsData.showStatisticsTable
                                    ? "Skjul tabel"
                                    : "Vis tabel"}
                            </button>
                            {statisticsData.showStatisticsTable && (
                                <TableContent
                                    categories={
                                        statisticsData.overviewData.categories
                                    }
                                />
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Statistics;