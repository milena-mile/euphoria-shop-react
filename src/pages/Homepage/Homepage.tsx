import info from '../../../public/data.json';
import Loading from '../../components/Loading/Loading';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
const Banner = lazy(() => import('./components/Banner'));
const CategoriesCards = lazy(() => import('../../components/CategoriesCards/CategoriesCards'));
const Feedback = lazy(() => import('./components/Feedback/Feedback'));
const SaleBanner = lazy(() => import('./components/SaleBanner'));
import 'swiper/css';
import './homepage.scss';

const Homepage = () => {
    const brands = info.brands;

	return (
        <Suspense fallback={<Loading />}>
            <Banner/>
            <section className="b-sale">
                <SaleBanner name={"left"}/>
                <SaleBanner name={"right"}/>
            </section>
            <section className="b-shop-now">
                <div className="b-shop-now_item--left">
                    <img src="/images/shop-now-back.jpg" className="b-shop-now_item-image" alt="shop now" />
                    <div className="b-shop-now_item-info">
                        <h3 className="b-shop-now_item-title">WE MADE YOUR EVERYDAY FASHION BETTER!</h3>
                        <span className="b-shop-now_item-desc">In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</span>
                        <Link to="/shop" className='button-link'>Shop Now</Link>
                    </div>
                </div>
                <div className="b-shop-now_item--right">
                <img src="/images/shop-now-people.jpg" className="b-shop-now_item-image" alt="shop now" />
                </div>
            </section>
            <CategoriesCards gender={"men"} />
            <CategoriesCards gender={"women"} />
            <section className="b-brands">
                <h2 className="b-brands_title">Top Brands Deal</h2>
                <span className="b-brands_desc">Up To <strong>60%</strong> off on brands</span>
                <div className="b-brands_list">
                    {brands.map((item, i) =>(
                        <div className="b-brands_item" key={i}>
                            <img src={`/images/brands/${item}.svg`} alt={item} />
                        </div>
                    ))}
                </div>
            </section>
            <Feedback/>
        </Suspense>
    );
};

export default Homepage;
