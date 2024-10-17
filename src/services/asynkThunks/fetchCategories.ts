import { collection, getDocs } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../firebase';

export const fetchCategories = createAsyncThunk<string[], string, { rejectValue: string }>(
    "categories/fetchCategories",
    async (gender, { rejectWithValue }) => {
        try {
            const fetchedCategories = await getDocs(collection(firestore, gender));
            const catList: Set<string> = new Set();

            fetchedCategories.forEach(doc => {
                const category = doc.data().category;
                catList.add(category);
            })

            const categories = [...catList];

            return categories;
        } catch (error) {
            return rejectWithValue('Failed to fetch categories');
        }
    }
);