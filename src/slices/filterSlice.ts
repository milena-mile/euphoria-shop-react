import { createSlice } from '@reduxjs/toolkit';
import { filterInitialState } from './types';

export const initialState: filterInitialState = {
    minPrice: 0,
    maxPrice: 1000,
    color: [],
    sizes: []
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter(state, action) {
            return { ...state, ...action.payload };
        }
    }
})

const { actions, reducer } = filtersSlice;
export const { setFilter } = actions;
export default reducer;