function calculateProductsTotalPrice(price: number, qty: number): number {
    const totalPrice: number = price * qty;
    return totalPrice;
}

export { calculateProductsTotalPrice }