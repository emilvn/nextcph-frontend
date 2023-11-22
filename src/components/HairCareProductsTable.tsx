import {IProduct} from "../types/products.types.ts";

interface ProductProps {
    products: IProduct[];
}

function HairCareProductsTable({products}: ProductProps) {
    console.log('Received data in HairCareProductsTable:', products);

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

export default HairCareProductsTable;