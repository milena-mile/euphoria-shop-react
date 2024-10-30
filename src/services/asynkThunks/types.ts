import { ClothesData, WishlistCartData } from '../../slices/types';
import { FormData, OrderData } from '../../pages/CartCheckout/types';

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
    productLink: string;
}
  
interface WishlistResponse {
    userId: string;
    wishlistItem: WishlistCartData;
}

interface WishlistRemovePayload {
    userId: string;
    product: WishlistCartData | ClothesData;
    productLink: string;
}

interface CartPayload {
    userId: string;
    product: WishlistCartData | ClothesData;
    params: {
        color: string | string[], 
        size: string | string[],
        link?: string
    }
}
  
interface CartResponse {
    userId: string;
    product: WishlistCartData;
}

interface CartRemovePayload {
    userId: string;
    product: WishlistCartData;
}

interface OrderPayload {
    userId: string,
    formData: FormData,
    cart: WishlistCartData[]
    totalSum: string
}

interface OrderResponse {
    userId: string,
    item: OrderData
}

export type { CartPayload, 
              CartRemovePayload, 
              CartResponse, 
              FetchClothesParams, 
              FetchProductParams, 
              OrderPayload, 
              OrderResponse, 
              WishlistPayload, 
              WishlistRemovePayload, 
              WishlistResponse };