import { ClothesData } from '../../slices/types';
import { collection, getDocs, query, where,  Query, DocumentData } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchClothesParams } from './types';
import { firestore } from '../firebase';

export const fetchClothes = createAsyncThunk<ClothesData[], FetchClothesParams, { rejectValue: string }>(
    "clothes/fetchClothes",
    async ({gender, category}, {rejectWithValue}) => {

        try {
            let clothesQuery: Query<DocumentData> = collection(firestore, gender);
            if (category) {
                clothesQuery = query(clothesQuery, where('category', '==', category));
            }
            const fetchedGoods = await getDocs(clothesQuery);
            
            const clothes: ClothesData[] = [];
            fetchedGoods.forEach(doc => {
                clothes.push({ name: doc.id, ...doc.data() } as ClothesData);
            });

            return clothes;

        } catch (error) {
            console.log(error);
            return rejectWithValue('Failed to fetch clothes');
        }
    }
);