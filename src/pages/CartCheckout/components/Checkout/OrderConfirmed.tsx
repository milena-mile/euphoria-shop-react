import { Link } from "react-router-dom";

const OrderConfirmed = () => {

    return (
        <div className="b-confirmed">
            <div className="b-confirmed_image">
                <img src="images/confirmed-girl.svg" alt="order confirmed" />
            </div>
            <div className="b-confirmed_info">
                <img src="images/confirmed-back.svg" alt="order confirmed" />
                <div className="b-confirmed_info-wrap">
                    <span className="b-confirmed-text">Your Order is Confirmed</span>
                    <Link to="/shop" className="b-confirmed-button">Continue Shopping</Link>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmed;