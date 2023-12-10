import type { ChannelType } from "../../../../types/channel.types.ts"
import { type SubmitHandler, useForm } from "react-hook-form"
import type { IProduct } from "../../../../types/products.types.ts"
import { type Dispatch, type SetStateAction, useEffect } from "react"
import type { ActionMeta, Options } from "react-select"
import Creatable from "react-select/creatable"
import { FaCheck } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"
import { getCategories } from "../../../../helpers/categories.ts"

interface IProductFormData {
    name: string
    amount: string
    price: number
    stock: number
    min_stock: number
    max_stock: number
    channel: ChannelType
    categories: string[]
}

interface IProductFormProps {
    onSubmit: SubmitHandler<IProductFormData>
    products: IProduct[]
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
    handleCategoryChange: (
        newValue: Options<{ value: string }>,
        actionMeta: ActionMeta<{ value: string }>
    ) => void
    title: string
    selectedProduct?: IProduct | null
    selectedCategories: string[]
    setSelectedCategories: Dispatch<SetStateAction<string[]>>
}

function ProductForm(props: IProductFormProps) {
    const { register, handleSubmit, setValue, reset } =
        useForm<IProductFormData>()

    useEffect(() => {
        if (props.selectedProduct) {
            setValue("name", props.selectedProduct.name.split(", ")[0])
            setValue("amount", props.selectedProduct.name.split(", ")[1])
            setValue("price", props.selectedProduct.price)
            setValue("stock", props.selectedProduct.stock)
            setValue("min_stock", props.selectedProduct.min_stock)
            setValue("max_stock", props.selectedProduct.max_stock)
        }
    }, [props.selectedProduct, setValue])

    const submitForm: SubmitHandler<IProductFormData> = async (data) => {
        data.categories = props.selectedCategories
        await props.onSubmit(data)
        props.setIsOpenModal(false)
        reset()
        props.setSelectedCategories([])
    }

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col gap-2 max-w-[500px] text-next-blue font-semibold"
        >
            <h2 className="text-center text-2xl text-next-blue">
                {props.title}
            </h2>
            <div className="border p-2 gap-2 flex flex-col rounded">
                <label>Produkt navn</label>
                <input
                    className="border border-gray-300 p-2 w-full"
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Navn på produkt..."
                />
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <label>Mængde (fx. 500ml)</label>
                        <input
                            className="border border-gray-300 p-2 w-full"
                            type="text"
                            {...register("amount", { required: true })}
                            placeholder="Mængde på produkt..."
                        />
                    </div>
                    <div className="w-1/2">
                        <label>Pris</label>
                        <input
                            className="border border-gray-300 p-2 w-full"
                            type="number"
                            {...register("price", { required: true })}
                            placeholder="Pris i DKK..."
                        />
                    </div>
                </div>
            </div>
            <div className="border p-2 flex flex-col gap-2 rounded">
                <label>Lagerbeholdning</label>
                <input
                    className="border border-gray-300 p-2 w-full"
                    type="number"
                    {...register("stock", { required: true })}
                    placeholder="Antal af produkt på lager..."
                />
                <div className="flex gap-2">
                    <div>
                        <label>Min. lagerbeholdning</label>
                        <input
                            className="border border-gray-300 p-2 w-full"
                            type="number"
                            {...register("min_stock", { required: true })}
                            placeholder="Minimum antal på lager..."
                        />
                    </div>
                    <div>
                        <label>Max. lagerbeholdning</label>
                        <input
                            className="border border-gray-300 p-2 w-full"
                            type="number"
                            {...register("max_stock", { required: true })}
                            placeholder="Max antal på lager..."
                        />
                    </div>
                </div>
            </div>
            {props.title !== "Redigér Produkt" && (
                <>
                    <label>Kategorier</label>
                    <Creatable
                        isMulti={true}
                        onChange={props.handleCategoryChange}
                        value={props.selectedCategories?.map((category) => ({
                            value: category,
                            label: category
                        }))}
                        options={getCategories(props.products).map(
                            (categoryName, index) => ({
                                value: categoryName,
                                label: categoryName,
                                key: index
                            })
                        )}
                    />
                </>
            )}
            <div className="flex justify-around mt-10">
                <button
                    className="btn-orange px-4 py-2"
                    type="submit"
                >
                    <FaCheck size={25} />
                </button>
                <button
                    className="btn-blue px-4 py-2"
                    onClick={() => {
                        props.setIsOpenModal(false)
                        props.setSelectedCategories([])
                    }}
                >
                    <IoCloseSharp size={25} />
                </button>
            </div>
        </form>
    )
}

export default ProductForm;
export type {IProductFormData};