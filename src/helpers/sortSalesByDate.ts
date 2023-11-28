import { ISale } from "../types/sales.types";

function sortSalesByDate({ sales }: { sales: ISale[] }) {
    sales.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
        }
        return dateB.getTime() - dateA.getTime();
    });

    return sales;
}

export { sortSalesByDate }