import PageLayout from '../../components/layout.tsx';
import {ChannelType} from '../../types/channel.types.ts';
import useProducts from '../../hooks/useProducts.ts';
import {IProduct, INewProduct, IUpdateProduct} from '../../types/products.types.ts';
import loading from '../../components/loading.tsx';
import React, {useState} from 'react';
import Creatable from 'react-select/creatable';
import toast, {Toaster} from 'react-hot-toast';
import {FaCheck} from "react-icons/fa";
import {IoCloseSharp} from "react-icons/io5";

function ProductOverview({channel}: {
    channel: ChannelType
}) {
    const {products, isLoading, destroy, create, update} = useProducts(channel);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [newProductData, setNewProductData] = useState({
        name: '',
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

    //------------------ update ------------------//

    const handleEdit = (product: IProduct) => {
        setSelectedProduct(product);
        setNewProductData({
            name: product.name,
            price: product.price,
            stock: product.stock,
            channel: channel,
            categories: [] /*change?*/
        });
        setSelectedCategories(product.categories.map(category => category.category.name));
        setShowUpdateModal(true);
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const updatedProduct: IUpdateProduct = {
            id: selectedProduct?.id || '',
            name: newProductData.name,
            price: newProductData.price,
            stock: newProductData.stock,
            channel: newProductData.channel
        };

        try {
            await update(updatedProduct);
            setShowUpdateModal(false);
            setNewProductData({name: '', price: 0, stock: 0, categories: [], channel: channel});
            setSelectedCategories([]);
            setSelectedProduct(null);
            notifySuccess('Produktet er redigeret')
        } catch (e) {
            console.error(e);
        }
    };

    //------------------ handle all form input both for create and update ------------------//

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const handleCategoryChange = (newValue: any, actionMeta: any) => {
        if (actionMeta.action === 'select-option' || actionMeta.action === 'create-option') {
            setSelectedCategories(newValue.map((option: any) => option.value));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const newProduct: INewProduct = {
            name: newProductData.name,
            price: newProductData.price,
            stock: newProductData.stock,
            channel: newProductData.channel,
            categories: selectedCategories,
        }

        try {
            await create(newProduct);
            setShowCreateModal(false);
            setNewProductData({name: '', price: 0, stock: 0, categories: [], channel: channel});
            notifySuccess('Produkt oprettet')
        } catch (e) {
            console.error(e);
            notifyError('fejl ved oprettelse af produkt')
        }
    }

    //------------------ delete ------------------//

    const openDeleteConfirmation = (product: IProduct) => {
        setProductToDelete(product);
        setShowDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setProductToDelete(null);
        setShowDeleteConfirmation(false);
    };


    const handleDelete = (product: IProduct) => {
        openDeleteConfirmation(product);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            await destroy(productToDelete);
            closeDeleteConfirmation();
            notifySuccess('Produktet er slettet')
        } else {
            notifyError('fejl ved sletning af produkt')
        }
    };

    //------------------ return ------------------//

    return (
        <PageLayout>
            <div className="my-4">
                <h2 className="text-3xl font-bold text-black mb-4">Produkt Liste</h2>
                <button
                    className="bg-next-blue text-next-orange font-bold py-2 px-4 rounded hover:bg-next-darker-orange hover:text-next-blue mb-4"
                    onClick={() => setShowCreateModal(true)}
                >
                    Opret Product
                </button>
                {showCreateModal && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-md"></div>
                        <div className="bg-white p-8 rounded-md relative z-10">
                            <form onSubmit={handleSubmit}>
                                <label className="block mb-4">
                                    Navn: <input className="border border-gray-300 p-2 w-full"
                                                 type="text"
                                                 name="name"
                                                 onChange={handleFormInput}/>
                                </label>
                                <label className="block mb-4">
                                    Pris: <input className="border border-gray-300 p-2 w-full"
                                                 type="number"
                                                 name="price"
                                                 onChange={handleFormInput}/>
                                </label>
                                <label className="block mb-4">
                                    Lager: <input className="border border-gray-300 p-2 w-full"
                                                  type="number"
                                                  name="stock"
                                                  onChange={handleFormInput}/>
                                </label>
                                <label className="block mb-4">
                                    Kategori:
                                    <Creatable
                                        isMulti={true}
                                        onChange={handleCategoryChange}
                                        options={Array.from(new Set(products.flatMap(product =>
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
                                        onClick={() => setShowCreateModal(false)}
                                    >
                                        <IoCloseSharp size={25}/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {showUpdateModal && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-md"></div>
                        <div className="bg-white p-8 rounded-md relative z-10">
                            <form onSubmit={handleUpdate}>
                                <label className="block mb-4">
                                    Name: <input className="border border-gray-300 p-2 w-full"
                                                 type="text"
                                                 name="name"
                                                 value={newProductData.name}
                                                 onChange={handleFormInput}/>
                                </label>
                                <label className="block mb-4">
                                    Price: <input className="border border-gray-300 p-2 w-full"
                                                  type="number"
                                                  name="price"
                                                  value={newProductData.price}
                                                  onChange={handleFormInput}/>
                                </label>
                                <label className="block mb-4">
                                    Stock: <input className="border border-gray-300 p-2 w-full"
                                                  type="number"
                                                  name="stock"
                                                  value={newProductData.stock}
                                                  onChange={handleFormInput}/>
                                </label>
                                <label className="block mb-4">
                                    Categories:
                                    <Creatable
                                        isMulti={true}
                                        value={selectedCategories.map(category => ({value: category, label: category}))}
                                        onChange={handleCategoryChange}
                                        options={Array.from(new Set(products.flatMap(product =>
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
                                        onClick={() => setShowUpdateModal(false)}
                                    >
                                        <IoCloseSharp size={25}/>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}

                {showDeleteConfirmation && (
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
                )}


                {isLoading ? (
                    <loading.LoadingSpinner/>
                ) : (
                    <table className="min-w-full">
                        <thead>
                        <tr>
                            <th className="text-left text-2xl">Navn</th>
                            <th className="text-left text-2xl">Pris</th>
                            <th className="text-left text-2xl">Lager</th>
                            <th className="text-left text-2xl">Kategori</th>
                            <th className="text-left text-2xl">Opdatere</th>
                            <th className="text-left text-2xl">Slet</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products &&
                            products.map((product) => (
                                <tr key={product.id} className="border-b">
                                    <td className="py-2">{product.name}</td>
                                    <td className="py-2">{product.price}</td>
                                    <td className="py-2">{product.stock}</td>
                                    <td className="py-2">
                                        <ul>
                                            {product.categories.map((category) => (
                                                <li key={category.category.id}>{category.category.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <button
                                            className="bg-next-darker-orange font-bold text-next-blue py-1 px-2 rounded hover:bg-next-blue hover:text-next-orange"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Rediger
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="bg-next-blue text-next-orange font-bold py-1 px-2 rounded hover:bg-next-darker-orange hover:text-next-blue"
                                            onClick={() => handleDelete(product)}
                                        >
                                            Slet
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
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
