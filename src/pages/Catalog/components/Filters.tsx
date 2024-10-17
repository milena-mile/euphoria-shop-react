import RangeFilter from './RangeFilter';
import { fetchCategories } from '../../../services/asynkThunks/fetchCategories';
import { filterKeys } from '../../../slices/types';
import { FilterProps } from '../types';
import { initialState } from '../../../slices/filterSlice';
import { NavLink } from 'react-router-dom';
import { RootState, StoreDispatch } from '../../../store/store';
import { setFilter } from '../../../slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Filters: React.FC<FilterProps> = (props) => {
    const dispatch = useDispatch<StoreDispatch>();
    const location = useLocation();

    const {gender, clothes, initialized, setInitialized} = props;

    const [categories, setCategories] = useState<string[]>([]);
    const [price, setPrice] = useState({"min": 0, "max": 0});
    const [colors, setColors] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterItemOpen, setFilterItemOpen] = useState(true);

    const filters = useSelector((state: RootState) => state.filters);
    const loadingStatus = useSelector((state: RootState) => state.clothes.goodsLoadingStatus);

    useEffect(() => {
        setInitialized(false);
        dispatch(fetchCategories(gender)).unwrap()
        .then((data) => {
            setCategories(data);
        });
        dispatch(setFilter(initialState));
    }, [gender, dispatch, location, setInitialized]);

    useEffect(() => {
        if (initialized === false && clothes.length > 0) {
            const handleFilters = () => {
                let min = 1000;
                let max = 0;
                const colorFilter = new Set<string>();
                const sizeFilter = new Set<string>();

                clothes.forEach(item => {
                    let price = 0;
                    (item.sale > 0) ? price = +(item.price - (item.price * item.sale / 100)).toFixed(2) : price = item.price;
                    if (price < min) min = price;
                    if (price > max) max = price;

                    item.color.forEach(color => colorFilter.add(color));
                    item.sizes.forEach(size => sizeFilter.add(size))
                });

                setPrice({ min, max });
                setColors([...colorFilter]);
                setSizes([...sizeFilter]);
            };

            handleFilters();
            setInitialized(true);
        }
    }, [clothes, gender, initialized]);

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>, filter: filterKeys) => {
        const filterVal = event.target.value;
        const currentFilter: string[] = filters[filter] || [];

        const updatedFilter = currentFilter.includes(filterVal)
            ? currentFilter.filter((i: string) => i !== filterVal)
            : [...currentFilter, filterVal];

        dispatch(setFilter({ [filter]: updatedFilter }));
    };

    useEffect(() => {
        setFilterOpen(false);
    }, [location])

    return (
        <aside className={`b-filters ${filterOpen ? " active" : ""}`} key={location.pathname}>
            <button className="b-filters_button" onClick={() => setFilterOpen(!filterOpen)}>{filterOpen ? "Close Filters" : "Open Filters"}</button>
            <div className={`b-filters_wrap ${filterOpen ? " active" : ""}`}>
                <div className="b-filters_item">
                    <h3 className={`b-filters_title ${filterItemOpen ? "active" : ""}`}  onClick={() => setFilterItemOpen(!filterItemOpen)}>
                        <span>Filter</span>
                        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.83333 6.33333L2.83333 1.75M2.83333 18.25L2.83333 10M13.8333 18.25L13.8333 10M8.33333 18.25V13.6667M8.33333 10V1.75M13.8333 6.33333L13.8333 1.75M1 6.33333H4.66667M6.5 13.6667H10.1667M12 6.33333L15.6667 6.33333" stroke="#807D7E" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                    </h3>
                    <div className="b-filters_filter">
                        {loadingStatus === "loading" && <span className="b-filters_loading"><img src="/images/loading-ico.svg" alt="loading"/></span>}
                        {loadingStatus === "idle" && 
                            <>
                                {categories.map((item, i) => (
                                    <NavLink to={`/${props.gender}/${item.toLowerCase().replace(/ /g, "-")}`} 
                                            className="b-filters_cat-link"
                                            key={i}>
                                        {item}
                                    </NavLink>
                                ))}
                            </>
                        }
                    </div>
                    <h3 className="b-filters_title angle active" onClick={() => setFilterItemOpen(!filterItemOpen)}>
                        <span>Price</span>
                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11.7415L5.73782 7.00373C6.08739 6.65416 6.08739 6.08739 5.73782 5.73782L1 1" stroke="#8A8989" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                    </h3>
                    <div className="b-filters_filter price">
                        {loadingStatus === "loading" && <span className="b-filters_loading"><img src="/images/loading-ico.svg" alt="loading"/></span>}
                        {loadingStatus === "idle" && <RangeFilter price={price}/>}
                    </div>
                    <h3 className="b-filters_title angle active" onClick={() => setFilterItemOpen(!filterItemOpen)}>
                        <span>Colors</span>
                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11.7415L5.73782 7.00373C6.08739 6.65416 6.08739 6.08739 5.73782 5.73782L1 1" stroke="#8A8989" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                    </h3>
                    <div className="b-filters_filter color">
                        {loadingStatus === "loading" && <span className="b-filters_loading"><img src="/images/loading-ico.svg" alt="loading"/></span>}
                        {loadingStatus === "idle" &&
                            <>
                                {colors.map((item, i) => (
                                    <label className="b-filters_color-label" key={i}>
                                        <div className="b-filters_color-wrap">
                                            <div className={`b-filters_color-color ${item}`} style={{backgroundColor: item}}></div>
                                        </div>
                                        <span className="b-filters_color-title">{item}</span>
                                        <input type="checkbox" name="color" value={item} onChange={(e) => handleFilter(e, "color")}/>
                                    </label> 
                                ))}
                            </>
                        }
                    </div>
                    <h3 className="b-filters_title angle active"  onClick={() => setFilterItemOpen(!filterItemOpen)}>
                        <span>Size</span>
                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11.7415L5.73782 7.00373C6.08739 6.65416 6.08739 6.08739 5.73782 5.73782L1 1" stroke="#8A8989" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                    </h3>
                    <div className="b-filters_filter sizes">
                        {loadingStatus === "loading" && <span className="b-filters_loading"><img src="/images/loading-ico.svg" alt="loading"/></span>}
                        {loadingStatus === "idle" &&
                            <>
                                {sizes.map((item, i) => (
                                    <label className="b-filters_size-label" key={i}>
                                        <span className="b-filters_size-size">{item}</span>
                                        <input type="checkbox" name="size" value={item} onChange={(e) => handleFilter(e, "sizes")}/>
                                    </label> 
                                ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Filters;