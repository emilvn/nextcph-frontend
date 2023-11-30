import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {ChannelType} from "../types/channel.types.ts";
import {getCategories} from "../helpers/categories.ts";
import useProducts from "../hooks/useProducts.ts";
import {useState} from "react";
import {ISale} from "../types/sales.types.ts";

export function DashboardCategory({channel}: {
    channel: ChannelType
}) {
    const {products} = useProducts(channel);
    const [sales, setSales] = useState<ISale[]>([]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Salg for hver Kategori for ${channel.toString()} hele året`,
            },
        },
    };

    const labels = getCategories(products);

    const generateRandomData = () => labels.map(() => Math.floor(Math.random() * 1000));

    const data = {
        labels,
        datasets: [
            {
                label: channel.toString(),
                data: generateRandomData(),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Bar data={data} options={options}/>
    );
}
