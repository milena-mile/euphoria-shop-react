import { collection, getDocs, query,  where } from 'firebase/firestore';
import { UserData } from '../slices/types';
import { firestore } from '../services/firebase';

const findUser = async (userId: string) => {
    const userQuery = collection(firestore, "users");
    const userFilter = query(userQuery, where('id', '==', userId));
    const querySnapshot = await getDocs(userFilter);

    if (!querySnapshot.empty) {
        return querySnapshot.docs[0];
    } else {
        throw new Error("User not found");
    }
};
const findUserRef = async (userId: string) => {
    const user = await findUser(userId);
    if (user.ref) {
        return user.ref;
    } else {
        throw new Error("User info not found");
    }
}

const findUserData = async (userId: string) => {
    const userDoc = await findUser(userId);
    const userData = userDoc.data() as UserData;
    if (userData) {
        return { idDoc: userDoc.id, ...userData };
    } else {
        throw new Error("User info not found");
    }
};

export { findUserRef, findUserData };