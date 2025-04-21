import { ProductStatus } from "./filtersData";

export interface ProductFilterQuery {
    status?: ProductStatus; 
    [key: string]: string | number | boolean | undefined;
}