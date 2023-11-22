// ProductOverview.tsx
import PageLayout from '../../components/layout.tsx';
import { ChannelType } from '../../types/channel.types.ts';
import useProducts from '../../hooks/useProducts.ts';
import { IProduct, INewProduct } from '../../types/products.types.ts';
import loading from '../../components/loading.tsx';
import { useState } from 'react';
function ProductOverview({ channel }: { channel: ChannelType }) {
    const { products, isLoading, destroy, create } = useProducts(channel);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (product: IProduct) => {
        void destroy(product);
    };

    const handleCreate = async (newProduct: INewProduct) => {
        await create(newProduct, INewProduct);
        setShowModal(false);
    };

    return (
        <PageLayout>
            <div className="my-4">
                <h2 className="text-2xl font-bold mb-2">Product List:</h2>
                <button onClick={() => setShowModal(true)}>Create Product</button>
                {isLoading ? (
                    <loading.LoadingSpinner />
                ) : (
                    <table className="min-w-full">
                        <thead>
                        <tr>
                            <th className="text-left">Name</th>
                            <th className="text-left">Price</th>
                            <th className="text-left">Stock</th>
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
                                    <td>
                                        <button onClick={() => handleDelete(product)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
                        <h2>Create New Product</h2>
                        <button onClick={() => handleCreate({/* pass product details here */})}>Create</button>
                    </div>
                </div>
            )}
        </PageLayout>
    );
}

export default ProductOverview;
