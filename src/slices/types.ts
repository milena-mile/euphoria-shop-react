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

interface CartData {
    id: string,
    name: string,
    color: string,
    size: string,
    price: number,
    sale: number,
    photo: string,
    quantity: number
}

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
    wishlist?: ClothesData[],
    cart?: CartData[],
    orders?: OrderData[]
}

export type { CategoriesState, CartData, ClothesData, ClothesState, filterInitialState, filterKeys, UserData };