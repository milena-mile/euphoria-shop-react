import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import './header.scss';

const Header = () => {
	const {pathname} = useLocation();
	const {userId} = useUserContext();
	const authPages = ["/signin", "/signup", "/reset-password", "/change-password"];

	const location = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		setMenuOpen(false);
	}, [location])

	return (
		<header className="b-header">
			<div className="b-header_wrapper">
				<Link to="/" className="b-header_logo">
					<img src="/public/images/logo.svg" alt="logo" />
				</Link>
				<button className={`b-header_mobile-button ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}></button>
				<div className={`b-header_nav ${menuOpen ? "active" : ""}`}>
					<nav className="b-header_nav-wrap">
						<NavLink to="/shop" className="b-header_nav-link">Shop</NavLink>
						<NavLink to="/men" className="b-header_nav-link">Men</NavLink>
						<NavLink to="/women" className="b-header_nav-link">Women</NavLink>
					</nav>
					{authPages.includes(pathname) ?
					<div className="b-header_user-menu auth">
						<NavLink to="/signin" className="b-header_auth-link">Login</NavLink>
						<NavLink to="/signup" className="b-header_auth-link">Sign Up</NavLink>
					</div>
					:
					<div className="b-header_user-menu">
						<NavLink to="/wishlist" className="b-header_user-link">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M9.99486 4.93011C8.49535 3.18259 5.99481 2.71251 4.11602 4.31271C2.23723 5.91291 1.97273 8.58837 3.44815 10.4809C4.67486 12.0545 8.38733 15.3732 9.60407 16.4473C9.7402 16.5675 9.80827 16.6276 9.88766 16.6512C9.95695 16.6718 10.0328 16.6718 10.1021 16.6512C10.1815 16.6276 10.2495 16.5675 10.3857 16.4473C11.6024 15.3732 15.3149 12.0545 16.5416 10.4809C18.017 8.58837 17.7848 5.89608 15.8737 4.31271C13.9626 2.72935 11.4944 3.18259 9.99486 4.93011Z" stroke="#807D7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</NavLink>
						<NavLink to={userId === "" ? "/signin" : "/my-info"} className="b-header_user-link">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.99992 11.6666C12.3011 11.6666 14.1666 9.80117 14.1666 7.49998C14.1666 5.19879 12.3011 3.33331 9.99992 3.33331C7.69873 3.33331 5.83325 5.19879 5.83325 7.49998C5.83325 9.80117 7.69873 11.6666 9.99992 11.6666ZM9.99992 11.6666C6.31802 11.6666 3.33325 13.9052 3.33325 16.6666M9.99992 11.6666C13.6818 11.6666 16.6666 13.9052 16.6666 16.6666" stroke="#807D7E" strokeWidth="1.5" strokeLinecap="round"/>
							</svg>
						</NavLink>
						<NavLink to="/cart" className="b-header_user-link">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M2.5 3.33331H3.00526C3.85578 3.33331 4.56986 3.97373 4.6621 4.81923L5.3379 11.0141C5.43014 11.8596 6.14422 12.5 6.99474 12.5H14.205C14.9669 12.5 15.6317 11.9834 15.82 11.2452L16.9699 6.7359C17.2387 5.6821 16.4425 4.65739 15.355 4.65739H5.5M5.52063 15.5208H6.14563M5.52063 16.1458H6.14563M14.6873 15.5208H15.3123M14.6873 16.1458H15.3123M6.66667 15.8333C6.66667 16.2936 6.29357 16.6666 5.83333 16.6666C5.3731 16.6666 5 16.2936 5 15.8333C5 15.3731 5.3731 15 5.83333 15C6.29357 15 6.66667 15.3731 6.66667 15.8333ZM15.8333 15.8333C15.8333 16.2936 15.4602 16.6666 15 16.6666C14.5398 16.6666 14.1667 16.2936 14.1667 15.8333C14.1667 15.3731 14.5398 15 15 15C15.4602 15 15.8333 15.3731 15.8333 15.8333Z" stroke="#807D7E" strokeWidth="1.5" strokeLinecap="round"/>
							</svg>
						</NavLink>
					</div>
					}
				</div>
			</div>
		</header>
	);
};

export default Header;
