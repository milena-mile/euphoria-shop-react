import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../services/asynkThunks/fetchUser';
import { getCart } from '../services/asynkThunks/fetchesCart';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserData } from './types';
import { addToOrder } from '../services/asynkThunks/fetchesOrder';

export const userAdapter = createEntityAdapter<UserData>();

const initialState = userAdapter.getInitialState({
    userLoadingStatus: "idle",
    orderStatus: "idle"
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOutUser(state, action) {
            action.payload = {};
            state.userLoadingStatus = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
              state.userLoadingStatus = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserData>) => {
                if (action.payload) {
                  userAdapter.setOne(state, action.payload);
                }
                state.userLoadingStatus = "idle";
            })
            .addCase(fetchUser.rejected, (state) => {
              state.userLoadingStatus = "error";
            })
            .addCase(getCart.pending, (state) => {
              state.userLoadingStatus = "loading";
            })
            .addCase(getCart.fulfilled, (state) => {
              state.userLoadingStatus = "idle";
            })
            .addCase(getCart.rejected, (state) => {
              state.userLoadingStatus = "error";
            })
            .addCase(addToOrder.pending, (state) => {
              state.orderStatus = "loading";
            })
            .addCase(addToOrder.fulfilled, (state) => {
              state.orderStatus = "idle";
            })
            .addCase(addToOrder.rejected, (state) => {
              state.orderStatus = "error";
            }) 
    }
})

const { actions, reducer } = userSlice;
export const {signOutUser} = actions;
export default reducer;