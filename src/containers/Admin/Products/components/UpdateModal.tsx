import type { IUpdateProduct } from "../../../../types/products.types.ts"
import type { Dispatch, SetStateAction } from "react"
import ProductForm, { type IProductFormData } from "./ProductForm.tsx"
import Modal from "../../../../components/modal.tsx"
import type { IModalProps } from "./CreateModal.tsx"
import toast from "react-hot-toast"
import { IProductState } from "../ProductOverview.tsx"

interface IUpdateModalProps extends IModalProps {
    productState: IProductState
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

function UpdateModal(props: IUpdateModalProps) {
    const handleUpdate = async (data: IProductFormData): Promise<void> => {
        if (!props.productState.selectedProduct) {
            toast.error("Fejl ved redigering af produkt")
            return
        }
        const updatedProduct: IUpdateProduct = {
            id: props.productState.selectedProduct.id,
            name: `${data.name || ""}, ${data.amount || ""}`,
            price: Number(data.price) || 0,
            stock: Number(data.stock) || 0,
            channel: props.channel
        }
        void props.productState.update(updatedProduct)
        props.setIsOpen(false)
        props.categoryState.setSelectedCategories([])
        props.productState.setSelectedProduct(null)
        toast.success("Produktet er opdateret")
    }

    return (
        <Modal>
            <ProductForm
                setSelectedCategories={
                    props.categoryState.setSelectedCategories
                }
                title={"Redigér Produkt"}
                handleCategoryChange={props.categoryState.handleCategoryChange}
                onSubmit={handleUpdate}
                products={props.productState.products}
                selectedProduct={props.productState.selectedProduct}
                selectedCategories={props.categoryState.selectedCategories}
                setIsOpenModal={props.setIsOpen}
            />
        </Modal>
    )
}

export default UpdateModal
export type {IUpdateModalProps};
