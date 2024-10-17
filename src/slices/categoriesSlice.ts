import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState();

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
			categoriesAdapter.setAll(state, action.payload);
		},
    }
})

const { actions, reducer } = categoriesSlice;
export const { setCategories } = actions;
export default reducer;
