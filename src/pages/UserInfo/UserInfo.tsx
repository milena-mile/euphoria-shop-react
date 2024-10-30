import AsideUser from './components/UserAside';
import MyInfo from './components/MyInfo';
import Orders from './components/Orders/Orders';
import Wishlist from './components/Wishlist/Wishlist';
import { fetchUser } from '../../services/asynkThunks/fetchUser';
import { removeFromWishlist } from '../../services/asynkThunks/fetchesWishlist';
import { StoreDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { UserData } from '../../slices/types';
import { useUserContext } from '../../context/userContext';
import { WishlistCartData } from '../../slices/types';
import './userInfo.scss';

const UserInfo = (props: {page: string}) => {
	const {userId} = useUserContext();
    const dispatch = useDispatch<StoreDispatch>();
    const [user, setUser] = useState<UserData>({"email": "", "id": "", "orders": [], wishlist: []});
    const [wishlist, setWishlist] = useState<WishlistCartData[]>([]);

    const removeWishlistItem = (event: React.MouseEvent, product: WishlistCartData) => {
        event.preventDefault();
 
         if (product && product.id) {
            const productLink = product.link;
             dispatch(removeFromWishlist({userId, product, productLink})).unwrap().then((data) => {
                console.log(data);
                setWishlist(prevState => 
                    prevState.filter((item) => item.id !== data.wishlistItem.id)
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