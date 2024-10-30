import { WishlistCartData } from "../../slices/types";

interface WishlistItemProps {
    item: WishlistCartData,
    cart: WishlistCartData[], 
    removeWishlistItem: (e: React.MouseEvent, item: WishlistCartData) => void
}

export type { WishlistItemProps }