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


function ShowSalesProductPrice({sales}: { sales: ISale[] }) {
    return (
        <div>
            {sales.map((sale, index) => (
                <div key={index}>
                    <ul>
                        {sale.products.map(product => (
                            <li key={product.product.id}>
                                <span>Category: {product.product.categories.map(category => (
                                    <span key={category.category.id}>{category.category.name}</span>
                                ))}</span>
                                <span>Sale Amount: {product.product.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default ShowSalesProductPrice;

export function DashboardCategory({channel}: {
    channel: ChannelType
}) {
    const {products} = useProducts(channel);
    const [sales, setSales] = useState<ISale[]>([]);
    console.log(sales)

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
        /*<ShowSalesProductPrice sales={sales}/>*/
    );
}
