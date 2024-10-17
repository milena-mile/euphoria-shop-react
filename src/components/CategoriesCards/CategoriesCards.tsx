import { fetchCategories } from '../../services/asynkThunks/fetchCategories';
import { Link } from 'react-router-dom';
import { StoreDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './categoriesCards.scss';

const CategoriesCards = (props: {gender: string}) => {
    const dispatch = useDispatch<StoreDispatch>();
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        dispatch(fetchCategories(props.gender)).unwrap()
        .then((data) => {
            setCategories(data);
        });
    }, [dispatch, props.gender]);

    return (
        <section className="b-cat-cards">
            <h2 className="b-cat-cards_title">Categories For {`${props.gender[0].toUpperCase()}${props.gender.slice(1)}`}</h2>
            <div className="b-cat-cards_list">
                {categories.map((item, i) => (
                    <Link to={`/${props.gender}/${item.toLowerCase().replace(/ /g, "-")}`} className="b-cat-cards_item" key={i}>
                        <div className="image-wrapper b-cat-cards_image">
                            <img src={`images/categories/${props.gender}/${item.toLowerCase().replace(/ /g, "-")}.jpg`} alt={item} />
                        </div>
                        <span className="b-cat-cards_name">{item}</span>
                        <span className="b-cat-cards_desc">Explore Now!</span>
                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9571 7.71798C19.2843 7.39075 19.2843 6.86022 18.9571 6.533L13.6247 1.20059C13.2975 0.873368 12.7669 0.873368 12.4397 1.20059C12.1125 1.52781 12.1125 2.05835 12.4397 2.38557L17.1796 7.12549L12.4397 11.8654C12.1125 12.1926 12.1125 12.7232 12.4397 13.0504C12.7669 13.3776 13.2975 13.3776 13.6247 13.0504L18.9571 7.71798ZM0.489258 7.9634L18.3646 7.9634V6.28758L0.489258 6.28758L0.489258 7.9634Z" fill="#797979"/>
                        </svg>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default CategoriesCards;