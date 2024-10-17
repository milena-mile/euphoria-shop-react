import Loading from '../../components/Loading/Loading';
import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
const CategoriesCards = lazy(() => import("../../components/CategoriesCards/CategoriesCards"));

const ShopPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 

    return (
        <Suspense fallback={<Loading />}>
            <CategoriesCards gender={"men"} />
            <CategoriesCards gender={"women"} />
        </Suspense>
    )
}

export default ShopPage;