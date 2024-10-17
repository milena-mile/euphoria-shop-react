import { collection, getDocs, query, where } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../firebase';
import { UserData } from '../../slices/types';

export const fetchUser = createAsyncThunk<UserData, string, { rejectValue: string }>(
    "user/fetchUser",
    async (userId, {rejectWithValue}) => {
        try {
            const userQuery = collection(firestore, "users");
            const userFilter = query(userQuery, where('id', '==', userId));
            const querySnapshot = await getDocs(userFilter);

            if (!querySnapshot.empty) {
                const fetchedUser = querySnapshot.docs[0].data() as UserData; 
                return fetchedUser;
            } else {
                console.log("User not found");
                return rejectWithValue("User not found");
            }

        } catch (error) {
            console.log(error, " Failed to sign in");
            return rejectWithValue("Failed to sign in");
        }
    }
)