import { CartData } from '../../slices/types';
import { CartPayload, CartResponse } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc } from 'firebase/firestore';
import { findUserData } from '../../utils/findUser';
import { firestore } from '../firebase';
import { updateDoc } from 'firebase/firestore';

export const matchFilter = (item: CartData, product: CartData) => {
    return item.id === product.id && 
           item.color === product.color && 
           item.size === product.size;
}

const ifExists = (userCart: CartData[], product: CartData, action: string) => {
    const result = userCart.map((item: CartData) => {
        if (matchFilter(item, product)) {
            switch (action) {
                case "inc":
                    return { ...item, quantity: item.quantity + 1};
                case "dec":
                    return { ...item, quantity: item.quantity - 1};
            }
        } else { 
            return item;
        }
    });

    return result;
}

const ifNotExists = (userCart: CartData[], product: CartData) => {
    const result = [...userCart, { ...product, quantity: 1 }];

    return result;
}

const handleMatches = (userCart: CartData[], product: CartData) => {
    const existingProduct = userCart.find(item => matchFilter(item, product));

    return existingProduct;
}

const removeItem = (userCart: CartData[], product: CartData) => {
    return userCart.filter(item => !matchFilter(item, product));
}

export const getCart = createAsyncThunk<CartData[], string, { rejectValue: string }>(
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
    async ({userId, product}: CartPayload, {rejectWithValue}) => {
        try {
            const user = await findUserData(userId);
            const userDocRef = doc(firestore, "users", user.idDoc);
            const userCart = user.cart || [];

            const existingProduct = handleMatches(userCart, product);

            if (existingProduct) {
                const updatedCart = ifExists(userCart, product, "inc");

                await updateDoc(userDocRef, {
                    cart: updatedCart
                });

                return { userId, product: { ...existingProduct, quantity: existingProduct.quantity + 1 } };

            } else {
                const updatedCart = ifNotExists(userCart, product);

                await updateDoc(userDocRef, {
                    cart: updatedCart
                });

                return { userId, product: { ...product, quantity: 1 } };
            }
        } catch (error) {
            return rejectWithValue('Failed to add to cart');
        }
    }
)

export const removeQuantityCart = createAsyncThunk<CartResponse, CartPayload, { rejectValue: string }>(
    "user/removeQuantityCart",
    async ({userId, product}: CartPayload, {rejectWithValue}) => {
        try {
            const user = await findUserData(userId);
            const userDocRef = doc(firestore, "users", user.idDoc);
            const userCart = user.cart || [];

            const existingProduct = handleMatches(userCart, product);

            if (existingProduct) {
                const updatedCart = ifExists(userCart, product, "dec");

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

export const removeFromCart = createAsyncThunk<CartResponse, CartPayload, { rejectValue: string }>(
    "user/removeFromCart",
    async ({userId, product}: CartPayload, {rejectWithValue}) => {
        try {
            const user = await findUserData(userId);
            const userDocRef = doc(firestore, "users", user.idDoc);
            const userCart = user.cart || [];

            const existingProduct = handleMatches(userCart, product);

            if (existingProduct) {
                const updatedCart = removeItem(userCart, product);

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