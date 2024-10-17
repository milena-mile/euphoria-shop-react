import { CartData, ClothesData } from "../../slices/types";
import { FormData, OrderData } from "../../pages/CartCheckout/types";

interface FetchClothesParams {
    gender: string;
    category?: string;
}

interface FetchProductParams {
    gender: string;
    productID: string;
}

interface WishlistPayload {
    userId: string;
    product: ClothesData;
}
  
interface WishlistResponse {
    userId: string;
    product: ClothesData;
}

interface CartPayload {
    userId: string;
    product: CartData;
}
  
interface CartResponse {
    userId: string;
    product: CartData;
}

interface OrderPayload {
    userId: string,
    formData: FormData,
    cart: CartData[]
    totalSum: string
}

interface OrderResponse {
    userId: string,
    item: OrderData
}

export type { CartPayload, CartResponse, FetchClothesParams, FetchProductParams, OrderPayload, OrderResponse, WishlistPayload, WishlistResponse };