import PageLayout from '../../../components/layout.tsx';
import type {ChannelType} from '../../../types/channel.types.ts';
import useProducts from '../../../hooks/useProducts.ts';
import type {INewProduct, IProduct, IUpdateProduct} from '../../../types/products.types.ts';
import loading from '../../../components/loading.tsx';
import {type Dispatch, type SetStateAction, useState} from 'react';
import toast from 'react-hot-toast';
import type {ActionMeta, Options} from "react-select"
import UpdateModal from "./UpdateModal.tsx";
import CreateModal from "./CreateModal.tsx";
import DeleteModal from "./DeleteModal.tsx";
import ProductTable from "./ProductTable.tsx";
import StyledToaster from "../../../components/Toaster.tsx";

function Header(props: { onClick: () => void }) {
    return (<div className="fixed top-20 left-20 right-20 flex p-4 bg-next-blue items-center justify-between">
        <h2 className="text-3xl font-bold text-next-darker-orange">PRODUKTER</h2>
        <button
            //erstat hele denne style med btn-blue
            className="border-[1.5px] border-next-darker-orange p-4 bg-next-blue text-next-orange font-bold hover:bg-next-darker-orange hover:text-next-blue transition-colors"
            onClick={props.onClick}
        >
            Tilføj Produkt
        </button>
    </div>);
}

interface IModalsProps {
    channel: ChannelType;
    modalStates: {
        isOpenCreate: boolean;
        isOpenUpdate: boolean;
        isOpenDelete: boolean;
        setIsOpenCreate: Dispatch<SetStateAction<boolean>>;
        setIsOpenUpdate: Dispatch<SetStateAction<boolean>>;
        setIsOpenDelete: Dispatch<SetStateAction<boolean>>;
    };
    categoryState: {
        selectedCategories: string[];
        setSelectedCategories: Dispatch<SetStateAction<string[]>>;
        handleCategoryChange: (newValue: Options<{ value: string }>, actionMeta: ActionMeta<{ value: string }>) => void;
    };
    notifiers: {
        notifySuccess: (message: string) => string;
        notifyError: (message: string) => string;
    };
    productState: {
        products: IProduct[];
        create: (product: INewProduct) => Promise<void>;
        update: (product: IUpdateProduct) => Promise<void>;
        destroy: (product: IProduct) => Promise<void>;
        selectedProduct: IProduct | null;
        setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
        productToDelete: IProduct | null;
        setProductToDelete: Dispatch<SetStateAction<IProduct | null>>;
    }
}
function Modals(props: IModalsProps) {
    const {modalStates, categoryState, notifiers, productState, channel} = props;
    return <>
        {modalStates.isOpenCreate && (<CreateModal
            categoryState={categoryState}
            setIsOpenCreate={modalStates.setIsOpenCreate}
            notifiers={notifiers}
            create={productState.create}
            products={productState.products}
            channel={channel}
        />)}
        {modalStates.isOpenUpdate && !!productState.selectedProduct && (<UpdateModal
                categoryState={categoryState}
                setIsOpenUpdate={modalStates.setIsOpenUpdate}
                notifiers={notifiers}
                channel={channel}
                productState={productState}
            />
        )}
        {modalStates.isOpenDelete && (<DeleteModal
            setIsOpenDelete={modalStates.setIsOpenDelete}
            productState={productState}
            notifiers={notifiers}
        />)}
    </>;
}

function ProductOverview({channel}: { channel: ChannelType }) {
    const {products, isLoading, destroy, create, update} = useProducts(channel);

    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);


    const notifySuccess = (message: string) => toast.success(message)
    const notifyError = (message: string) => toast.error(message)
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
    const notifiers = {
        notifySuccess, notifyError
    }

    return (
        <PageLayout>
            <Header onClick={() => setIsOpenCreate(true)}/>
            <div className="mt-40">
                {isLoading && <loading.LoadingSpinner/>}
                {!isLoading && (<ProductTable
                    channel={channel}
                    setSelectedProduct={setSelectedProduct}
                    products={products}
                    setSelectedCategories={setSelectedCategories}
                    setShowUpdateModal={setIsOpenUpdate}
                    setProductToDelete={setProductToDelete}
                    setShowDeleteConfirmation={setIsOpenDelete}
                />)}
            </div>
            <Modals
                modalStates={modalStates}
                categoryState={categoryState}
                notifiers={notifiers}
                productState={productState}
                channel={channel}
            />
            <StyledToaster/>
        </PageLayout>
    );
}

export default ProductOverview;
