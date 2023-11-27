import { convertToDanishDate } from "./dateTime";
import { ISale } from "../types/sales.types";

function groupSalesByDate({ sales }: { sales: ISale[] }): { [key: string]: ISale[] } {
    const groupedSales: { [key: string]: ISale[] } = {};
    sales.forEach((sale) => {
        const date = convertToDanishDate(sale.created_at);

        if (!groupedSales[date]) {
            groupedSales[date] = [];
        }

        groupedSales[date].push(sale);
    });

    return groupedSales;
}

export { groupSalesByDate }