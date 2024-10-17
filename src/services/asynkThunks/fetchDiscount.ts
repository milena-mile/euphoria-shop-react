import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

export const fetchDiscount = createAsyncThunk<{value: number}, string, { rejectValue: string }>(
    "discount/fetchDiscount",
    async (discount, {rejectWithValue}) => {
        try {
            const discountCollection = collection(firestore, "discount");
            const fetchedDiscount = await getDocs(discountCollection);
            const discountValue = fetchedDiscount.docs.find(item => item.id == discount);
            
            if (discountValue) { 
                return discountValue.data() as {value: number};
            } else {
                return rejectWithValue("Discount not find");
            }

        } catch (error) {
            return rejectWithValue("Discount not find");
        }
    }
)