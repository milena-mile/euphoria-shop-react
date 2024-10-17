import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { selectAll } from '../../slices/clothesSlice';
import { ClothesData } from '../../slices/types';

export const getClothes = (state: RootState) => selectAll(state);
const getFilters = (state: RootState) => state.filters;

export const getFilteredProducts = createSelector(
    [getClothes, getFilters],
    (clothes: ClothesData[], filters) => {
        const { minPrice, maxPrice, color, sizes } = filters;
        return clothes.filter(item => {   
            let price = 0;
            (item.sale > 0) ? price = +(item.price - (item.price * item.sale / 100)).toFixed(2) : price = item.price; 
            const matchesPrice = price >= minPrice && price <= maxPrice;
            const matchesColor = color.length > 0 ? color.some(filterColor => item.color.includes(filterColor)) : true;
            const matchesSize = sizes.length > 0 ? sizes.some(filterSize => item.sizes.includes(filterSize)) : true;
            return matchesPrice && matchesColor && matchesSize;
        });
    }
);