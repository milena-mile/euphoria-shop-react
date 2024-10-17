import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { findUserRef } from '../../utils/findUser';
import { WishlistPayload, WishlistResponse } from './types';

export const addToWishlist = createAsyncThunk<WishlistResponse, WishlistPayload, { rejectValue: string }>(
    "user/addToWishList",
    async ({userId, product}: WishlistPayload, {rejectWithValue}) => {
        try {
            const userRef = await findUserRef(userId); 

            await updateDoc(userRef, {
                wishlist: arrayUnion(product)
            });

            return { userId, product };
        } catch (error) {
            return rejectWithValue('Failed to add to wishlist');
        }
    }
)

export const removeFromWishlist = createAsyncThunk<WishlistResponse, WishlistPayload, { rejectValue: string }>(
    "user/removeFromWishlist",
    async ({userId, product}: WishlistPayload, {rejectWithValue}) => {
        try {
            const userRef = await findUserRef(userId); 

            await updateDoc(userRef, {
                wishlist: arrayRemove(product),
            });

            return { userId, product };
        } catch (error) {
            return rejectWithValue('Failed to remove from wishlist');
        }
    }
)