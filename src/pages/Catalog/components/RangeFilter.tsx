import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '../../../store/store';
import { setFilter } from '../../../slices/filterSlice';

const RangeFilter = (props: {price: {"min": number, "max": number}}) => {
    const dispatch = useDispatch<StoreDispatch>();
    const {min, max} = props.price;
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    useEffect(() => {
        setMinValue(min);
        setMaxValue(max);
    }, [min, max]);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = Math.min(Number(event.target.value), maxValue - 1);
        if (value < min) value = min; 
        setMinValue(value);
        dispatch(setFilter({minPrice: value}));
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = Math.max(Number(event.target.value), minValue + 1);
        if (value > max) value = max; 
        setMaxValue(value);
        dispatch(setFilter({maxPrice: value}));
    };

    return (
        <div className="b-range">
            <input
                type="range"
                min={min}
                max={max}
                step={0.01}
                value={minValue}
                onChange={handleMinChange}
                className="thumb b-range_left"
            />
            <input
                type="range"
                min={min}
                max={max}
                step={0.01}
                value={maxValue}
                onChange={handleMaxChange}
                className="thumb b-range_right"
            />
            <div className="b-range_track" style={{
                left: `${(minValue - min) * 100 / (max - min)}%`,
                right: `${100 - (maxValue - min) * 100 / (max - min)}%`
            }}></div>
            <div className="b-range_back"></div>
            <div className="b-range_values">
                <input type="number" 
                       value={minValue}
                       onChange={(e) => handleMinChange(e)}
                       className="b-range_input min" 
                />
                <input type="number" 
                       value={maxValue}
                       onChange={(e) => handleMaxChange(e)}
                       className="b-range_input max" 
                />
            </div>
        </div>
      );
}

export default RangeFilter;