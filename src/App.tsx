import AboutUs from './pages/TextPages/AboutUs';
import AuthPage from './pages/AuthPage/AuthPage';
import CartPage from './pages/CartCheckout/CartPage';
import Catalog from './pages/Catalog/Catalog';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import NotFound from './pages/NotFound/NotFound';
import PrivacyPolicy from './pages/TextPages/PrivacyPolicy';
import ProductPage from './pages/ProductPage/ProductPage';
import ProtectedRoute from './services/protectingRoute';
import ReturnRefund from './pages/TextPages/ReturnRefund';
import ShopPage from './pages/ShopPage/ShopPage';
import TermsConditions from './pages/TextPages/TermsConditions';
import UserInfo from './pages/UserInfo/UserInfo';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserContext } from './context/userContext';
import './App.scss';
import Contact from './pages/TextPages/Contact';

function App() {
	const {pathname} = useLocation();
	const {userId} = useUserContext();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/shop" element={<ShopPage/>} />

					<Route path="/signin" element={<AuthPage form={"login"}/>} />
					<Route path="/signup" element={<AuthPage form={"signup"}/>} />
					<Route path="/reset-password" element={<AuthPage form={"reset-pass"}/>} />
					<Route path="/change-password" element={<AuthPage form={"change-pass"}/>} />

					<Route path="/account/*" element={
						<ProtectedRoute userId={userId}>
							<Routes>
								<Route path="my-info" element={<UserInfo page="my-info"/>} />
								<Route path="wishlist" element={<UserInfo page="wishlist" />} />
								<Route path="orders" element={<UserInfo page="orders" />} />
								<Route path="cart" element={<CartPage page="cart" />} />
								<Route path="checkout" element={<CartPage page="checkout" />} />
							</Routes>
						</ProtectedRoute>
					} />

					<Route path="/men" element={<Catalog gender={"men"}/>} />
					<Route path="/men/:category" element={<Catalog gender={"men"}/>} />
					<Route path="/men/:category/:productID" element={<ProductPage />} />
					
					<Route path="/women" element={<Catalog gender={"women"}/>} />
					<Route path="/women/:category" element={<Catalog gender={"women"}/>} />
					<Route path="/women/:category/:productID" element={<ProductPage />} />

					<Route path="/terms-conditions" element={<TermsConditions/>} />
					<Route path="/privacy-policy" element={<PrivacyPolicy/>} />
					<Route path="/about-us" element={<AboutUs/>} />
					<Route path="/returns-refunds" element={<ReturnRefund/>} />
					<Route path="/contact-us" element={<Contact/>} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer/>
		</>
	);
}

export default App;
