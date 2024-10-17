import { ClothesData } from '../../slices/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchProductParams } from './types';
import { firestore } from '../firebase';

export const fetchProduct = createAsyncThunk<ClothesData, FetchProductParams, { rejectValue: string }>(
    "product/fetchProduct",
    async ({gender, productID}, {rejectWithValue}) => {
        try {
            const productCollection = collection(firestore, gender);
            const productQuery = query(productCollection, where("id", "==", productID));
            const fetchedProduct = await getDocs(productQuery);

            if (!fetchedProduct.empty) {
                const name = fetchedProduct.docs[0].id;
                const productData = fetchedProduct.docs[0].data() as ClothesData;
                productData.name = name;
                return productData;
            } else {
                return rejectWithValue('Product not found');
            }

        } catch (error) {
            console.log(error);
            return rejectWithValue('Failed to fetch product');
        }

    }
)