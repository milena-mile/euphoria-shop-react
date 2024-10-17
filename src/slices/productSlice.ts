import { ClothesData } from './types';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProduct } from '../services/asynkThunks/fetchProduct';

export const productAdapter = createEntityAdapter();

const initialState = productAdapter.getInitialState({
    productLoadingStatus: 'idle'
});

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearProduct: (state) => {
            productAdapter.removeAll(state);
            state.productLoadingStatus = "loading";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.productLoadingStatus = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<ClothesData>) => {
                if (action.payload) {
                    productAdapter.addOne(state, action.payload);
                }
                state.productLoadingStatus = "idle";
            })
            .addCase(fetchProduct.rejected, (state) => {
                state.productLoadingStatus = 'error';
            });
    }
});

const { actions, reducer } = productSlice;
export const { clearProduct } = actions;
export default reducer;