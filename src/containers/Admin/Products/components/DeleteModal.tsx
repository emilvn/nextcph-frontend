import type { Dispatch, SetStateAction } from "react";
import Modal from "../../../../components/modal.tsx";
import toast from "react-hot-toast";

import { IProductState } from "../types.ts";

interface IDeleteModalProps {
    productState: IProductState;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function DeleteModal(props: IDeleteModalProps) {
    const closeDeleteConfirmation = () => {
        props.productState.setProductToDelete(null);
        props.setIsOpen(false);
    };
    const confirmDelete = async () => {
        if (props.productState.productToDelete) {
            void props.productState.destroy(props.productState.productToDelete);
            closeDeleteConfirmation();
        } else {
            toast.error("Fejl ved sletning af produkt");
        }
    };

    return (
        <Modal>
            <h3 className="text-next-blue text-xl font-semibold">
                Er du sikker på, at du vil slette dette produkt?
            </h3>
            <div className="flex justify-around mt-10">
                <button
                    className="btn-orange"
                    onClick={confirmDelete}
                >
                    JA, SLET
                </button>
                <button
                    className="btn-blue"
                    onClick={() => closeDeleteConfirmation()}
                >
                    NEJ, ANNULLÉR
                </button>
            </div>
        </Modal>
    );
}

export default DeleteModal;
export type { IDeleteModalProps };
