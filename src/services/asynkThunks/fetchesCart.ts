import { WishlistCartData } from '../../slices/types';
import { CartPayload, CartRemovePayload, CartResponse } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc } from 'firebase/firestore';
import { findUserData } from '../../utils/findUser';
import { firestore } from '../firebase';
import { updateDoc } from 'firebase/firestore';

export const matchFilter = (item: WishlistCartData, product: WishlistCartData) => {
    if (typeof item.sizes == "string" && typeof item.color == "string") {
        return item.id === product.id && 
        item.color === product.color && 
        item.sizes === product.sizes;
    }
}

const ifExists = (userCart: WishlistCartData[], product: WishlistCartData, action: string) => {
    const result = userCart.map((item: WishlistCartData) => {
        if (matchFilter(item, product)) {
            if (item.quantity != undefined) {
                switch (action) {
                    case "inc":
                        return { ...item, quantity: item.quantity + 1};
                    case "dec":
                        return { ...item, quantity: item.quantity - 1};
                }
            }
        } else { 
            return item;
        }
    });

    return result;
}

const ifNotExists = (userCart: WishlistCartData[], product: WishlistCartData) => {
    const result = [...userCart, { ...product, quantity: 1 }];

    return result;
}

const handleMatches = (userCart: WishlistCartData[], product: WishlistCartData) => {
    const existingProduct = userCart.find(item => matchFilter(item, product));

    return existingProduct;
}

const removeItem = (userCart: WishlistCartData[], product: WishlistCartData) => {
    return userCart.filter(item => !matchFilter(item, product));
}

export const getCart = createAsyncThunk<WishlistCartData[], string, { rejectValue: string }>(
    "user/getCart",
    async (userId, {rejectWithValue}) => {
        try {
            const user = await findUserData(userId);

            if (!user.cart) {
                return [];
            }
            return user.cart;

        } catch (error) {
            return rejectWithValue('Failed to show cart');
        }
    }
)

export const addToCart = createAsyncThunk<CartResponse, CartPayload, { rejectValue: string }>(
    "user/addToCart",
    async ({userId, product, params}: CartPayload, {rejectWithValue}) => {
        try {
            const user = await findUserData(userId);
            const userDocRef = doc(firestore, "users", user.idDoc);
            const userCart = user.cart || [];

            let photo, quantity;
            if ("photos" in product) {
                photo = product.photos[0];
            } else {
                photo = product.photo;
            }
            if ("quantity" in product) {
                quantity = product.quantity;
            } else {
                quantity = 1;
            }

            const cartItem: WishlistCartData = {
                id: product.id,
                name: product.name,
                sizes: params.size,
                color: params.color,
                price: product.price,
                sale: product.sale,
                photo: photo,
                quantity: quantity,
                link: params.link ? params.link : ""
            };

            const existingProduct = handleMatches(userCart, cartItem);

            if (existingProduct) {
                const updatedCart = ifExists(userCart, cartItem, "inc");

                await updateDoc(userDocRef, {
                    cart: updatedCart
                });

                return { userId, product: { ...existingProduct, quantity: existingProduct.quantity + 1 } };

            } else {
                const updatedCart = ifNotExists(userCart, cartItem);

                await updateDoc(userDocRef, {
                    cart: updatedCart
                });

                return { userId, product: { ...cartItem, quantity: 1 } };
            }
        } catch (error) {
            return rejectWithValue('Failed to add to cart');
        }
    }
)

export const removeQuantityCart = createAsyncThunk<CartResponse, CartRemovePayload, { rejectValue: string }>(
    "user/removeQuantityCart",
    async ({userId, product}: CartRemovePayload, {rejectWithValue}) => {
        try {
            const user = await findUserData(userId);
            const userDocRef = doc(firestore, "users", user.idDoc);
            const userCart = user.cart || [];

            const cartItem: WishlistCartData = {
                id: product.id,
                name: product.name,
                sizes: product.sizes,
                color: product.color,
                price: product.price,
                sale: product.sale,
                photo: product.photo,
                quantity: 0,
                link: ""
            };

            const existingProduct = handleMatches(userCart, cartItem);

            if (existingProduct) {
                const updatedCart = ifExists(userCart, cartItem, "dec");

                await updateDoc(userDocRef, {
                    cart: updatedCart
                });

                return { userId, product: { ...existingProduct, quantity: existingProduct.quantity - 1 } };

            } else {
                return rejectWithValue('Failed to remove from cart');
            }
        } catch (error) {
            return rejectWithValue('Failed to remove from cart');
        }
    }
)

export const removeFromCart = createAsyncThunk<CartResponse, CartRemovePayload, { rejectValue: string }>(
    "user/removeFromCart",
    async ({userId, product}: CartRemovePayload, {rejectWithValue}) => {
        try {
            const user = await findUserData(userId);
            const userDocRef = doc(firestore, "users", user.idDoc);
            const userCart = user.cart || [];

            const cartItem: WishlistCartData = {
                id: product.id,
                name: product.name,
                sizes: product.sizes,
                color: product.color,
                price: product.price,
                sale: product.sale,
                photo: product.photo,
                quantity: 0,
                link: ""
            };

            const existingProduct = handleMatches(userCart, cartItem);

            if (existingProduct) {
                const updatedCart = removeItem(userCart, cartItem);

                await updateDoc(userDocRef, {
                    cart: updatedCart
                });

                return { userId, product: { ...product } };
            } else {
                return rejectWithValue('Failed to remove from cart');
            }
        } catch (error) {
            return rejectWithValue('Failed to remove from cart');
        }
    }
)

export const clearCart = createAsyncThunk<void, string, { rejectValue: string }>(
    "user/clearCart",
    async (userId, {rejectWithValue}) => {
        try {
            const user = await findUserData(userId);
            const userDocRef = doc(firestore, "users", user.idDoc);
            await updateDoc(userDocRef, { cart: [] });

        } catch (error) {
            return rejectWithValue('Failed to clear from cart');
        }
    }
)