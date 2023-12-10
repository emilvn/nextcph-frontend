import type { IProduct } from "../../../../types/products.types.ts";
import {
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useState
} from "react";
import { formatPrice } from "../../../../helpers/formatting.ts";
import { type ISortByOption, SortBy } from "../../../../hooks/useProducts.ts";
import { IoArrowDown } from "react-icons/io5";
import { productPropertyDict } from "../../../../helpers/dicts.ts";
import { IModalStates, IProductState } from "../types.ts";

interface ITableHeadingProps {
    handleSortBy: (value: SortBy, ascending: boolean) => void;
    sortByOptions: ISortByOption;
    children: SortBy;
}
function TableHeading(props: ITableHeadingProps) {
    const [ascending, setAscending] = useState<boolean>(false);

    function handleClick() {
        setAscending(!ascending);
        props.handleSortBy(props.children, ascending);
    }

    return (
        <th
            className="p-2 border-next-blue border-x-2 cursor-pointer"
            onClick={handleClick}
        >
            {productPropertyDict[props.children]}{" "}
            <IoArrowDown
                className={`inline text-lg text-next-white
                ${props.sortByOptions.value === props.children ? "" : "hidden"}
                ${props.sortByOptions.ascending ? "" : "transform rotate-180"}`}
            />
        </th>
    );
}

interface IProductTableHeaderProps {
    children: ReactNode;
    sortState: {
        sortByOptions: ISortByOption;
        setSortByOptions: Dispatch<SetStateAction<ISortByOption>>;
    };
}
function ProductTableHeader({ sortState, children }: IProductTableHeaderProps) {
    const { sortByOptions, setSortByOptions } = sortState;

    const values = Object.values(SortBy);

    function handleSortBy(value: SortBy, ascending: boolean = true) {
        setSortByOptions({ value, ascending });
    }

    return (
        <thead className="text-2xl text-next-darker-orange bg-next-blue">
            <tr>
                {values.map((value) => (
                    <TableHeading
                        key={value}
                        handleSortBy={handleSortBy}
                        sortByOptions={sortByOptions}
                    >
                        {value}
                    </TableHeading>
                ))}
                <th
                    className="border-next-blue border-x-2"
                    colSpan={2}
                >
                    {children}
                </th>
            </tr>
        </thead>
    );
}

interface IProductRowProps {
    product: IProduct;
    handleEdit: (product: IProduct) => void;
    handleDelete: (product: IProduct) => void;
}

function ProductRow(props: IProductRowProps) {
    const productNameArr = props.product.name.split(", ");
    const productName = productNameArr[0];
    const productAmount = productNameArr[1];
    const { stock, min_stock, max_stock } = props.product;

    return (
        <tr
            key={props.product.id}
            className="border-b text-xl text-next-blue"
        >
            <td className="p-4 text-xl font-bold">{productName}</td>
            <td className="p-4">{productAmount ? productAmount : "1 stk"}</td>
            <td className="p-4">{formatPrice(props.product.price)}</td>
            <td
                className={`p-4 border-l-2 text-center font-semibold ${
                    stock < min_stock || stock > max_stock
                        ? "text-red-700"
                        : "text-green-600"
                }`}
            >
                {stock}
            </td>
            <td className="p-4 text-center">{min_stock}</td>
            <td className="p-4 border-r-2 text-center">{max_stock}</td>
            <td className="p-4 border-r-2">
                {props.product.categories.map((category) => (
                    <div
                        key={category.category.id}
                        className="bg-next-grey text-next-white rounded-md m-0.5 px-2 py-1 text-sm text-center"
                    >
                        {category.category.name}
                    </div>
                ))}
            </td>
            <td className="pl-4">
                <button
                    className="btn-white w-24"
                    onClick={() => props.handleEdit(props.product)}
                >
                    Rediger
                </button>
            </td>
            <td>
                <button
                    className="btn-white w-24"
                    onClick={() => props.handleDelete(props.product)}
                >
                    Slet
                </button>
            </td>
        </tr>
    );
}

interface IProductTableProps {
    productState: IProductState;
    modalStates: IModalStates;
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    openCreateButton: ReactNode;
}
function ProductTable(props: IProductTableProps) {
    const { modalStates, productState, setSelectedCategories } = props;

    const handleEdit = (product: IProduct) => {
        productState.setSelectedProduct(product);
        setSelectedCategories(
            product.categories.map((category) => category.category.name)
        );
        modalStates.setIsOpenUpdate(true);
    };
    const openDeleteConfirmation = (product: IProduct) => {
        productState.setProductToDelete(product);
        modalStates.setIsOpenDelete(true);
    };

    const handleDelete = (product: IProduct) => {
        openDeleteConfirmation(product);
    };

    const sortState = {
        sortByOptions: productState.sortBy,
        setSortByOptions: productState.setSortBy
    };

    return (
        <table className="bg-next-white w-full">
            <ProductTableHeader sortState={sortState}>
                {props.openCreateButton}
            </ProductTableHeader>
            <tbody>
                {productState.products &&
                    productState.products.map((product) => (
                        <ProductRow
                            key={product.id}
                            product={product}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
            </tbody>
        </table>
    );
}

export default ProductTable;
