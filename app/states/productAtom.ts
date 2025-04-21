import { ProductSingleNode } from "app/types/product/ProductNode";
import { atom } from "jotai";

// Define a product state atom
export const productAtom = atom<ProductSingleNode | any>(null);
