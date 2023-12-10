import PageLayout from "../../components/layout.tsx"
import type { ChannelType } from "../../types/channel.types.ts"
import useProducts from "../../hooks/useProducts.ts"
import Loading from "../../components/loading.tsx"
import type { INewSaleProduct, IProduct } from "../../types/products.types.ts"
import { IoFilter, IoSearchOutline } from "react-icons/io5"
import {
    getCategories,
    getProductsWithCategory
} from "../../helpers/categories.ts"
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa"
import {
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useEffect,
    useState
} from "react"
import { formatPrice } from "../../helpers/formatting.ts"
import { IoIosArrowDown } from "react-icons/io"
import SaleOverview from "./SaleOverview.tsx"
import toast from "react-hot-toast"

interface searchProps {
    setSearch: Dispatch<SetStateAction<string>>
    onClick: () => void
}

function SearchBar(props: searchProps) {
    return (
        <div className="flex items-center">
            <div
                className="bg-white p-4 hover:bg-next-white cursor-pointer border-r-2"
                onClick={props.onClick}
            >
                <IoFilter className="text-next-blue w-full text-2xl" />
            </div>
            <input
                type="text"
                placeholder="SØG EFTER PRODUKT"
                className="p-4 outline-none w-80 placeholder:text-next-blue placeholder:font-semibold"
                onChange={(e) => props.setSearch(e.target.value)}
            />
            <div className="bg-white p-4">
                <IoSearchOutline className="text-next-blue w-full text-2xl" />
            </div>
        </div>
    )
}

function NavCategory({ category }: { category: string }) {
    return (
        <a
            href={`#${category}`}
            className="btn-blue w-full"
        >
            {category}
        </a>
    )
}

function CategoriesNav({ categories }: { categories: string[] }) {
    return (
        <div className="flex flex-col gap-4 items-start w-3/4 overflow-y-auto overscroll-none max-h-[calc(100vh-200px)]">
            {categories.map((category) => (
                <NavCategory
                    key={category}
                    category={category}
                />
            ))}
        </div>
    )
}

interface searchAndFilterProps {
    categories: string[]
    setSearch: Dispatch<SetStateAction<string>>
}

function SearchAndFilter(props: searchAndFilterProps) {
    const [open, setOpen] = useState(false)
    return (
        <div className="z-0 flex flex-col items-center fixed bg-next-blue max-md:right-0 md:left-20 top-20 p-4 gap-8">
            <SearchBar
                setSearch={props.setSearch}
                onClick={() => setOpen(!open)}
            />
            {open && <CategoriesNav categories={props.categories} />}
        </div>
    )
}

interface ISaleButtonProps {
    onClick: () => void
    amount: number
}

function SaleButton(props: ISaleButtonProps) {
    return (
        <div className="bg-next-blue flex items-center justify-end gap-8 p-5">
            <button
                className="btn-blue text-2xl w-64 relative flex gap-2 justify-center items-center"
                onClick={props.onClick}
            >
                <FaShoppingCart className="text-2xl inline-block animate-pulse" />
                SALG{" "}
                <span className="text-next-grey text-sm">({props.amount})</span>
            </button>
        </div>
    )
}

function Header({ children }: { children: ReactNode }) {
    return (
        <div className="fixed md:left-20 md:right-20 top-20 z-20">
            {children}
        </div>
    )
}

interface IProductProps {
    product: IProduct | INewSaleProduct
    add: (product: IProduct | INewSaleProduct) => void
    remove: (product: IProduct | INewSaleProduct) => void
}

function Product(props: IProductProps) {
    function handleAddToSale() {
        props.add(props.product)
    }

    function handleRemoveFromSale() {
        props.remove(props.product)
    }

    return (
        <div className="p-4 w-full bg-next-white flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex flex-col text-lg font-semibold">
                    <h3 className="text-2xl font-bold">
                        {props.product.name ?? "-"}
                    </h3>
                    <p>Lager: {props.product.stock ?? "-"} stk.</p>
                    <p>
                        Pris:{" "}
                        {props.product.price
                            ? formatPrice(props.product.price)
                            : "-"}
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        className="btn-white text-xl"
                        onClick={handleAddToSale}
                    >
                        <FaPlus className="text-xl inline-block" /> Tilføj til
                        salg
                    </button>
                    <button
                        className="btn-white text-xl"
                        onClick={handleRemoveFromSale}
                    >
                        <FaMinus className="text-xl inline-block" /> Fjern fra
                        salg
                    </button>
                </div>
            </div>
        </div>
    )
}

