import AsideUser from './components/UserAside';
import MyInfo from './components/MyInfo';
import Orders from './components/Orders/Orders';
import Wishlist from './components/Wishlist/Wishlist';
import { ClothesData } from '../../slices/types';
import { fetchUser } from '../../services/asynkThunks/fetchUser';
import { removeFromWishlist } from '../../services/asynkThunks/fetchesWishlist';
import { StoreDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { UserData } from '../../slices/types';
import { useUserContext } from '../../context/userContext';
import './userInfo.scss';

const UserInfo = (props: {page: string}) => {
	const {userId} = useUserContext();
    const dispatch = useDispatch<StoreDispatch>();
    const [user, setUser] = useState<UserData>({"email": "", "id": "", "orders": []});
    const [wishlist, setWishlist] = useState<ClothesData[]>([]);

    const removeWishlistItem = (event: React.MouseEvent, product: ClothesData) => {
        event.preventDefault();
 
         if (product && product.id) {
             dispatch(removeFromWishlist({userId, product})).unwrap().then((data) => {
                setWishlist(prevState => 
                    prevState.filter((item) => item.id !== data.product.id)
                );
             });
         } 
     }

    useEffect(() => {
        dispatch(fetchUser(userId)).unwrap()
            .then((data: UserData) => setUser(data));
    }, [dispatch, userId, wishlist]);

    return (
        <div className="b-user">
            <AsideUser />
            <div className="b-user_main">
                {props.page === "my-info" && <MyInfo email={user.email}/>}
                {props.page === "wishlist" && <Wishlist user={user} removeWishlistItem={removeWishlistItem}/>}
                {props.page === "orders" && <Orders orders={user.orders ?? []}/>}
            </div>
        </div>
    )
}

export default UserInfo;