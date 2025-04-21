import { atom } from "jotai";

// Define a global state atom (no initial state required)
export const globalDataAtom = atom<{ [key: string]: any }>({});
