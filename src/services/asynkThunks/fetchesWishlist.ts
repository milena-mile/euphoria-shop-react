import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { findUserRef } from '../../utils/findUser';
import { WishlistPayload, WishlistRemovePayload,  WishlistResponse } from './types';

export const addToWishlist = createAsyncThunk<WishlistResponse, WishlistPayload, { rejectValue: string }>(
    "user/addToWishList",
    async ({userId, product, productLink}: WishlistPayload, {rejectWithValue}) => {
        try {
            const userRef = await findUserRef(userId); 

            const wishlistItem = {
                id: product.id,
                name: product.name,
                color: product.color,
                photo: product.photos[0],
                price: product.price,
                sale: product.sale,
                sizes: product.sizes,
                link: productLink
            }

            await updateDoc(userRef, {
                wishlist: arrayUnion(wishlistItem)
            });

            return { userId, wishlistItem };
        } catch (error) {
            return rejectWithValue('Failed to add to wishlist');
        }
    }
)

export const removeFromWishlist = createAsyncThunk<WishlistResponse, WishlistRemovePayload, { rejectValue: string }>(
    "user/removeFromWishlist",
    async ({userId, product, productLink}: WishlistRemovePayload, {rejectWithValue}) => {
        try {
            const userRef = await findUserRef(userId); 
            let photo;
            if ("photos" in product) {
                photo = product.photos[0];
            } else {
                photo = product.photo;
            }

            const wishlistItem = {
                id: product.id,
                name: product.name,
                color: product.color,
                photo: photo,
                price: product.price,
                sale: product.sale,
                sizes: product.sizes,
                link: productLink
            }

            await updateDoc(userRef, {
                wishlist: arrayRemove(wishlistItem),
            });

            return { userId, wishlistItem };
        } catch (error) {
            return rejectWithValue("Product wasn't removed from wishlist");
        }
    }
)