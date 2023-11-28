import PageLayout from '../../components/layout.tsx';
import type {ChannelType} from '../../types/channel.types.ts';
import useProducts from '../../hooks/useProducts.ts';
import type {IProduct, INewProduct, IUpdateProduct} from '../../types/products.types.ts';
import loading from '../../components/loading.tsx';
import {type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction, useState} from 'react';
import Creatable from 'react-select/creatable';
import toast, {Toaster} from 'react-hot-toast';
import {FaCheck} from "react-icons/fa";
import {IoCloseSharp} from "react-icons/io5";
import type {ActionMeta, Options} from "react-select"

interface INewProductData {
    name: string;
    amount: string;
    price: number;
    stock: number;
    channel: ChannelType;
    categories: string[];
}

interface ICreateModalProps {
    selectedCategories: string[];
    setShowCreateModal: Dispatch<SetStateAction<boolean>>;
    setNewProductData: Dispatch<SetStateAction<INewProductData>>;
    notifySuccess: (message: string) => string;
    notifyError: (message: string) => string;
    newProductData: INewProductData;
    create: (product: INewProduct) => Promise<void>;
    channel: ChannelType;
    handleFormInput: (e: ChangeEvent<HTMLInputElement>) => void;
    handleCategoryChange: (newValue: Options<{ value: string }>, actionMeta: ActionMeta<{ value: string }>) => void;
    products: IProduct[];
}

interface IDeleteModalProps {
    destroy: (product: IProduct) => Promise<void>;
    setShowDeleteConfirmation: Dispatch<SetStateAction<boolean>>;
    notifySuccess: (message: string) => string;
    notifyError: (message: string) => string;
    setProductToDelete: Dispatch<SetStateAction<IProduct | null>>;
    productToDelete: IProduct | null;
    channel: ChannelType;
}

interface IUpdateModalProps {
    selectedCategories: string[];
    newProductData: INewProductData;
    products: IProduct[];
    handleCategoryChange: (newValue: Options<{ value: string }>, actionMeta: ActionMeta<{ value: string }>) => void;
    channel: ChannelType;
    notifySuccess: (message: string) => string;
    notifyError: (message: string) => string;
    update: (product: IUpdateProduct) => Promise<void>;
    selectedProduct: IUpdateProduct | null;
    setSelectedProduct: Dispatch<SetStateAction<IUpdateProduct | null>>;
    handleFormInput: (e: ChangeEvent<HTMLInputElement>) => void;
    setNewProductData: Dispatch<SetStateAction<INewProductData>>;
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}

interface IProductTableProps {
    products: IProduct[];
    setSelectedProduct: Dispatch<SetStateAction<IUpdateProduct | null>>;
    setNewProductData: Dispatch<SetStateAction<INewProductData>>;
    channel: ChannelType;
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
    setProductToDelete: Dispatch<SetStateAction<IProduct | null>>;
    setShowDeleteConfirmation: Dispatch<SetStateAction<boolean>>;

}

