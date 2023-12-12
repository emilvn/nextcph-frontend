import { IProduct } from "../types/products.types.ts";

function getCategories(products: IProduct[]): string[] {
    const categoriesSet = new Set<string>();
    products.forEach((product: IProduct) =>
        product.categories.forEach((category) =>
            categoriesSet.add(category.category.name)
        )
    );
    return Array.from(categoriesSet);
}

function getProductsWithCategory(
    products: IProduct[],
    category: string
): IProduct[] {
    return products.filter((product: IProduct) =>
        product.categories.some((p) => p.category.name === category)
    );
}

export { getCategories, getProductsWithCategory };
