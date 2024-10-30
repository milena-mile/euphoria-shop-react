import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Loading from '../../components/Loading/Loading';
import { getCart, matchFilter, removeFromCart } from '../../services/asynkThunks/fetchesCart';
import { handleCartResult } from '../../utils/handleCartResult';
import { HandleRemoveArgs } from './types';
import { RootState } from '../../store/store';
import { StoreDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUserContext } from '../../context/userContext';
import { WishlistCartData } from '../../slices/types';
import './cart.scss';

const CartPage = (props: {page: string}) => {
    const {userId} = useUserContext();
    const dispatch = useDispatch<StoreDispatch>();
    const loadingStatus = useSelector((state: RootState) => state.user.userLoadingStatus);

    const [cart, setCart] = useState<WishlistCartData[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);

    useEffect(() => {
        setSubtotal(0);
        setShipping(0);
        dispatch(getCart(userId)).unwrap()
            .then(data => {
                setCart(data);
                data.forEach(item => {
                    const total = handleCartResult(item);
                    setSubtotal(prevState => prevState + total.totalPrice);
                    setShipping(prevState => prevState + total.shippingPrice);
                })
            })
    }, [dispatch, userId]);

    const handleRemove = ({ event, product, itemSubtotal, itemShipping }: HandleRemoveArgs) => {
        event.preventDefault();

        dispatch(removeFromCart({userId, product})).unwrap().then((data) => {
            setCart((prevCart) => prevCart.filter((item) => !matchFilter(item, data.product)));
            setSubtotal(prevState => prevState - itemSubtotal + itemShipping);
            setShipping(prevState => prevState - itemShipping);
        });
    }

    return (
        <section className="b-cart">
            {loadingStatus === "loading" && <Loading />}
            {(loadingStatus === "idle" && props.page === "cart") && (
                <Cart cart={cart}
                      subtotal={subtotal}
                      shipping={shipping}
                      setSubtotal={setSubtotal}
                      setShipping={setShipping}
                      handleRemove={handleRemove}/>
            )}
            {(loadingStatus === "idle" && props.page === "checkout") && (
                <Checkout cart={cart}
                          setCart={setCart}
                          subtotal={subtotal}
                          shipping={shipping}/>
            )}
        </section>
    )
}

export default CartPage;