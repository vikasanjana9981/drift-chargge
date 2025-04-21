import { ShopObject } from "app/types/shop/shopObject";
import { atom } from "jotai";

// Define a product state atom
export const shopObject = atom<ShopObject | any>(null);

