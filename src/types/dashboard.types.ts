interface IOverviewData {
    totalRevenue: number;
    totalSales: number;
    averageDailySales: number;
    averageDailyRevenue: number;
    categories: IOverviewCategory[];
}

interface IOverviewCategory {
    name: string;
    total: number;
    quantity: number;
    percentageOfTotalRevenue: number;
    percentageOfTotalProductsSold: number;
}

export type { IOverviewData, IOverviewCategory };
