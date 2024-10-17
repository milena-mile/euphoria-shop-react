import { auth } from '../../services/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export const changePassword = createAsyncThunk<void, string, {rejectValue: string}>(
    "user/changePassword",
    async (newPassword, {rejectWithValue}) => {
        const user = auth.currentUser;

        if (user) {
            try {
                const credential = EmailAuthProvider.credential(
                    user.email as string,
                    newPassword 
                );
    
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);
    
            } catch (error) {
                return rejectWithValue("Failed to change password");
            }
        } 
    }
)