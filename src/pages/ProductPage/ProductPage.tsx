import Loading from '../../components/Loading/Loading';
import PhotoSlider from './components/PhotoSlider';
import ProductDescription from './components/ProductDescription';
import ProductParams from './components/ProductParams';
import { ClothesData } from '../../slices/types';
import { fetchProduct } from '../../services/asynkThunks/fetchProduct';
import { RootState, StoreDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './productPage.scss';
import 'swiper/css';
import 'swiper/css/thumbs';

const ProductPage = () => {
    const {productID} = useParams<{productID: string}>();
    const {pathname} = useLocation();
    const gender = pathname.split("/")[1];
    const dispatch = useDispatch<StoreDispatch>();
    
    const [product, setProduct] = useState<ClothesData>();

    const loadingStatus = useSelector((state: RootState) => state.product.productLoadingStatus);

    useEffect(() => {
        if (productID) {
            dispatch(fetchProduct({gender, productID}))
                .unwrap()
                .then(data => {
                    setProduct(data);
                });
        } 
    }, [dispatch, gender, productID]);

    return (
        <>
            {loadingStatus === "loading" && <Loading/>}
            <article className="b-product">
                <div className="b-product_main">
                    {(product && product.photos && product.photos.length > 0) && (
                        <PhotoSlider images={product.photos} /> 
                    )}
                    {product && <ProductParams product={product}/>}
                </div>
                {product && <ProductDescription product={product}/>}
            </article>   
        </>
    )
}

export default ProductPage;