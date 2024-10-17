import { CartData } from "../slices/types";

const handleCartResult = (item: CartData, quantity?: number) => {
    const price = item.sale !== 0 ? item.price - (item.price * item.sale / 100) : item.price;
    const totalPrice = price * (quantity ? quantity : item.quantity);
    let shippingPrice;
    switch(true) {
        case totalPrice >= 50 && totalPrice < 100:
            shippingPrice = 2;
            break;
        case totalPrice < 50:
            shippingPrice = 5;
            break;
        default:    
            shippingPrice = 0;
   }

   return {price, shippingPrice, totalPrice}
}

export { handleCartResult };