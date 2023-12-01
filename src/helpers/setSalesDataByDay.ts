import { ISale } from "../types/sales.types";

function setSalesDataByDay(sales: ISale[], daysOfCurrentMonthArray: number[]) {
    const salesByDay = daysOfCurrentMonthArray.map((day) => {
        const salesByDay = sales.filter((sale) => new Date(sale.created_at).getDate() === day);

        const totalPrice = salesByDay.reduce((acc, sale) => {
            const saleTotal = sale.products.reduce((total, product) => {
                return total + (product.product_quantity * product.product.price);
            }, 0);
            return acc + saleTotal;
        }, 0);
        return totalPrice;
    });
    return salesByDay;
}

export { setSalesDataByDay }