import { OrderData } from "../pages/CartCheckout/types";

interface ClothesData {
    id: string,
    name: string,
    additional: {
        Fabric: string,
        Fit: string,
        Neck: string,
        Pattern: string,
        Sleeve: string,
        Style: string
    }
    category: string,
    color: string[],
    description: string,
    photos: string[],
    price: number,
    sale: number,
    sizes: string[],
    video?: string
}

interface WishlistCartData {
    id: string,
    name: string,
    color: string[] | string,
    photo: string,
    price: number,
    sale: number,
    sizes: string[] | string,
    link: string,
    quantity: number
}

// interface CartData {
//     id: string,
//     name: string,
//     color: string,
//     size: string,
//     price: number,
//     sale: number,
//     photo: string,
//     quantity: number
// }

type LoadingStatus = 'idle' | 'loading' | 'error';

interface ClothesState {
    clothes: {
        entities: Record<number, ClothesData>,
        goodsLoadingStatus: LoadingStatus
    }
}
interface CategoriesState {
    categories: {
        entities: Record<number, string>,
    }
}

interface filterInitialState {
    minPrice: number,
    maxPrice: number,
    color: string[],
    sizes: string[]
}

type filterKeys = "color" | "sizes";

interface UserData {
    id: string,
    email: string,
    wishlist?: WishlistCartData[],
    cart?: WishlistCartData[],
    orders?: OrderData[]
}

export type { CategoriesState, ClothesData, ClothesState, filterInitialState, filterKeys, UserData, WishlistCartData };