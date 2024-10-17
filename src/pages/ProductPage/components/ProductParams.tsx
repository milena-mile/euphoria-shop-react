import info from '../../../../public/data.json';
import { addToCart } from '../../../services/asynkThunks/fetchesCart';
import { ClothesData } from '../../../slices/types';
import { StoreDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useUserContext } from '../../../context/userContext';
import { useNavigate } from 'react-router-dom';

const ProductParams = (props: {product: ClothesData}) => {
    const {product} = props;
    const shipping = info.shippingInfo;
    const {userId} = useUserContext();
    const dispatch = useDispatch<StoreDispatch>();
    const navigate = useNavigate();

    const [size, setSize] = useState<string | null>(null);
    const [color, setColor] = useState<string | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState("");

    const handleParams = (event: React.ChangeEvent<HTMLInputElement>, filter: string) => {
        const param = event.target.value;

        if (filter === 'size') setSize(param);
        if (filter === 'color') setColor(param);
    }

    const addProductToCard = (event: React.MouseEvent, item: ClothesData) => {
        event.preventDefault();

        if (userId === "") navigate("/signin");

        if (size && color) {
            const product = {
                id: item.id,
                name: item.name,
                size: size,
                color: color,
                price: item.price,
                sale: item.sale,
                photo: item.photos[0],
                quantity: 0
            };

            try {
                dispatch(addToCart({userId, product}));
                setSize(null);
                setColor(null);
                setDisabled(false);
                setMessage("Product added to cart!"); 
                setTimeout(() => {
                    setMessage(""); 
                }, 1500);

            } catch (error) {
                setDisabled(true);
                setMessage("Product was't added to cart");
            }
        }
    }   

    return (
        <div className="b-product_params">
            <h1 className="b-product_title">{product.name}</h1>
            <div className="b-product_size">
                <span className="b-product_param-title">Select Size</span>
                <div className="b-product_size-list">
                    {product?.sizes.map((item, i) => (
                        <label className={`b-params_size-label ${size == item ? "active" : ""}`} key={i}>
                            <span className="b-params_size-size">{item}</span>
                            <input type="radio" 
                                   name="size" 
                                   value={item} 
                                   checked={size === item}
                                   onChange={(e) => handleParams(e, 'size')}/>
                        </label> 
                    ))}
                </div>
            </div>
            <div className="b-product_color">
                <span className="b-product_param-title">Select Color</span>
                <div className="b-product_size-list">
                    {product?.color.map((item, i) => (
                        <label className={`b-params_color-label ${color == item ? "active" : ""}`} key={i}>
                            <span className={`b-params_color-back ${item}`} 
                                    style={{backgroundColor: item}}>
                            </span>
                            <input type="radio" 
                                   name="color" 
                                   value={item} 
                                   checked={color === item}
                                   onChange={(e) => handleParams(e, 'color')}/>
                        </label> 
                    ))}
                </div>
            </div>
            <div className="b-product_add">
                <button className="b-product_add-button" disabled={!color || !size} onClick={e => addProductToCard(e, product)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.5 3.33331H3.00526C3.85578 3.33331 4.56986 3.97373 4.6621 4.81923L5.3379 11.0141C5.43014 11.8596 6.14422 12.5 6.99474 12.5H14.205C14.9669 12.5 15.6317 11.9834 15.82 11.2452L16.9699 6.7359C17.2387 5.6821 16.4425 4.65739 15.355 4.65739H5.5M5.52063 15.5208H6.14563M5.52063 16.1458H6.14563M14.6873 15.5208H15.3123M14.6873 16.1458H15.3123M6.66667 15.8333C6.66667 16.2936 6.29357 16.6666 5.83333 16.6666C5.3731 16.6666 5 16.2936 5 15.8333C5 15.3731 5.3731 15 5.83333 15C6.29357 15 6.66667 15.3731 6.66667 15.8333ZM15.8333 15.8333C15.8333 16.2936 15.4602 16.6666 15 16.6666C14.5398 16.6666 14.1667 16.2936 14.1667 15.8333C14.1667 15.3731 14.5398 15 15 15C15.4602 15 15.8333 15.3731 15.8333 15.8333Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
					</svg>
                    <span>Add to Cart</span>
                </button>
                <div className="b-product_price">
                    {product.sale > 0 && <span className="b-product_price-sale">${(product.price - product.price * product.sale / 100).toFixed(2)}</span>}
                    <span className={`b-product_price-price ${product.sale > 0 ? "sale" : ""}`}>${product.price}</span>
                </div>
            </div>
            {message !== "" && <span className={`b-message ${disabled ? "error" : "ok"}`}>{message}</span>}
            <hr></hr>
            <div className="b-product_shipping">
                {Object.entries(shipping).map(([key, value]) => (
                    <div className="b-product_shipping-item" key={key}>
                        <div className="b-product_shipping-image">
                            <img src={`/public/images/${value.image}.svg`} alt="" />
                        </div> 
                        <span className="b-product_shipping-title">{key}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductParams;