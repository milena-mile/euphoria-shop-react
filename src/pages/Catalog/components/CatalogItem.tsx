import { addToWishlist, removeFromWishlist } from '../../../services/asynkThunks/fetchesWishlist';
import { ClothesData } from '../../../slices/types';
import { Link, useNavigate } from 'react-router-dom';
import { StoreDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { useUserContext } from '../../../context/userContext';

const CatalogItem = (props: {product: ClothesData, gender: string, wishProduct: string[]}) => {
    const {gender, product} = props;
    const {userId} = useUserContext();
    const dispatch = useDispatch<StoreDispatch>();
    const navigate = useNavigate();
    const productLink = `/${gender}/${product.category}/${product.id}`;

    const handleWishlistItem = (event: React.MouseEvent) => {
        event.preventDefault();
        
        if (userId) {
            event.currentTarget.classList.toggle("active");
            if (event.currentTarget.classList.contains("active")) {
                dispatch(addToWishlist({userId, product, productLink}));
            } else {
                dispatch(removeFromWishlist({userId, product, productLink}));
            }
        } else {
            navigate("/signin");
        }  
    } 

    return (

        <Link to={productLink} className="b-card">
            <div className="b-card_image">
                <img src={product.photos[0]} alt={product.name} />
            </div>
            <div className="b-card_info">
                <span className="b-card_name">{product.name}</span>
                {product.sale != 0 ? 
                    <div className="b-card_price-sale">
                        <span className="b-card_price-new">${(product.price - (product.price * product.sale / 100)).toFixed(2)}</span>
                        <span className="b-card_price">${product.price.toFixed(2)}</span> 
                    </div>  
                :
                    <span className="b-card_price">${product.price.toFixed(2)}</span>
            }
                
            </div>
            <button className={`b-card_wishlist ${props.wishProduct.includes(product.id) ? "active" : ""}`} onClick={e => handleWishlistItem(e)}>
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.71983 2.7123C6.34501 1.1101 4.0524 0.679115 2.32985 2.14625C0.607289 3.61339 0.364777 6.06637 1.71751 7.80155C2.84222 9.24424 6.24597 12.287 7.36154 13.2718C7.48635 13.382 7.54875 13.4371 7.62155 13.4587C7.68508 13.4776 7.75459 13.4776 7.81812 13.4587C7.89092 13.4371 7.95332 13.382 8.07813 13.2718C9.19369 12.287 12.5974 9.24424 13.7222 7.80155C15.0749 6.06637 14.862 3.59795 13.1098 2.14625C11.3577 0.694548 9.09466 1.1101 7.71983 2.7123Z" stroke="#3C4242" strokeWidth="1.26066" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </Link>
    )
}

export default CatalogItem;