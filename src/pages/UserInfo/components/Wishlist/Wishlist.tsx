import Loading from '../../../../components/Loading/Loading';
import WishlistEmpty from './WishlistEmpty';
import WishlistItem from './WishlistItem';
import { ClothesData, UserData } from '../../../../slices/types';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';

const Wishlist = (props: {user: UserData, removeWishlistItem: (e: React.MouseEvent, item: ClothesData) => void}) => {
    const wishlist = props.user.wishlist;
    const cart = props.user.cart !== undefined ? props.user.cart : [];
    
    const loadingStatus = useSelector((state: RootState) => state.user.userLoadingStatus);

    return (
        <>
            {loadingStatus === "loading" && <Loading/>}
            {loadingStatus === "idle" && (
                <>
                    <h1 className="b-info_title">Wishlist</h1>
                    <div className="b-wishlist">
                        {wishlist == undefined || wishlist.length === 0 && <WishlistEmpty/>}
                        {wishlist != undefined && wishlist.length > 0 && (
                            <>
                                {wishlist.map((item) => (
                                    <WishlistItem item={item} cart={cart} removeWishlistItem={props.removeWishlistItem} key={item.id}/>
                                ))}
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Wishlist;