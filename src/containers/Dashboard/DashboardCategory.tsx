import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {ChannelType} from "../../types/channel.types.ts";
import {getCategories} from "../../helpers/categories.ts";
import useProducts from "../../hooks/useProducts.ts";
import useSales from "../../hooks/useSales.ts";
import {channelDict} from "../../helpers/channelDict.ts";


export function DashboardCategory({channel}: {
    channel: ChannelType
}) {
    const {products} = useProducts(channel);
    const {sales} = useSales(channel);


    const combinedData = sales.map(sale => {
        const productsWithCategories = sale.products.map(product => {
            const productCategories = products.find(p => p.id === product.product.id)?.categories || [];
            return {
                ...product,
                categories: productCategories.map(category => category.category.name)
            };
        });

        return {
            ...sale,
            products: productsWithCategories
        };
    });


    function calculateCategoryPercentages() {
        const CategoryPercentages: {
            [key: string]: number
        } = {};
        let totalValue: number = 0;

        combinedData.forEach(sale => {
            sale.products.forEach(product => {
                product.categories.forEach(category => {
                    const categoryName = category;
                    const productPrice = product.product.price;

                    totalValue += productPrice;

                    if (!CategoryPercentages[categoryName]) {
                        CategoryPercentages[categoryName] = productPrice;
                    } else {
                        CategoryPercentages[categoryName] += productPrice
                    }
                })
            })
        })

        Object.keys(CategoryPercentages).forEach(category => {
            CategoryPercentages[category] = Number(((CategoryPercentages[category] / totalValue) * 100).toFixed(1));
        });
        return CategoryPercentages
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return label + ': ' + value.toFixed(1) + '%';
                    }
                }
            },
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Salg for hver Kategori for ${channelDict[channel]} per måned`,
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        if (value) return value.toString() + '%';
                    },
                },
            },
        },
    };

    const labels = getCategories(products);


    const categoryNumbers = calculateCategoryPercentages();

    const data = {
        labels,
        datasets: [
            {
                label: channelDict[channel],
                data: Object.values(categoryNumbers),
                backgroundColor: '#F96B4C',
                borderColor: '#010E2B',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Bar data={data} options={options}/>
    );
}