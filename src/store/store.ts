import categories from '../slices/categoriesSlice';
import clothes from '../slices/clothesSlice';
import filters from '../slices/filterSlice';
import user from '../slices/userSlice';
import discount from '../slices/discountSlice';
import { configureStore } from '@reduxjs/toolkit';
import product from'../slices/productSlice';

const store = configureStore({
    reducer: {clothes, categories, filters, product, user, discount},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;