import CatalogItem from './components/CatalogItem';
import Filters from './components/Filters';
import Loading from '../../components/Loading/Loading';
import { clearClothes } from '../../slices/clothesSlice';
import { ClothesData } from '../../slices/types';
import { fetchClothes } from '../../services/asynkThunks/fetchClothes';
import { fetchUser } from '../../services/asynkThunks/fetchUser';
import { getFilteredProducts } from './filterSelector';
import { RootState } from '../../store/store';
import { StoreDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import './catalog.scss';

const Catalog = (props: {gender: string}) => {
    const {category} = useParams<{category: string}>();
    const {gender} = props;
    const {userId} = useUserContext();

    const dispatch = useDispatch<StoreDispatch>();

    const [initialized, setInitialized] = useState(false);
    const [wishProduct, setWishProduct] = useState<string[]>([]);

    const clothes: ClothesData[] = useSelector((state: RootState) => getFilteredProducts(state));
    const loadingStatus = useSelector((state: RootState) => state.clothes.goodsLoadingStatus);

    useEffect(() => {
        if (userId !== "") {
            dispatch(fetchUser(userId)).unwrap()
            .then(data => {
                data.wishlist?.forEach(item => {
                    setWishProduct(prevState => [...prevState, item.id]);
                })
            })
        }
        
    }, [dispatch, userId]);

    useEffect(() => {
        setInitialized(false);
        dispatch(clearClothes());
        dispatch(fetchClothes({ gender, category }));
        
	}, [dispatch, gender, category]);

    return ( 
        <div className="p-catalog">
            <Filters gender={gender} 
                        clothes={clothes} 
                        initialized={initialized} 
                        setInitialized={setInitialized}/> 
            {loadingStatus === "loading" && <div className="b-products_loading"><Loading/></div>}
            {loadingStatus === "idle" && 
                (clothes.length !== 0 ? (
                    <section className="b-products">
                        {clothes.map((item) => (
                            <CatalogItem gender={gender} product={item} wishProduct={wishProduct} key={item.id}/>
                        ))}
                    </section>
                ) : ( 
                    <div className="b-products_empty">
                        <img src="/public/images/not-found.svg" className="b-products_empty-nf" alt=""/>
                        <img src="/public/images/loading.svg" className="b-products_empty-loading" alt=""/>
                        <span className="b-products_empty-text">No products were found matching filters.</span>
                    </div>
                
                ))
            }
        </div>
    )
}

export default Catalog;