import { Link } from "react-router-dom"

const CartEmpty = () => {
    return (
        <div className="b-cart_empty">
            <div className="b-cart_empty-image">
                <img src="/images/empty-cart.svg" alt="empty cart" />
            </div>
            <h2 className="b-cart_empty-title">Your cart is empty and sad :(</h2>
            <span className="b-cart_empty-desc">Add something to make it happy!</span>
            <Link to="/shop" className="b-cart_empty-shopping">Continue Shopping</Link>
        </div>
    )
}

export default CartEmpty;