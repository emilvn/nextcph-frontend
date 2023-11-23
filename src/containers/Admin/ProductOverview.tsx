import PageLayout from '../../components/layout.tsx';
import {ChannelType} from '../../types/channel.types.ts';
import useProducts from '../../hooks/useProducts.ts';
import {IProduct, INewProduct} from '../../types/products.types.ts';
import loading from '../../components/loading.tsx';
import React, {useState} from 'react';
import Creatable from 'react-select/creatable';

function ProductOverview({channel}: { channel: ChannelType }) {
    const {products, isLoading, destroy, create} = useProducts(channel);
    const [showModal, setShowModal] = useState(false);
    const [newProductData, setNewProductData] = useState({
        name: '',
        price: 0,
        stock: 0,
        categories: []
    });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputField: string = e.target.name
        const inputFieldValue: string = e.target.value
        console.log(inputFieldValue)
    }

    const handleCategoryChange = (newValue: any, actionMeta: any) => {
        if (actionMeta.action === 'select-option' || actionMeta.action === 'create-option') {
            setSelectedCategories(newValue.map((option: any) => option.value));
        }
    };

    //det her er den nye
    /*const handleFormInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
        console.log("Selected Categories:", selectedCategories);
    }*/

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newProduct: INewProduct = {
            name: newProductData.name,
            price: newProductData.price,
            stock: newProductData.stock,
            categories: selectedCategories,
        }

        try {
            await create(newProduct);
            setShowModal(false);
            // Clear the form after successful creation
            setNewProductData({name: '', price: 0, stock: 0});
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = (product: IProduct) => {
        void destroy(product);
    };

    return (
        <PageLayout>
            <div className="my-4">
                <h2 className="text-3xl font-bold text-indigo-600 mb-4">Product List:</h2>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    onClick={() => setShowModal(true)}
                >
                    Create Product
                </button>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-md"></div>
                        <div className="bg-white p-8 rounded-md relative z-10">
                            <form>
                                <label className="block mb-4">
                                    Name: <input className="border border-gray-300 p-2 w-full"
                                                 type="text"
                                                 name="name"
                                                 onChange={handleFormInput}/>
                                </label>
                                <label className="block mb-4">
                                    Price: <input className="border border-gray-300 p-2 w-full"
                                                  type="number"
                                                  name="price"
                                                  onChange={handleFormInput}/>
                                </label>
                                <label className="block mb-4">
                                    Stock: <input className="border border-gray-300 p-2 w-full"
                                                  type="number"
                                                  name="stock"
                                                  onChange={handleFormInput}/>
                                </label>
                                {/*   <label className="block mb-4">
                                    Categories: <input className="border border-gray-300 p-2 w-full"
                                                       type="string"
                                                       name="category"
                                                       list="category"
                                                       multiple={true}
                                                       onChange={handleFormInput}/>
                                    <datalist id="category">
                                        {Array.from(new Set(products.flatMap(product => product.categories.map(category => category.category.name))))
                                            .map((categoryName, index) => (
                                                <option key={index} value={categoryName}/>
                                            ))
                                        }
                                    </datalist>
                                </label>*/}

                                {/*det er den nye jf*/}
                                <label className="block mb-4">
                                    Categories:
                                    <Creatable
                                        isMulti={true}
                                        onChange={handleCategoryChange}
                                        options={Array.from(new Set(products.flatMap(product => product.categories.map(category => category.category.name))))
                                            .map((categoryName, index) => ({
                                                value: categoryName,
                                                label: categoryName,
                                                key: index
                                            }))}/>
                                </label>


                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    type="submit"
                                >
                                    Create
                                </button>
                            </form>
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-4"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {isLoading ? (
                    <loading.LoadingSpinner/>
                ) : (
                    <table className="min-w-full">
                        <thead>
                        <tr>
                            <th className="text-left">Name</th>
                            <th className="text-left">Price</th>
                            <th className="text-left">Stock</th>
                            <th className="text-left">Category</th>
                            <th className="text-left">Actions</th>
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
                                            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(product)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </PageLayout>
    );
}

export default ProductOverview;