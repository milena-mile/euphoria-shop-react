import { addToCart } from '../../../../services/asynkThunks/fetchesCart';
import { CartData, ClothesData } from '../../../../slices/types';
import { StoreDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useUserContext } from '../../../../context/userContext';

const WishlistItem = (props: {item: ClothesData, cart: CartData[], removeWishlistItem: (e: React.MouseEvent, item: ClothesData) => void}) => {
    const product = props.item;
    const {userId} = useUserContext();
    const dispatch = useDispatch<StoreDispatch>();

    const [size, setSize] = useState<string | null>(null);
    const [color, setColor] = useState<string | null>(null);
    const [message, setMessage] = useState("");

    const handleParams = (event: React.ChangeEvent<HTMLInputElement>, filter: string) => {
        setMessage("");
        const param = event.target.value;

        if (filter === 'size') setSize(param);
        if (filter === 'color') setColor(param);
    }

    const addProductToCard = (event: React.MouseEvent, item: ClothesData) => {
        event.preventDefault();

        if (size && color) {
            const product = {
                id: item.id,
                name: item.name,
                size: size,
                color: color,
                price: item.price,
                sale: item.sale,
                photo: item.photos[0],
                quantity: 1
            };

            try {
                dispatch(addToCart({userId, product}))
                .then(() => props.removeWishlistItem(event, item));
            } catch (error) {
                setMessage("Product was't added to cart");
            }
        }
    }

    return (
        <div className="b-wishlist_item">
            <button className="b-wishlist_remove" onClick={e => props.removeWishlistItem(e, product)}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 4L4 18M18 18L4 4.00001" stroke="#3C4242" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </button>
            <div className="b-wishlist_item-img">
                <img src={product.photos[0]} alt={product.name} />
            </div>
            <div className="b-wishlist_item-desc">
                <h2 className="b-wishlist_item-title">{product.name}</h2>
                <div className="b-product_size">
                <div className="b-product_size-list">
                    {product?.sizes.map((item, i) => (
                        <label className={`b-params_size-label ${size == item ? "active" : ""}`} key={i}>
                            <span className="b-params_size-size">{item}</span>
                            <input type="radio" name={`size-${product.id}`} value={item} onChange={(e) => handleParams(e, 'size')}/>
                        </label> 
                    ))}
                </div>
            </div>
            <div className="b-product_color">
                <div className="b-product_size-list">
                    {product?.color.map((item, i) => (
                        <label className={`b-params_color-label ${color == item ? "active" : ""}`} key={i}>
                            <span className={`b-params_color-back ${item}`} 
                                    style={{backgroundColor: item}}>
                            </span>
                            <input type="radio" name={`color-${product.id}`} value={item} onChange={(e) => handleParams(e, 'color')}/>
                        </label> 
                    ))}
                </div>
            </div>
            </div>
            <div className="b-wishlist_item-price">
                {product.sale !== 0 && <span className="b-card_price-new">${(product.price - (product.price * product.sale / 100)).toFixed(2)}</span>}
                <span className="b-card_price">${product.price.toFixed(2)}</span> 
            </div>
            <button className="b-wishlist_item-tocart" onClick={e => addProductToCard(e, product)} disabled={!color || !size}>Add to Cart</button>
            {message !== "" && <span className="b-message error">{message}</span>}
        </div>
    )
}

export default WishlistItem;