function CreateModal(props: ICreateModalProps) {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const newProduct: INewProduct = {
            name: props.newProductData.name + ", " + props.newProductData.amount,
            price: props.newProductData.price,
            stock: props.newProductData.stock,
            channel: props.newProductData.channel,
            categories: props.selectedCategories,
        }

        try {
            await props.create(newProduct);
            props.setShowCreateModal(false);
            props.setNewProductData({name: '', amount: "", price: 0, stock: 0, categories: [], channel: props.channel});
            props.notifySuccess('Produkt oprettet')
        } catch (e) {
            console.error(e);
            props.notifyError('fejl ved oprettelse af produkt')
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-md"></div>
            <div className="bg-white p-8 rounded-md relative z-10">
                <form onSubmit={handleSubmit}>
                    <label className="block mb-4">
                        Navn: <input className="border border-gray-300 p-2 w-full"
                                     type="text"
                                     name="name"
                                     onChange={props.handleFormInput}/>
                    </label>
                    <label className="block mb-4">
                        Mængde: <input className="border border-gray-300 p-2 w-full"
                                       type="text"
                                       name="amount"
                                       onChange={props.handleFormInput}/>
                    </label>
                    <label className="block mb-4">
                        Pris: <input className="border border-gray-300 p-2 w-full"
                                     type="number"
                                     name="price"
                                     onChange={props.handleFormInput}/>
                    </label>
                    <label className="block mb-4">
                        Lager: <input className="border border-gray-300 p-2 w-full"
                                      type="number"
                                      name="stock"
                                      onChange={props.handleFormInput}/>
                    </label>
                    <label className="block mb-4">
                        Kategori:
                        <Creatable
                            isMulti={true}
                            onChange={props.handleCategoryChange}
                            options={Array.from(new Set(props.products.flatMap(product =>
                                product.categories.map(category => category.category.name))))
                                .map((categoryName, index) => ({
                                    value: categoryName,
                                    label: categoryName,
                                    key: index
                                }))}/>
                    </label>
                    <div className="flex justify-around mt-20">
                        <button
                            className="bg-next-darker-orange text-next-blue py-2 px-4 rounded hover:bg-next-blue hover:text-next-orange"
                            type="submit"
                        >
                            <FaCheck size={25}/>
                        </button>
                        <button
                            className="bg-next-blue text-next-orange py-2 px-4 rounded hover:bg-next-darker-orange hover:text-next-blue ml-4"
                            onClick={() => props.setShowCreateModal(false)}
                        >
                            <IoCloseSharp size={25}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function DeleteModal(props: IDeleteModalProps) {
    const closeDeleteConfirmation = () => {
        props.setProductToDelete(null);
        props.setShowDeleteConfirmation(false);
    };
    const confirmDelete = async () => {
        if (props.productToDelete) {
            await props.destroy(props.productToDelete);
            closeDeleteConfirmation();
            props.notifySuccess('Produktet er slettet')
        } else {
            props.notifyError('fejl ved sletning af produkt')
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-md"></div>
            <div className="bg-white p-8 rounded-md relative z-10">
                <h3 className="mb-4">Er du sikker på, at du vil slette dette produkt?</h3>
                <div className="flex justify-around mt-10">
                    <button
                        className="bg-next-darker-orange text-next-blue py-2 px-4 rounded hover:bg-next-blue hover:text-next-orange"
                        onClick={confirmDelete}
                    >
                        <FaCheck size={25}/>
                    </button>
                    <button
                        className="bg-next-blue text-next-orange py-2 px-4 rounded hover:bg-next-darker-orange hover:text-next-blue ml-4"
                        onClick={() => closeDeleteConfirmation()}
                    >
                        <IoCloseSharp size={25}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

function UpdateModal(props: IUpdateModalProps) {
    const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const updatedProduct: IUpdateProduct = {
            id: props.selectedProduct?.id || '',
            name: `${props.newProductData?.name || ''}, ${props.newProductData?.amount || ''}`,
            price: props.newProductData?.price || 0,
            stock: props.newProductData?.stock || 0,
            channel: props.newProductData?.channel || props.channel,
        };

        try {
            await props.update(updatedProduct);
            props.setShowUpdateModal(false);
            props.setNewProductData({name: '', amount: "", price: 0, stock: 0, categories: [], channel: props.channel});
            props.setSelectedCategories([]);
            props.setSelectedProduct(null);
            props.notifySuccess('Produktet er redigeret')
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-md"></div>
            <div className="bg-white p-8 rounded-md relative z-10">
                <form onSubmit={handleUpdate}>
                    <label className="block mb-4">
                        Name: <input className="border border-gray-300 p-2 w-full"
                                     type="text"
                                     name="name"
                                     value={props.newProductData.name}
                                     onChange={props.handleFormInput}/>
                    </label>
                    <label className="block mb-4">
                        Mængde: <input className="border border-gray-300 p-2 w-full"
                                       type="text"
                                       name="amount"
                                       value={props.newProductData.amount}
                                       onChange={props.handleFormInput}/>
                    </label>
                    <label className="block mb-4">
                        Pris: <input className="border border-gray-300 p-2 w-full"
                                     type="number"
                                     name="price"
                                     value={props.newProductData.price}
                                     onChange={props.handleFormInput}/>
                    </label>
                    <label className="block mb-4">
                        Lager: <input className="border border-gray-300 p-2 w-full"
                                      type="number"
                                      name="stock"
                                      value={props.newProductData.stock}
                                      onChange={props.handleFormInput}/>
                    </label>
                    <label className="block mb-4">
                        Kategorier:
                        <Creatable
                            isMulti={true}
                            value={props.selectedCategories.map(category => ({value: category, label: category}))}
                            onChange={props.handleCategoryChange}
                            options={Array.from(new Set(props.products.flatMap(product =>
                                product.categories.map(category => category.category.name))))
                                .map((categoryName, index) => ({
                                    value: categoryName,
                                    label: categoryName,
                                    key: index
                                }))}/>
                    </label>
                    <div className="flex justify-around mt-20">
                        <button
                            className="bg-next-darker-orange text-next-blue py-2 px-4 rounded hover:bg-next-blue hover:text-next-orange"
                            type="submit"
                        >
                            <FaCheck size={25}/>
                        </button>
                        <button
                            className="bg-next-blue text-next-orange py-2 px-4 rounded hover:bg-next-darker-orange hover:text-next-blue ml-4"
                            onClick={() => props.setShowUpdateModal(false)}
                        >
                            <IoCloseSharp size={25}/>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )

}

function ProductTableHeader() {
    return (
        <thead className="text-3xl">
            <tr>
                <th className="text-left p-2">Navn</th>
                <th className="text-left p-2">Mængde</th>
                <th className="text-left p-2">Pris</th>
                <th className="text-left p-2">Lager</th>
                <th className="text-left p-2">Kategori</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
    )
}

interface IProductRowProps {
    product: IProduct;
    handleEdit: (product: IProduct) => void;
    handleDelete: (product: IProduct) => void;
}
function ProductRow(props: IProductRowProps) {
    const {product, handleEdit, handleDelete} = props;
    return (
            <tr key={product.id} className="border-b text-xl text-next-blue">
                <td className="p-2">{product.name ? product.name.split(",")[0] : 'N/A'}</td>
                <td className="p-2">{product.name && product.name.split(",")[1] ? product.name.split(",")[1].trim() : 'N/A'}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">
                    <ul>
                        {product.categories.map((category) => (
                            <li key={category.category.id}>{category.category.name}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    <button
                        //erstat hele denne style med btn-white, på nær w-24
                        className="bg-next-white font-bold text-next-blue p-2 border-[1.5px] border-next-blue hover:bg-next-blue hover:text-next-white transition-colors w-24"
                        onClick={() => handleEdit(product)}
                    >
                        Rediger
                    </button>
                </td>
                <td>
                    <button
                        //erstat hele denne style med btn-white, på nær w-24
                        className="bg-next-white font-bold text-next-blue p-2 border-[1.5px] border-next-blue hover:bg-next-blue hover:text-next-white transition-colors w-24"
                        onClick={() => handleDelete(product)}
                    >
                        Slet
                    </button>
                </td>
            </tr>
    );
}
function ProductTable(props: IProductTableProps) {
    const handleEdit = (product: IProduct) => {
        props.setSelectedProduct(product);
        const nameWithoutAmount = product.name.split(',')[0].trim(); // Extract name without amount
        const amount = product.name.split(',')[1] ? product.name.split(',')[1].trim() : ''; // Extract amount if present
        props.setNewProductData({
            name: nameWithoutAmount,
            amount: amount,
            price: product.price,
            stock: product.stock,
            channel: props.channel,
            categories: [] /*change?*/
        });
        props.setSelectedCategories(product.categories.map(category => category.category.name));
        props.setShowUpdateModal(true);
    };

    const handleDelete = (product: IProduct) => {
        openDeleteConfirmation(product);
    };

    const openDeleteConfirmation = (product: IProduct) => {
        props.setProductToDelete(product);
        props.setShowDeleteConfirmation(true);
    };

    return (
        <table className="w-full">
            <ProductTableHeader/>
            <tbody>
            {props.products && props.products.map((product) => (
                <ProductRow
                    key={product.id}
                    product={product}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ))}

            </tbody>
        </table>
    )
}

function ProductOverview({channel}: {
    channel: ChannelType
}) {
    const {products, isLoading, destroy, create, update} = useProducts(channel);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [newProductData, setNewProductData] = useState<INewProductData>({
        name: '',
        amount: "",
        price: 0,
        stock: 0,
        channel: channel,
        categories: []
    });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IUpdateProduct | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

    //------------------ toast message ------------------//

    const notifySuccess = (message: string) => toast.success(message)
    const notifyError = (message: string) => toast.error(message)

    //------------------ handle all form input both for create and update ------------------//

    const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputField: string = e.target.name;
        const inputFieldValue: string | number = e.target.type === 'number'
            ? Number(e.target.value)
            : e.target.value;

        setNewProductData((prevData) => ({
            ...prevData,
            [inputField]: inputFieldValue,
        }));
    };

    //------------------ create ------------------//

    const handleCategoryChange = (newValue: Options<{ value: string }>, actionMeta: ActionMeta<{ value: string }>) => {
        if (actionMeta.action === 'select-option' || actionMeta.action === 'create-option') {
            setSelectedCategories(newValue.map((option: { value: string }) => option.value));
        }
    };

    //------------------ return ------------------//

    return (
        <PageLayout>
            <div className="fixed top-20 left-20 right-20 flex p-4 bg-next-blue items-center justify-between">
                <h2 className="text-3xl font-bold text-next-darker-orange">PRODUKTER</h2>
                <button
                    //erstat hele denne style med btn-blue
                    className="border-[1.5px] border-next-darker-orange p-4 bg-next-blue text-next-orange font-bold hover:bg-next-darker-orange hover:text-next-blue transition-colors"
                    onClick={() => setShowCreateModal(true)}
                >
                    Tilføj Produkt
                </button>
            </div>
            <div className="mt-40">
                {isLoading && <loading.LoadingSpinner/>}
                {!isLoading && (<ProductTable
                    channel={channel}
                    setSelectedProduct={setSelectedProduct}
                    setNewProductData={setNewProductData}
                    products={products}
                    setSelectedCategories={setSelectedCategories}
                    setShowUpdateModal={setShowUpdateModal}
                    setProductToDelete={setProductToDelete}
                    setShowDeleteConfirmation={setShowDeleteConfirmation}
                />)}
            </div>
            {showCreateModal && (<CreateModal
                selectedCategories={selectedCategories}
                setShowCreateModal={setShowCreateModal}
                setNewProductData={setNewProductData}
                notifySuccess={notifySuccess}
                notifyError={notifyError}
                newProductData={newProductData}
                create={create}
                channel={channel}
                products={products}
                handleCategoryChange={handleCategoryChange}
                handleFormInput={handleFormInput}
            />)}
            {showUpdateModal && (<UpdateModal
                    update={update}
                    notifySuccess={notifySuccess}
                    notifyError={notifyError}
                    channel={channel}
                    selectedCategories={selectedCategories}
                    setShowUpdateModal={setShowUpdateModal}
                    newProductData={newProductData}
                    products={products}
                    handleCategoryChange={handleCategoryChange}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    handleFormInput={handleFormInput}
                    setNewProductData={setNewProductData}
                    setSelectedCategories={setSelectedCategories}
                />
            )}
            {showDeleteConfirmation && (<DeleteModal
                setProductToDelete={setProductToDelete}
                setShowDeleteConfirmation={setShowDeleteConfirmation}
                destroy={destroy}
                productToDelete={productToDelete}
                notifySuccess={notifySuccess}
                notifyError={notifyError}
                channel={channel}
            />)}
            <Toaster
                reverseOrder={false}
                toastOptions={{
                    position: "bottom-center",
                    success: {
                        style: {
                            border: '2px solid black',
                            padding: '16px',
                            background: '#F96B4C',
                            color: "white"
                        },
                    },
                    error: {
                        style: {
                            border: '2px solid black',
                            padding: '16px',
                            background: '#F96B4C',
                            color: 'white'
                        },
                    },
                }}
            />
        </PageLayout>
    );
}

export default ProductOverview;
