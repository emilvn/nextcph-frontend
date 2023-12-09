import type { ChannelType } from "../../../types/channel.types.ts";
import type {
  INewProduct,
  IProduct,
  IUpdateProduct,
} from "../../../types/products.types.ts";
import type { ActionMeta, Options } from "react-select";
import PageLayout from "../../../components/layout.tsx";
import useProducts from "../../../hooks/useProducts.ts";
import loading from "../../../components/loading.tsx";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import UpdateModal from "./components/UpdateModal.tsx";
import CreateModal from "./components/CreateModal.tsx";
import DeleteModal from "./components/DeleteModal.tsx";
import ProductTable from "./components/ProductTable.tsx";
import StyledToaster from "../../../components/toaster.tsx";

type HandleCategoryChange = (
  newValue: Options<{ value: string }>,
  actionMeta: ActionMeta<{ value: string }>,
) => void;
interface ICategoryState {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  handleCategoryChange: HandleCategoryChange;
}
interface IModalStates {
  isOpenCreate: boolean;
  isOpenUpdate: boolean;
  isOpenDelete: boolean;
  setIsOpenCreate: Dispatch<SetStateAction<boolean>>;
  setIsOpenUpdate: Dispatch<SetStateAction<boolean>>;
  setIsOpenDelete: Dispatch<SetStateAction<boolean>>;
}
interface IProductState {
  products: IProduct[];
  create: (product: INewProduct) => Promise<void>;
  update: (product: IUpdateProduct) => Promise<void>;
  destroy: (product: IProduct) => Promise<void>;
  selectedProduct: IProduct | null;
  setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
  productToDelete: IProduct | null;
  setProductToDelete: Dispatch<SetStateAction<IProduct | null>>;
}
function Header({ children }: { children?: ReactNode }) {
  return (
    <div className="fixed top-20 left-20 right-20 flex p-4 bg-next-blue items-center justify-between">
      <h2 className="text-3xl font-bold text-next-darker-orange">PRODUKTER</h2>
      {children}
    </div>
  );
}

function ProductOverview({ channel }: { channel: ChannelType }) {
  const { products, isLoading, destroy, create, update } = useProducts(channel);

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

  const handleCategoryChange: HandleCategoryChange = (newValue, actionMeta) => {
    if (
      actionMeta.action === "select-option" ||
      actionMeta.action === "create-option"
    ) {
      setSelectedCategories(
        newValue.map((option: { value: string }) => option.value),
      );
    }
  };

  const modalStates: IModalStates = {
    isOpenCreate,
    isOpenUpdate,
    isOpenDelete,
    setIsOpenCreate,
    setIsOpenUpdate,
    setIsOpenDelete,
  };
  const productState: IProductState = {
    products,
    create,
    update,
    destroy,
    selectedProduct,
    setSelectedProduct,
    productToDelete,
    setProductToDelete,
  };
  const categoryState: ICategoryState = {
    selectedCategories,
    setSelectedCategories,
    handleCategoryChange,
  };

  return (
    <PageLayout>
      <Header>
        <button className="btn-blue" onClick={() => setIsOpenCreate(true)}>
          Tilføj Produkt
        </button>
      </Header>
      <div className="mt-40">
        {isLoading && <loading.LoadingSpinner />}
        {!isLoading && (
          <ProductTable
            productState={productState}
            modalStates={modalStates}
            setSelectedCategories={setSelectedCategories}
          />
        )}
      </div>
      {isOpenCreate && (
        <CreateModal
          categoryState={categoryState}
          setIsOpen={setIsOpenCreate}
          create={create}
          products={products}
          channel={channel}
        />
      )}
      {isOpenUpdate && !!productState.selectedProduct && (
        <UpdateModal
          categoryState={categoryState}
          setIsOpen={setIsOpenUpdate}
          channel={channel}
          productState={productState}
        />
      )}
      {isOpenDelete && (
        <DeleteModal
          setIsOpen={modalStates.setIsOpenDelete}
          productState={productState}
        />
      )}
      <StyledToaster />
    </PageLayout>
  );
}

export default ProductOverview;
export type { ICategoryState, IModalStates, IProductState };
