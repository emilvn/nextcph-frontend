import type { INewSaleProduct, IProduct } from "../../types/products.types.ts";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { INewSale } from "../../types/sales.types.ts";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import {
    FaArrowLeft,
    FaCheck,
    FaMinus,
    FaPlus,
    FaShoppingCart,
    FaTrash
} from "react-icons/fa";
import { formatPrice } from "../../helpers/formatting.ts";
import useSales from "../../hooks/useSales.ts";
import type { ChannelType } from "../../types/channel.types.ts";

function ProductList({ children }: { children: ReactNode }) {
    return (
        <table className="w-full">
            <thead>
                <tr className="border-b-2">
                    <th className="text-left md:text-xl">Produkt</th>
                    <th className="text-left md:text-xl">Antal</th>
                    <th className="text-left md:text-xl">Pris</th>
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}

interface IProductRowProps {
    product: INewSaleProduct;
    increment: () => void;
    decrement: () => void;
}

function ProductRow(props: IProductRowProps) {
    return (
        <tr className="border-b-2">
            <td className="p-4 font-semibold md:text-3xl">
                {props.product.name}
            </td>
            <td className="md:text-3xl">{props.product.quantity}</td>
            <td className="md:text-xl">{formatPrice(props.product.price)}</td>
            <td>
                <button
                    className="btn-white"
                    onClick={props.increment}
                >
                    <FaPlus className="text-xl inline-block" />
                </button>
            </td>
            <td>
                <button
                    className="btn-white"
                    onClick={props.decrement}
                >
                    <FaMinus className="text-xl inline-block" />
                </button>
            </td>
        </tr>
    );
}

interface ISaleButtonsProps {
    submit: () => Promise<void>;
    reset: () => void;
}

function SaleButtons(props: ISaleButtonsProps) {
    return (
        <>
            <button
                className="btn-blue flex justify-center items-center gap-2 md:text-2xl h-16"
                onClick={props.submit}
            >
                <FaCheck /> Gennemfør salg
            </button>
            <button
                className="btn-white flex justify-center items-center gap-2 md:text-lg"
                onClick={props.reset}
            >
                <FaTrash /> Ryd salg
            </button>
        </>
    );
}

interface ISaleOverviewProps {
    products: INewSaleProduct[];
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setCurrentSaleProducts: Dispatch<SetStateAction<INewSaleProduct[]>>;
    incrementProduct: (product: IProduct | INewSaleProduct) => void;
    decrementProduct: (product: IProduct | INewSaleProduct) => void;
    channel: ChannelType;
}

function SaleOverview(props: ISaleOverviewProps) {
    const { user } = useUser();
    const { create } = useSales(props.channel);

    const saleTotal = props.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );

    async function finishSale() {
        if (!user || !user.id) {
            toast.error("Du skal være logget ind for at oprette et salg");
            return;
        }
        const sale: INewSale = {
            products: props.products,
            user_id: user.id
        };
        void create(sale);
        setTimeout(() => {
            props.setIsOpen(false);
            props.setCurrentSaleProducts([]);
        }, 500);
    }

    function resetSale() {
        props.setCurrentSaleProducts([]);
        props.setIsOpen(false);
    }

    return (
        <>
            <div className="mt-40 flex max-md:flex-col gap-4 min-h-[calc(100vh-300px)]">
                <div className="fixed top-20 max-md:w-full md:left-20 md:right-20 flex gap-4 bg-next-blue p-4 justify-between">
                    <h2 className="text-2xl text-next-darker-orange font-bold">
                        SALG
                    </h2>
                    <button
                        className="btn-blue flex justify-center items-center gap-2"
                        onClick={() => props.setIsOpen(false)}
                    >
                        <FaArrowLeft /> Tilbage
                    </button>
                </div>
                <div className="flex flex-col gap-4 w-full md:mr-[400px]">
                    {props.products.length === 0 && (
                        <div className="flex flex-col justify-center items-center p-8 h-full ml-[400px]">
                            <FaShoppingCart className="text-8xl text-center" />
                            <p className="text-center">
                                Der er ikke tilføjet nogen produkter til salg
                            </p>
                        </div>
                    )}
                    {props.products.length !== 0 && (
                        <ProductList>
                            {props.products.map((product) => (
                                <ProductRow
                                    key={product.id}
                                    product={product}
                                    increment={() =>
                                        props.incrementProduct(product)
                                    }
                                    decrement={() =>
                                        props.decrementProduct(product)
                                    }
                                />
                            ))}
                        </ProductList>
                    )}
                </div>
                {props.products.length !== 0 && (
                    <div className="md:fixed max-md:right-0 md:right-20 flex flex-col justify-center gap-4 p-4 bg-next-white border border-next-blue h-80">
                        <div className="w-80">
                            <h2 className="text-2xl font-bold">Total</h2>
                            <p className="text-2xl text-right">
                                {props.products.reduce(
                                    (a, product) => a + product.quantity,
                                    0
                                )}{" "}
                                produkter
                            </p>
                            <p className="text-2xl font-semibold text-right">
                                {formatPrice(saleTotal)}
                            </p>
                        </div>
                        <SaleButtons
                            submit={finishSale}
                            reset={resetSale}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default SaleOverview;
