import { ChannelType } from "../../../types/channel.types";
import useLowStockProducts from "../../../hooks/useLowStock";
import Loading from "../../../components/loading";
import type { IProduct } from "../../../types/products.types";
import { FaExclamationCircle } from "react-icons/fa";

function LowStockProduct({ product }: { product: IProduct }) {
    return (
        <tr>
            <td className="border border-gray-300 p-2">{product.name}</td>
            <td className="border border-gray-300 p-2 text-center">{product.stock}</td>
            <td className="border border-gray-300 p-2 text-center">{product.min_stock}</td>
        </tr>
    );
}

function TableContent({ products }: { products: IProduct[] }) {
    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th className="bg-next-white border border-gray-300 p-2">Produktnavn</th>
                    <th className="bg-next-white border border-gray-300 p-2">Nuværende lagerantal</th>
                    <th className="bg-next-white border border-gray-300 p-2">Minimum lagergrænse</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <LowStockProduct key={product.id} product={product} />
                ))}
            </tbody>
        </table>
    );

}

function LowStock({ channel }: { channel: ChannelType }) {
    const { lowStockProducts, isLoading } = useLowStockProducts(channel);

    if (isLoading) return (<Loading.LoadingPage />);

    console.log(lowStockProducts)
    return (
        <>
            {lowStockProducts.length > 0 && (
                <div className="bg-next-white p-4" >
                    <div className="border border-gray-300 p-4">
                        <div className=" text-2xl text-red-700 font-bold mb-4 flex justify-center items-center">
                            <FaExclamationCircle />
                            <h2 className="mx-2">Lav lagerbeholdning</h2>
                            <FaExclamationCircle />
                        </div>
                        <div>
                            <div>
                                <TableContent products={lowStockProducts} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LowStock;