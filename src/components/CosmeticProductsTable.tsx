import type {IProduct} from '../types/products.types.ts';

interface ProductProps {
    products: IProduct[];
}

function CosmeticProductsTable({products}: ProductProps) {
    console.log('Received data in CosmeticProductsTable:', products);

    return (
        <div>
            <h2>Product List:</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.id}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CosmeticProductsTable;
