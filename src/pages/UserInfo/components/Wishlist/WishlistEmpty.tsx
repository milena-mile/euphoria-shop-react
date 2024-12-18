import { Link } from "react-router-dom"

const WishlistEmpty = () => {
    return (
        <div className="b-wishlist_empty">
            <div className="b-wishlist_empty-img">
                <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M41.4787 20.46C35.2557 13.2078 24.8785 11.257 17.0815 17.8978C9.28452 24.5387 8.18681 35.6418 14.3098 43.4959C19.4007 50.0261 34.8074 63.7988 39.8569 68.2564C40.4218 68.7552 40.7043 69.0045 41.0338 69.1025C41.3214 69.188 41.636 69.188 41.9236 69.1025C42.2531 69.0045 42.5355 68.7552 43.1005 68.2564C48.15 63.7988 63.5567 50.0261 68.6475 43.4959C74.7705 35.6418 73.8069 24.4688 65.8759 17.8978C57.9449 11.3269 47.7017 13.2078 41.4787 20.46Z" stroke="#28A642" strokeWidth="6.225" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h2 className="b-wishlist_empty-title">Your wishlist is empty.</h2>
            <span className="b-wishlist_empty-desc">You don’t have any products in the wishlist yet. You will find a lot of interesting products on our Shop page.</span>
            <Link to="/shop" className="b-wishlist_empty-button">Continue Shopping</Link>
        </div>
    )
}

export default WishlistEmpty;