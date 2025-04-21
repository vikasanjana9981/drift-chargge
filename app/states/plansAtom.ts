import { CreatePlanPageState } from "app/types/product/sellingPlans";
import { atom } from "jotai";

export const plansAtom = atom<any[]>([]); // Stores multiple plans in an array

export const prepaidPlanAtom = atom<any>([]);

export const payPerShipmentPlanAtom = atom<any>([]);

export const prePaidSubscriptionsGroupAtom = atom<any>([]);

export const createPlanPageStates = atom<CreatePlanPageState>();