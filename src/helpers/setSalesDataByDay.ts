import { ISale } from "../types/sales.types";

function monthlySalesDataByDay(sales: ISale[], daysOfCurrentMonthArray: number[]): number[] {
    const monthlySalesByDay = daysOfCurrentMonthArray.map((day) => {
        const salesByDay = sales.filter((sale) => new Date(sale.created_at).getDate() === day);

        const dailyTotal = salesByDay.reduce((acc, sale) => {
            const saleTotal = sale.products.reduce((total, product) => {
                return total + (product.product_quantity * product.product.price);
            }, 0);
            return acc + saleTotal;
        }, 0);
        return dailyTotal;
    });
    return monthlySalesByDay;
}

export { monthlySalesDataByDay }