import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChannelType } from "../../../../types/channel.types.ts";
import type { IOverviewCategory } from "../../../../types/dashboard.types.ts";

import { setBarChartData } from "../../../../helpers/dashboard.ts";

interface IBarChartComponentProps {
    barChartComponentData: {
        overviewCategories: IOverviewCategory[];
        isLoading: boolean;
        channel: ChannelType;
    };
}

export function BarChart({ barChartComponentData }: IBarChartComponentProps) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const { barChartData, barChartOptions } = setBarChartData(
        barChartComponentData.overviewCategories
    );

    return (
        <Bar
            data={barChartData}
            options={barChartOptions}
        />
    );
}
