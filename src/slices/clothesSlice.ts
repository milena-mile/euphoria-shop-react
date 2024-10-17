import { ClothesData } from './types';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchClothes } from '../services/asynkThunks/fetchClothes';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export const clothesAdapter = createEntityAdapter<ClothesData>();

const initialState = clothesAdapter.getInitialState({
    goodsLoadingStatus: "idle"
});

export const clothesSlice = createSlice({
    name: "clothes",
    initialState,
    reducers: {
        clearClothes: (state) => {
            clothesAdapter.removeAll(state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClothes.pending, (state) => {
                state.goodsLoadingStatus = "loading";
            })
            .addCase(fetchClothes.fulfilled, (state, action: PayloadAction<ClothesData[]>) => {
                if (action.payload) {
                    clothesAdapter.setAll(state, action.payload);
                }
                state.goodsLoadingStatus = "idle";
            })
            .addCase(fetchClothes.rejected, (state) => {
                state.goodsLoadingStatus = "error";
            })
    }
})

const { actions, reducer } = clothesSlice;
export const { clearClothes } = actions;
export const { selectAll, selectById } = clothesAdapter.getSelectors((state: RootState) => state.clothes);
export default reducer;
