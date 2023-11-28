import type {ChannelType} from '../../../types/channel.types.ts';
import type {IProduct} from '../../../types/products.types.ts';
import type {ActionMeta, Options} from "react-select"
import PageLayout from '../../../components/layout.tsx';
import useProducts from '../../../hooks/useProducts.ts';
import loading from '../../../components/loading.tsx';
import {useState} from 'react';
import UpdateModal from "./UpdateModal.tsx";
import CreateModal from "./CreateModal.tsx";
import DeleteModal from "./DeleteModal.tsx";
import ProductTable from "./ProductTable.tsx";
import StyledToaster from "../../../components/Toaster.tsx";

function Header(props: { onClick: () => void }) {
    return (<div className="fixed top-20 left-20 right-20 flex p-4 bg-next-blue items-center justify-between">
        <h2 className="text-3xl font-bold text-next-darker-orange">PRODUKTER</h2>
        <button
            //TODO: erstat hele denne style med btn-blue
            className="border-[1.5px] border-next-darker-orange p-4 bg-next-blue text-next-orange font-bold hover:bg-next-darker-orange hover:text-next-blue transition-colors"
            onClick={props.onClick}
        >
            Tilføj Produkt
        </button>
    </div>);
}

function ProductOverview({channel}: { channel: ChannelType }) {
    const {products, isLoading, destroy, create, update} = useProducts(channel);

    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

    const handleCategoryChange = (newValue: Options<{ value: string }>, actionMeta: ActionMeta<{ value: string }>) => {
        if (actionMeta.action === 'select-option' || actionMeta.action === 'create-option') {
            setSelectedCategories(newValue.map((option: { value: string }) => option.value));
        }
    };

    const modalStates = {
        isOpenCreate, isOpenUpdate, isOpenDelete,
        setIsOpenCreate, setIsOpenUpdate, setIsOpenDelete
    }
    const productState = {
        products, create, update, destroy, selectedProduct, setSelectedProduct, productToDelete, setProductToDelete
    }
    const categoryState = {
        selectedCategories, setSelectedCategories, handleCategoryChange
    }

    return (
        <PageLayout>
            <Header onClick={() => setIsOpenCreate(true)}/>
            <div className="mt-40">
                {isLoading && <loading.LoadingSpinner/>}
                {!isLoading && (
                    <ProductTable
                        productState={productState}
                        modalStates={modalStates}
                        setSelectedCategories={setSelectedCategories}
                    />
                )}
            </div>
            {isOpenCreate && (
                <CreateModal
                    categoryState={categoryState}
                    setIsOpenCreate={setIsOpenCreate}
                    create={create}
                    products={products}
                    channel={channel}
                />)
            }
            {isOpenUpdate && !!productState.selectedProduct && (
                <UpdateModal
                    categoryState={categoryState}
                    setIsOpenUpdate={setIsOpenUpdate}
                    channel={channel}
                    productState={productState}
                />)
            }
            {isOpenDelete && (
                <DeleteModal
                    setIsOpenDelete={modalStates.setIsOpenDelete}
                    productState={productState}
                />)
            }
            <StyledToaster/>
        </PageLayout>
    );
}

export default ProductOverview;