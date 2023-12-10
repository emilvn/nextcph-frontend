import type { ChannelType } from "../../../types/channel.types.ts";
import type { IProduct } from "../../../types/products.types.ts";
import PageLayout from "../../../components/layout.tsx";
import useProducts from "../../../hooks/useProducts.ts";
import loading from "../../../components/loading.tsx";
import { useState } from "react";
import UpdateModal from "./components/UpdateModal.tsx";
import CreateModal from "./components/CreateModal.tsx";
import DeleteModal from "./components/DeleteModal.tsx";
import ProductTable from "./components/ProductTable.tsx";
import StyledToaster from "../../../components/toaster.tsx";
import type {
    HandleCategoryChange,
    ICategoryState,
    IProductState,
    IModalStates
} from "./types.ts";

function ProductOverview({ channel }: { channel: ChannelType }) {
    const { products, isLoading, destroy, create, update, setSortBy, sortBy } =
        useProducts(channel);

    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
        null
    );
    const [productToDelete, setProductToDelete] = useState<IProduct | null>(
        null
    );

    const handleCategoryChange: HandleCategoryChange = (
        newValue,
        actionMeta
    ) => {
        if (
            actionMeta.action === "select-option" ||
            actionMeta.action === "create-option"
        ) {
            setSelectedCategories(
                newValue.map((option: { value: string }) => option.value)
            );
        }
    };

    const modalStates: IModalStates = {
        isOpenCreate,
        isOpenUpdate,
        isOpenDelete,
        setIsOpenCreate,
        setIsOpenUpdate,
        setIsOpenDelete
    };
    const productState: IProductState = {
        products,
        create,
        update,
        destroy,
        selectedProduct,
        setSelectedProduct,
        productToDelete,
        setProductToDelete,
        setSortBy,
        sortBy
    };
    const categoryState: ICategoryState = {
        selectedCategories,
        setSelectedCategories,
        handleCategoryChange
    };

    return (
        <PageLayout>
            {isLoading && <loading.LoadingSpinner />}
            {!isLoading && (
                <ProductTable
                    productState={productState}
                    modalStates={modalStates}
                    setSelectedCategories={setSelectedCategories}
                    openCreateButton={
                        <button
                            className="btn-blue col-span-2"
                            onClick={() => setIsOpenCreate(true)}
                        >
                            Tilføj Produkt
                        </button>
                    }
                />
            )}
            {isOpenCreate && (
                <CreateModal
                    categoryState={categoryState}
                    setIsOpen={setIsOpenCreate}
                    create={create}
                    products={products}
                    channel={channel}
                />
            )}
            {isOpenUpdate && !!productState.selectedProduct && (
                <UpdateModal
                    categoryState={categoryState}
                    setIsOpen={setIsOpenUpdate}
                    channel={channel}
                    productState={productState}
                />
            )}
            {isOpenDelete && (
                <DeleteModal
                    setIsOpen={modalStates.setIsOpenDelete}
                    productState={productState}
                />
            )}
            <StyledToaster />
        </PageLayout>
    );
}

export default ProductOverview;
