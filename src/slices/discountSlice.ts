import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDiscount } from "../services/asynkThunks/fetchDiscount";

export const discountAdapter = createEntityAdapter({
    selectId: (discount: {value: number}) => discount.value
});

export const discountSlice = createSlice({
    name: "discount",
    initialState: discountAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscount.fulfilled, (state, action: PayloadAction<{value: number}>) => {
                if (action.payload) {
                    discountAdapter.addOne(state, action.payload);
                }
            })
    }
})

const { reducer } = discountSlice;
export default reducer;