interface ICategoryProps {
    category: string
    children: ReactNode
}

function Category(props: ICategoryProps) {
    const [open, setOpen] = useState(true)

    function toggleOpen() {
        setOpen(!open)
    }

    return (
        <div
            id={props.category}
            className="scroll-mt-40 w-full"
        >
            <h2
                className="text-2xl p-4 font-bold bg-next-blue mb-[1px] w-full text-next-darker-orange text-center cursor-pointer"
                onClick={toggleOpen}
            >
                {props.category}
                <IoIosArrowDown
                    className={`z-0 inline-block ml-4 transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </h2>
            <div
                className={`flex-col w-full gap-[1px] ${
                    open ? "flex" : "hidden"
                }`}
            >
                {props.children}
            </div>
        </div>
    )
}

function Products({ channel }: { channel: ChannelType }) {
    const localStorageSale = localStorage.getItem("sale")
    const initialSaleProducts = localStorageSale
        ? JSON.parse(localStorageSale)
        : []

    const { products, loadProducts, isLoading } = useProducts(channel)

    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
    const [isOpenSales, setIsOpenSales] = useState(false)
    const [search, setSearch] = useState("")
    const [currentSaleProducts, setCurrentSaleProducts] =
        useState<INewSaleProduct[]>(initialSaleProducts)

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        setFilteredProducts(filtered)
    }, [products, search])

    useEffect(() => {
        loadProducts()
        setFilteredProducts(products)
    }, [isOpenSales])

    useEffect(() => {
        localStorage.setItem("sale", JSON.stringify(currentSaleProducts))
    }, [currentSaleProducts])

    // Reset sale if channel is changed
    useEffect(() => {
        if (currentSaleProducts[0]?.channel !== channel) {
            setCurrentSaleProducts([])
        }
    }, [])

    if (isLoading) return <Loading.LoadingPage />
    if (!products || products.length === 0)
        return <PageLayout>No products found...</PageLayout>

    const categories = getCategories(filteredProducts)

    function addToSale(product: IProduct | INewSaleProduct) {
        const productInSale = currentSaleProducts.find(
            (p) => p.id === product.id
        )
        if (
            product.stock === 0 ||
            (!!productInSale && productInSale.quantity >= product.stock)
        ) {
            toast.error("Der er ikke flere af dette produkt på lager")
        } else if (!!productInSale && productInSale.quantity < product.stock) {
            productInSale.quantity++
            toast.success(product.name + " tilføjet til salg")
        } else {
            currentSaleProducts.push({
                name: product.name,
                price: product.price,
                id: product.id,
                quantity: 1,
                channel: product.channel,
                stock: product.stock
            })
            toast.success(product.name + " tilføjet til salg")
        }
        setCurrentSaleProducts([...currentSaleProducts])
    }

    function removeFromSale(product: IProduct | INewSaleProduct) {
        const productInSale = currentSaleProducts.find(
            (p) => p.id === product.id
        )
        if (productInSale) {
            productInSale.quantity--
            toast.success(product.name + " fjernet fra salg")
            if (productInSale.quantity <= 0) {
                const index = currentSaleProducts.indexOf(productInSale)
                currentSaleProducts.splice(index, 1)
            }
        }
        setCurrentSaleProducts([...currentSaleProducts])
    }

    return (
        <PageLayout>
            {isOpenSales && (
                <SaleOverview
                    products={currentSaleProducts}
                    setIsOpen={setIsOpenSales}
                    setCurrentSaleProducts={setCurrentSaleProducts}
                    incrementProduct={addToSale}
                    channel={channel}
                    decrementProduct={removeFromSale}
                />
            )}
            {!isOpenSales && (
                <>
                    <Header>
                        <SaleButton
                            onClick={() => setIsOpenSales(true)}
                            amount={currentSaleProducts.reduce(
                                (acc, cur) => acc + cur.quantity,
                                0
                            )}
                        />
                        <SearchAndFilter
                            categories={categories}
                            setSearch={setSearch}
                        />
                    </Header>
                    <div className="mt-40 flex flex-col gap-[1px] w-full">
                        {categories.map((category) => (
                            <Category
                                key={category}
                                category={category}
                            >
                                {getProductsWithCategory(
                                    products,
                                    category
                                ).map((product: IProduct) => (
                                    <Product
                                        key={product.id}
                                        product={product}
                                        add={addToSale}
                                        remove={removeFromSale}
                                    />
                                ))}
                            </Category>
                        ))}
                    </div>
                </>
            )}
        </PageLayout>
    )
}

export default Products
