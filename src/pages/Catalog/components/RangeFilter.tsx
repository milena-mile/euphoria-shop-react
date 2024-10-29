import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '../../../store/store';
import { setFilter } from '../../../slices/filterSlice';

const RangeFilter = (props: {price: {"min": number, "max": number}}) => {
    const dispatch = useDispatch<StoreDispatch>();
    const {min, max} = props.price;
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);
    const [minValueInter, setMinValueInter] = useState(min);
    const [maxValueInter, setMaxValueInter] = useState(max);

    useEffect(() => {
        setMinValue(min);
        setMaxValue(max);
        setMinValueInter(min);
        setMaxValueInter(max);
    }, [min, max]);

    const handleRangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = Math.min(Number(event.target.value), maxValue);
        if (value < min) value = min; 
        setMinValue(value);
        setMinValueInter(value);
        dispatch(setFilter({minPrice: value}));
    }

    const handleRangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = Math.max(Number(event.target.value), minValue);
        if (value > max) value = max; 
        setMaxValue(value);
        setMaxValueInter(value);
        dispatch(setFilter({maxPrice: value}));
    }

    const handleMinSet = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = +event.target.value;
        if (minValueInter < min) setMinValueInter(min); 
        if (minValueInter > max) setMinValueInter(max); 
        if (minValueInter > maxValueInter) {
            setMinValueInter(maxValueInter);
            value = maxValueInter;
        } 
        setMinValue(minValueInter);
        dispatch(setFilter({minPrice: value}));
    }

    const handleMaxSet = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = +event.target.value;
        if (maxValueInter > max) setMaxValueInter(max); 
        if (maxValueInter < min) setMaxValueInter(min);
        if (maxValueInter < minValueInter) {
            setMaxValueInter(minValueInter);
            value = minValueInter;
        }
        setMaxValue(maxValueInter);
        dispatch(setFilter({maxPrice: value}));
    }

    return (
        <div className="b-range">
            <input
                type="range"
                min={min}
                max={max}
                step={0.01}
                value={minValue}
                onChange={handleRangeMin}
                className="thumb b-range_left"
            />
            <input
                type="range"
                min={min}
                max={max}
                step={0.01}
                value={maxValue}
                onChange={handleRangeMax}
                className="thumb b-range_right"
            />
            <div className="b-range_track" style={{
                left: `${((minValue - min) * 100 / (max - min)) > 0 ? ((minValue - min) * 100 / (max - min)) : 0}%`,
                right: `${(100 - (maxValue - min) * 100 / (max - min)) > 0 ? (100 - (maxValue - min) * 100 / (max - min)) : 0}%`
            }}></div>
            <div className="b-range_back"></div>
            <div className="b-range_values">
                <input type="number" 
                       min={min}
                       max={max}
                       value={minValueInter == 0 ? "" : minValueInter}
                       onChange={(e) => setMinValueInter(Number(e.target.value))}
                       onBlur={(e) => handleMinSet(e)}
                       className="b-range_input min" 
                />
                <input type="number" 
                       min={min}
                       max={max}
                       value={maxValueInter == 0 ? "" : maxValueInter}
                       onChange={(e) => setMaxValueInter(Number(e.target.value))}
                       onBlur={(e) => handleMaxSet(e)}
                       className="b-range_input max" 
                />
            </div>
        </div>
      );
}

export default RangeFilter;