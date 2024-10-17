import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from "../../services/firebase";
import { UserData } from "../../slices/types";

export const addUser = createAsyncThunk<UserData, UserData, { rejectValue: string }>(
    "user/addUser",
    async (user, {rejectWithValue}) => {

        const collectionUsers = collection(firestore, "users");
        const q = query(
            collectionUsers,
            where("id", "==", user.email)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            const userData = {
                id: user.id,
                email: user.email,
                wishlist: [],
                cart: [],
                orders: []
            }

            try {
                await addDoc(collectionUsers, userData);
                return userData;

            } catch (error) {
                console.log(error);
                return rejectWithValue('Failed to register user');
            }
        } else {
            return rejectWithValue('User already exists');
        }
    }
)