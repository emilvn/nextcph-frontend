import PageLayout from "../../components/layout.tsx";
import type { ChannelType } from "../../types/channel.types.ts";
import useSales from "../../hooks/useSales.ts";
import { LoadingPage, LoadingSpinner } from "../../components/loading.tsx";
import type { ISale } from "../../types/sales.types.ts";
import type { ISaleProduct } from "../../types/products.types.ts";
import { useUser } from "@clerk/clerk-react";
import type { UserResource } from "@clerk/types";
import {
    type Dispatch,
    ReactNode,
    type SetStateAction,
    useEffect,
    useState
} from "react";
import { convertToDanishTime, formatPrice } from "../../helpers/formatting.ts";
import { calculateProductsTotalPrice } from "../../helpers/calculate.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoIosArrowDown } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa";
import { groupSalesByDate } from "../../helpers/dashboard.ts";

interface ButtonFilterSalesProps {
    user: UserResource | null | undefined;
    setUserId: Dispatch<SetStateAction<string | undefined>>;
}

function ButtonFilterSales({ user, setUserId }: ButtonFilterSalesProps) {
    const [isMySalesToggleClicked, setMySalesToggleClicked] = useState(false);
    const [buttonText, setButtonText] = useState("Mine salg");

    if (!user) return <div>Bruger ikke fundet...</div>;

    function toggleMySales() {
        if (isMySalesToggleClicked) {
            setUserId(undefined);
            setButtonText("Mine salg");
        } else {
            setUserId(user?.id);
            setButtonText("Alle salg");
        }
        setMySalesToggleClicked(!isMySalesToggleClicked);
    }

    return (
        <button
            onClick={toggleMySales}
            className="btn-blue w-48 text-2xl"
        >
            {buttonText}
        </button>
    );
}

function GroupedSales({
    group,
    children
}: {
    group: string;
    children: ReactNode;
}) {
    return (
        <div className="bg-next-white">
            <h2 className="mt-10 text-3xl font-bold bg-next-blue text-next-white p-2 cursor-pointer">
                {group}
            </h2>
            <div className="flex-col gap-[1px] bg-white">{children}</div>
        </div>
    );
}

function SaleList({ currentSales }: { currentSales: ISale[] }) {
    const groupedSales: { [key: string]: ISale[] } = groupSalesByDate({
        sales: currentSales
    });
    return (
        <div className="flex flex-col gap-[1px] lg:w-1/2">
            {Object.entries(groupedSales).map(([group, salesInGroup]) => (
                <GroupedSales
                    group={group}
                    key={group}
                >
                    {salesInGroup.map((sale) => (
                        <Sale
                            key={sale.id}
                            sale={sale}
                        />
                    ))}
                </GroupedSales>
            ))}
        </div>
    );
}

function Sale({ sale }: { sale: ISale }) {
    const [open, setOpen] = useState(false);
    const totalPrice = sale.products.reduce(
        (acc, product) =>
            acc +
            calculateProductsTotalPrice(
                product.product.price,
                product.product_quantity
            ),
        0
    );

    return (
        <div className="bg-next-white pb-4">
            <div
                className="p-2 text-2xl font-semibold text-next-blue flex justify-between border-b-2 border-next-grey bg-next-white cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div>Kl. {convertToDanishTime(sale.created_at)}</div>
                <div>
                    <span className="text-next-grey">
                        total: {formatPrice(totalPrice)}
                    </span>
                    <IoIosArrowDown
                        className={`inline-block ml-2 transition-transform ${
                            open ? "transform rotate-180" : ""
                        }`}
                    />
                </div>
            </div>
            <table className={`w-full ${open ? "table" : "hidden"}`}>
                <thead>
                    <tr className="text-left">
                        <th>Produkt</th>
                        <th>Antal</th>
                        <th>Pris</th>
                        <th>Pris i alt</th>
                    </tr>
                </thead>
                <tbody>
                    {sale.products.map((product) => (
                        <Product
                            key={product.product.id}
                            product={product}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Product({ product }: { product: ISaleProduct }) {
    return (
        <tr className="text-next-blue border-y border-white font-semibold">
            <td className="w-[32rem] p-1">{product.product.name}</td>
            <td className="w-20">{product.product_quantity} stk.</td>
            <td>{formatPrice(product.product.price)}</td>
            <td>
                {formatPrice(product.product.price * product.product_quantity)}
            </td>
        </tr>
    );
}

function Header({ children }: { children: ReactNode }) {
    return (
        <div className="z-10 bg-next-blue p-2 fixed top-20 left-20 right-20 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-next-darker-orange">
                Salgshistorik
            </h1>
            {children}
        </div>
    );
}

function NoSales() {
    return (
        <div className="flex flex-col justify-center items-center p-8 min-h-[calc(100vh-300px)]">
            <FaMoneyBill className="text-8xl text-center" />
            <p className="text-center">Ingen salg endnu...</p>
        </div>
    );
}

function SaleHistory({ channel }: { channel: ChannelType }) {
    const { sales, isLoading, setPage, hasMore, setUserId, userId } =
        useSales(channel);
    const { user } = useUser();
    const [currentSales, setCurrentSales] = useState<ISale[]>([]);

    useEffect(() => {
        if (userId)
            setCurrentSales(sales.filter((sale) => sale.user_id === userId));
        else setCurrentSales(sales);
    }, [sales, userId]);

    if (isLoading) return <LoadingPage />;

    function fetchNextPage() {
        setTimeout(() => {
            setPage((prevPage) => prevPage + 1);
        }, 1000);
    }

    return (
        <PageLayout>
            <Header>
                <ButtonFilterSales
                    user={user}
                    setUserId={setUserId}
                />
            </Header>
            {!sales || (currentSales.length === 0 && <NoSales />)}
            {currentSales.length > 0 && (
                <InfiniteScroll
                    dataLength={currentSales.length}
                    next={fetchNextPage}
                    hasMore={hasMore}
                    className="mt-28 border-b bg-next-white"
                    style={{ overflow: "hidden" }}
                    endMessage={
                        <div className="flex justify-center items-center p-4 text-next-grey lg:w-1/2">
                            Ikke flere salg at vise...
                        </div>
                    }
                    loader={
                        <div className="flex justify-center items-center p-4 lg:w-1/2">
                            <LoadingSpinner size={48} />
                        </div>
                    }
                >
                    <SaleList currentSales={currentSales} />
                </InfiniteScroll>
            )}
        </PageLayout>
    );
}

export default SaleHistory;
