import data from '../../../../../public/data.json';
import Dropdown from 'react-dropdown';
import Input from './Input';
import OrderConfirmed from './OrderConfirmed';
import React, { useEffect, useState } from 'react';
import { addToOrder } from '../../../../services/asynkThunks/fetchesOrder';
import { CheckoutProps, FormData, FormInputs } from '../../types';
import { clearCart } from '../../../../services/asynkThunks/fetchesCart';
import { RootState } from '../../../../store/store';
import { StoreDispatch } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useUserContext } from '../../../../context/userContext';
import 'react-dropdown/style.css';

const Checkout: React.FC<CheckoutProps> = ({cart, subtotal, shipping, setCart}) => {
    const {userId} = useUserContext();
    const dispatch = useDispatch<StoreDispatch>();
    const inputs = Object.entries(data.inputs);
    const [formData, setFormData] = useState<FormData>({});
    const [disabled, setDisabled] = useState<string[]>([]);
    const [confirmed, setConfirmed] = useState<boolean | undefined>();

    const discountValue = localStorage.getItem("discount");
    const parsedDiscount = discountValue ? JSON.parse(discountValue)[1] : "";
    const orderLoading = useSelector((state: RootState) => state.user.orderStatus)

    const handleFormData = (label: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [label]: value
        }))
        setDisabled(prevState => prevState.filter(item => item !== label));
    }

    const handleDelivery = (event: React.MouseEvent) => {
        event.preventDefault();
        const totalSum = `$${(subtotal + shipping - (subtotal * parsedDiscount ? +parsedDiscount : 0 / 100)).toFixed(2)}`;

        dispatch(addToOrder({userId, formData, cart, totalSum}))
            .then(() => {
                try {
                    setConfirmed(true);
                    localStorage.removeItem("discount");
                    dispatch(clearCart(userId));
                    setCart([]);
                } catch {
                    setConfirmed(false);
                }
            })
    }

    useEffect(() => {
        inputs.forEach((item) => {
            if (item[1].required) setDisabled(prevState => [...prevState, item[0]]);
        })
    }, [])
    
    return (
        <>
            {!confirmed &&
                <section className="b-checkout">
                    <h1 className="b-checkout_title">Check Out</h1>
                    <div className="b-checkout_form">
                    <span className="b-checkout_desc">Billing Details</span>
                        <form className="b-checkout_form-wrap">
                            {inputs.map(([key, value]: [string, FormInputs]) => {
                                return (
                                    <React.Fragment key={key}>
                                        {value.type !== "select" && (
                                            <Input label={key}
                                                type={value.type}
                                                required={value.required}
                                                placeholder={value.placeholder}
                                                setFormData={setFormData}
                                                name={key.toLowerCase().replace(/[,/]/g, "").replace(/\s/g, "-")}
                                                disabled={disabled}
                                                setDisabled={setDisabled}
                                                key={key}/>
                                        )}
                                        {value.type === "select" && (
                                            <label className={`b-input ${key.toLowerCase().replace(/\s/g, "-")}`}>
                                                <span className="b-input_label">{`${key}${value.required ? '*' : ''}`}</span>
                                                <Dropdown options={value.options} onChange={option => handleFormData(key, option.value)} value="" placeholder="State" />
                                            </label>  
                                        )}
                                    </React.Fragment>
                                )
                            })}
                            <div className="b-checkout_submit-wrap">
                                <button className="b-checkout_submit" disabled={disabled.length > 0} onClick={e => handleDelivery(e)}>Continue to delivery</button>
                                {orderLoading === "loading" && 
                                    <span className="b-loading-s">
                                        <img src="/images/loading-ico.svg" alt="loading" />
                                    </span>}
                                {orderLoading === "error" && <span className="b-message error">Something went wrong</span>}
                            </div>
                        </form>
                    </div>
                    <div className="b-checkout_cart">
                        <h2 className="b-checkout_cart-title">Order Summary</h2>
                        <div className="b-checkout_cart-wrap">
                            {cart.map(product => (
                                <div className="b-checkout_item" key={`${product.name}-${product.color}-${product.size}`}>
                                    <div className="b-checkout_item-image">
                                        <img src={product.photo} alt={product.name} />
                                    </div>
                                    <div className="b-checkout_details">
                                        <span className="b-checkout_name">{product.name} <span className="b-checkout_quantity">x {product.quantity}</span></span>
                                        <span className="b-checkout_param"><strong>Color:</strong> {product.color}</span>
                                        <span className="b-checkout_param"><strong>Size:</strong> {product.size}</span>
                                    </div>
                                    <div className="b-checkout_price">
                                        {product.sale !== 0 && <span className="b-checkout_price-new">${(product.price - (product.price * product.sale / 100)).toFixed(2)}</span>}
                                        <span className={`b-checkout_price${product.sale !== 0 ? "-old" : ""}`}>${product.price.toFixed(2)}</span> 
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="b-checkout_total-item subtotal">
                            <span className="b-cart_total-title">Sub Total <span className="b-checkout_total-quantity">( {cart.length} item{cart.length > 1 ? "s" : ""} )</span></span>
                            <span className="b-cart_total-sum">{`$${subtotal.toFixed(2)}`}</span>
                        </div>
                        {(parsedDiscount !== 0 && parsedDiscount) && (
                            <div className="b-checkout_total-item discount">
                                <span className="b-cart_total-title">Savings</span>
                                <span className="b-cart_total-sum">{`$${(subtotal * parsedDiscount / 100).toFixed(2)}`}</span>
                            </div>
                        )} 
                        <div className="b-checkout_total-item shipping">
                            <span className="b-cart_total-title">Shipping</span>
                            <span className="b-cart_total-sum">{`$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="b-checkout_total-item grandtotal">
                            <span className="b-cart_total-title">Total</span>
                            <span className="b-cart_total-sum">{`$${(subtotal + shipping - (subtotal * parsedDiscount ? +parsedDiscount : 0 / 100)).toFixed(2)}`}</span>
                        </div>
                    </div>
                </section>
            }
            {confirmed && <OrderConfirmed />} 
        </>
    )
}

export default Checkout;