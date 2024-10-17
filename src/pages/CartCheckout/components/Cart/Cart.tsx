import CartEmpty from './CartEmpty';
import CartItem from '../Cart/CartItem';
import { CartProps } from '../../types';
import { fetchDiscount } from '../../../../services/asynkThunks/fetchDiscount';
import { Link } from 'react-router-dom';
import { StoreDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const Cart: React.FC<CartProps> = ({cart, subtotal, shipping, setSubtotal, setShipping, handleRemove}) => {
    const dispatch = useDispatch<StoreDispatch>();
    const discountValue = localStorage.getItem("discount");
    const parsedDiscount = discountValue ? JSON.parse(discountValue) : "";

    const [discountCode, setDiscountCode] = useState(parsedDiscount[0] ? parsedDiscount[0] : "");
    const [discount, setDiscount] = useState(parsedDiscount[1] ? +parsedDiscount[1] : 0);
    const [message, setMessage] = useState("");

    const handleDiscountCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountCode(event.target.value);
        setMessage("");
    }

    const handleDiscount = (event: React.MouseEvent) => {
        event.preventDefault();

        if (discountCode !== "") {
            dispatch(fetchDiscount(discountCode)).unwrap()
                .then(data => {
                    localStorage.setItem("discount", JSON.stringify([discountCode, data.value]));
                    setDiscount(data.value);
                })
                .catch(error => {
                    setDiscount(0);
                    localStorage.removeItem("discount");
                    setMessage(error);
                }); 
        } else {
            setDiscount(0);
            localStorage.removeItem("discount");
            setMessage("Discount field is empty");
        }
    }

    return (
        <>
         {(cart && cart.length > 0) && (
                <>
                    <div className="b-cart_row-wrap">
                        <div className="b-cart_row header">
                            <div className="b-cart_cell">Product Details</div>
                            <div className="b-cart_cell">Price</div>
                            <div className="b-cart_cell">Quantity</div>
                            <div className="b-cart_cell">Shipping</div>
                            <div className="b-cart_cell">Subtotal</div>
                            <div className="b-cart_cell">Action</div>
                        </div>
                    </div>
                    {cart.map((item) => (
                        <CartItem product={item} 
                                  handleRemove={handleRemove} 
                                  setSubtotal={setSubtotal} 
                                  setShipping={setShipping} 
                                  key={`${item.id}-${item.color}-${item.size}`} />
                    ))}
                    <section className="b-cart_result">
                        <div className="b-cart_discount">
                            <h3 className="b-cart_discount-title">Discount Codes</h3>
                            <span className="b-cart_discount-desc">Enter your coupon code if you have one</span>
                            <div className="b-cart_discount-form">
                                <input className="b-cart_discount-input" 
                                       type="text" 
                                       name="discount"
                                       value={discountCode}
                                       onChange={(e) => handleDiscountCode(e)} />
                                <button className="b-cart_discount-button" onClick={(e) => handleDiscount(e)}>Apply Coupon</button>
                                {message !== "" && <span className="b-message error">{message}</span>}
                            </div>
                            <Link to="/shop" className="b-cart_shopping">Continue Shopping</Link>
                        </div>
                        <div className="b-cart_total">
                            <div className="b-cart_total-item subtotal">
                                <span className="b-cart_total-title">Sub Total</span>
                                <span className="b-cart_total-sum">{`$${subtotal.toFixed(2)}`}</span>
                            </div>
                            <div className="b-cart_total-item shipping">
                                <span className="b-cart_total-title">Shipping</span>
                                <span className="b-cart_total-sum">{`$${shipping.toFixed(2)}`}</span>
                            </div>
                            {discount !== 0 && (
                                <div className="b-cart_total-item discount">
                                    <span className="b-cart_total-title">Discount</span>
                                    <span className="b-cart_total-sum">{`-$${(subtotal * discount / 100).toFixed(2)}`}</span>
                                </div>
                            )}
                            <div className="b-cart_total-item grandtotal">
                                <span className="b-cart_total-title">Grand Total</span>
                                <span className="b-cart_total-sum">{`$${(subtotal + shipping - (subtotal * discount / 100)).toFixed(2)}`}</span>
                            </div>
                            <hr></hr>
                            <Link to="/checkout" className="b-cart_checkout">Proceed To Checkout</Link>
                        </div>
                    </section>
                </>
            )}
            {(!cart || cart.length === 0) && (
                <CartEmpty />
            )}
        </>
    )
}

export default Cart;