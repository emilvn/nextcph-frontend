import type { ChannelType } from "../../../../types/channel.types.ts";
import { Dispatch, SetStateAction, useState } from "react";
import { LoadingPage } from "../../../../components/loading.tsx";
import type { IProduct } from "../../../../types/products.types.ts";
import { FaExclamationCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useProducts from "../../../../hooks/useProducts.ts";

function LowStockProduct({ product }: { product: IProduct }) {
    return (
        <tr>
            <td className="border border-gray-300 p-2">{product.name}</td>
            <td className="border border-gray-300 p-2 text-center">
                {product.stock}
            </td>
            <td className="border border-gray-300 p-2 text-center">
                {product.min_stock}
            </td>
        </tr>
    );
}

function TableContent({ products }: { products: IProduct[] }) {
    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th className="bg-next-white border border-gray-300 p-2">
                        Produktnavn
                    </th>
                    <th className="bg-next-white border border-gray-300 p-2">
                        Nuværende lagerantal
                    </th>
                    <th className="bg-next-white border border-gray-300 p-2">
                        Minimum lagergrænse
                    </th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <LowStockProduct
                        key={product.id}
                        product={product}
                    />
                ))}
            </tbody>
        </table>
    );
}

interface IHeaderProps {
    showTable: boolean;
    setShowTable: Dispatch<SetStateAction<boolean>>;
}
function Header({ showTable, setShowTable }: IHeaderProps) {
    return (
        <div onClick={() => setShowTable(!showTable)} className="text-2xl text-red-700 font-bold mb-4 flex justify-center items-center cursor-pointer">
            <FaExclamationCircle />
            <h2 className="mx-2">Lav lagerbeholdning</h2>
            <FaExclamationCircle className="mr-2" />
            {showTable && (<IoIosArrowDown />)}
            {!showTable && (<IoIosArrowUp />)}
        </div>
    );
}

function LowStock({ channel }: { channel: ChannelType }) {
    const [showTable, setShowTable] = useState<boolean>(true);
    const { products: lowStockProducts, isLoading } = useProducts(channel, {
        lowStock: true
    });

    if (isLoading) return <LoadingPage />;

    return (
        <>
            {lowStockProducts.length > 0 && (
                <div className="bg-next-white p-4">
                    <div className="border border-gray-300 p-4">
                        <Header showTable={showTable} setShowTable={setShowTable} />
                        {showTable && (
                            <TableContent products={lowStockProducts} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default LowStock;
