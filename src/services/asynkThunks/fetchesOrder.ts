import generateUniqueId from 'generate-unique-id';
import { arrayUnion, updateDoc } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { findUserRef } from '../../utils/findUser';
import { formatDayDate, formatFullDate } from '../../utils/formatDate';
import { OrderPayload, OrderResponse } from './types';

export const addToOrder = createAsyncThunk<OrderResponse, OrderPayload, { rejectValue: string }>(
    "user/addToOrder",
    async ({userId, formData, cart, totalSum}: OrderPayload, {rejectWithValue}) => {
        try {
            const userRef = await findUserRef(userId); 
            const id2 = generateUniqueId({
                length: 10,
                useLetters: false
            });
            const currentDate = new Date();
            const orderDate = formatFullDate(currentDate); 
            const deliveryDate = formatDayDate(currentDate);

            const item = {
                id: `${id2}`,
                formData: formData,
                clothes: cart,
                totalSum: totalSum,
                orderDate: orderDate,
                deliveryDate: deliveryDate,
                orderStatus: "In progress",
                paymentMethod: "Cash on delivery"
            }

            await updateDoc(userRef, {
                orders: arrayUnion(item)
            })
            return { userId, item };
        } catch (error) {
            return rejectWithValue('Failed to fetch order list');
        }
    }
)