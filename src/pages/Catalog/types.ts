import { ClothesData } from "../../slices/types";

interface FilterProps {
    clothes: ClothesData[], 
    initialized: boolean, 
    gender: string, 
    setInitialized: React.Dispatch<React.SetStateAction<boolean>>
}

export type { FilterProps };