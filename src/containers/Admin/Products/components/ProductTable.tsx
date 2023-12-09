import type { IProduct } from "../../../../types/products.types.ts";
import type { Dispatch, SetStateAction } from "react";
import { formatPrice } from "../../../../helpers/formatting.ts";
import { IModalStates, IProductState } from "../ProductOverview.tsx";

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
  );
}

interface IProductRowProps {
  product: IProduct;
  handleEdit: (product: IProduct) => void;
  handleDelete: (product: IProduct) => void;
}

function ProductRow(props: IProductRowProps) {
  const productNameArr = props.product.name.split(", ");
  const productName = productNameArr[0];
  const productAmount = productNameArr[1];

  return (
    <tr key={props.product.id} className="border-b text-xl text-next-blue">
      <td className="p-4">{productName}</td>
      <td className="p-4">{productAmount ? productAmount : "1 stk"}</td>
      <td className="p-4">{formatPrice(props.product.price)}</td>
      <td className="p-4">{props.product.stock}</td>
      <td className="p-4">
        <ul>
          {props.product.categories.map((category) => (
            <li key={category.category.id}>{category.category.name}</li>
          ))}
        </ul>
      </td>
      <td>
        <button
          className="btn-white w-24"
          onClick={() => props.handleEdit(props.product)}
        >
          Rediger
        </button>
      </td>
      <td>
        <button
          className="btn-white w-24"
          onClick={() => props.handleDelete(props.product)}
        >
          Slet
        </button>
      </td>
    </tr>
  );
}

interface IProductTableProps {
  productState: IProductState;
  modalStates: IModalStates;
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}

function ProductTable(props: IProductTableProps) {
  const { modalStates, productState, setSelectedCategories } = props;
  const handleEdit = (product: IProduct) => {
    productState.setSelectedProduct(product);
    setSelectedCategories(
      product.categories.map((category) => category.category.name),
    );
    modalStates.setIsOpenUpdate(true);
  };
  const openDeleteConfirmation = (product: IProduct) => {
    productState.setProductToDelete(product);
    modalStates.setIsOpenDelete(true);
  };

  const handleDelete = (product: IProduct) => {
    openDeleteConfirmation(product);
  };

  return (
    <table className="w-full">
      <ProductTableHeader />
      <tbody>
        {productState.products &&
          productState.products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
