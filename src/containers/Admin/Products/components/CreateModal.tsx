import type { Dispatch, SetStateAction } from "react";
import type {
    INewProduct,
    IProduct
} from "../../../../types/products.types.ts";
import ProductForm from "./ProductForm.tsx";
import Modal from "../../../../components/modal.tsx";
import toast from "react-hot-toast";
import type { IModalProps, IProductFormData } from "../types.ts";

interface ICreateModalProps extends IModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    create: (product: INewProduct) => Promise<void>;
    products: IProduct[];
}

function CreateModal(props: ICreateModalProps) {
    const handleSubmit = async (data: IProductFormData): Promise<void> => {
        const newProduct: INewProduct = {
            name: `${data.name || ""}, ${data.amount || ""}`,
            price: Number(data.price) || 0,
            stock: Number(data.stock) || 0,
            channel: props.channel,
            categories: data.categories
        };
        void props.create(newProduct);
        props.setIsOpen(false);
        toast.success("Produkt oprettet");
        props.categoryState.setSelectedCategories([]);
    };

    return (
        <Modal>
            <ProductForm
                setSelectedCategories={
                    props.categoryState.setSelectedCategories
                }
                title={"Tilføj Produkt"}
                selectedCategories={props.categoryState.selectedCategories}
                handleCategoryChange={props.categoryState.handleCategoryChange}
                onSubmit={handleSubmit}
                products={props.products}
                setIsOpenModal={props.setIsOpen}
            />
        </Modal>
    );
}

export default CreateModal;
export type { ICreateModalProps };
