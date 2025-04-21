import { AnchorType, DeliveryPolicy, FulfillmentTrigger, InventoryPolicy, Plan, PreAnchorBehaviorBehavior, RemainingBalanceChargeTrigger, SellingPlanInterval } from "app/types/product/sellingPlans";

// Type definitions
export interface SelectOption<T = string | number> {
    label: string;
    value: T;
}



// Constants
export const unitOptions: SelectOption<SellingPlanInterval>[] = [
    { label: "Day(s)", value: "DAY" },
    { label: "Week(s)", value: "WEEK" },
    { label: "Month(s)", value: "MONTH" },
    { label: "Year(s)", value: "YEAR" },
];

export const PricingPolicyAdjustmentTypeOptions: SelectOption<Plan['discountType']>[] = [
    { label: "Fixed amount off", value: "FIXED_AMOUNT" },
    { label: "Percentage off", value: "PERCENTAGE" },
    { label: "Set Price", value: "PRICE" },
];


export const inventoryReserveOptions: SelectOption<InventoryPolicy['reserve']>[] = [
    { label: "Reserve Inventory on Fulfillment", value: "ON_FULFILLMENT" },
    { label: "Reserve Inventory on Sale", value: "ON_SALE" },
];

export const deliveryPolicyFulfillmentTriggerOptions: SelectOption<FulfillmentTrigger>[] = [
    { label: "Anchor-based Fulfillment", value: "ANCHOR" },
    { label: "Fulfill as Soon as Possible", value: "ASAP" },
    { label: "Fulfill at an Exact Time", value: "EXACT_TIME" },
    { label: "Unknown Fulfillment Trigger", value: "UNKNOWN" },
]

export const dayOptions: SelectOption[] = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 7 },
];


export const anchorTypeOptions: SelectOption<AnchorType>[] = [
    { label: "Day of the Week (Monday–Sunday)", value: "WEEKDAY" },
    { label: "Day of the Month (1st–31st)", value: "MONTHDAY" },
    { label: "Specific Date in the Year (Month & Day)", value: "YEARDAY" },
]

export const preAnchorBehaviorOptions: SelectOption<PreAnchorBehaviorBehavior>[] = [
    { label: "On the Same Day", value: "ASAP" },
    { label: "On Next Anchor", value: "NEXT" },
]

export const inventoryPolicyOptions: SelectOption<Plan['inventoryPolicy']>[] = [
    { label: "On Sale", value: "ON_SALE" },
    { label: "On Fulfilment", value: "ON_FULFILMENT" },
];

export const monthDayOptions: SelectOption[] =
    Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}${['st', 'nd', 'rd'][((i + 1) % 10) - 1] || 'th'}`,
        value: (i + 1),
    }));

export const subscriptionRenewalDateTypeOptions: SelectOption[] = [
    { label: "Same day of month", value: "SAME_DAY" },
    ...Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}${['st', 'nd', 'rd'][((i + 1) % 10) - 1] || 'th'}`,
        value: (i + 1).toString(),
    })),
];

export const checkoutChargeTypeOptions: SelectOption[] = [
    { label: "The checkout charge is a percentage", value: "PERCENTAGE" },
    { label: "The checkout charge is a fixed price amount", value: "PRICE" },
]

export const remainingBalanceChargeTriggerOptions: SelectOption<RemainingBalanceChargeTrigger>[] = [
    { label: "At an exact time ", value: "EXACT_TIME" },
    // { label: "There's no remaining balance", value: "NO_REMAINING_BALANCE" },
    { label: "After the duration defined in the plan", value: "TIME_AFTER_CHECKOUT" },
]

export const timeUnitsOptions: SelectOption[] = [
    { value: "D", label: "Days" },
    { value: "W", label: "Weeks" },
    { value: "M", label: "Months" },
    { value: "Y", label: "Years" }
]

export const subscriptionRenewalCuttOffDateOptions: SelectOption[] =
    Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}${['st', 'nd', 'rd'][((i + 1) % 10) - 1] || 'th'}`,
        value: (i + 1).toString(),
    }));

// New Options for Weekly and Yearly Plans
export const weeklyRenewalOptions: SelectOption[] = [
    { label: "Monday", value: "mon" },
    { label: "Tuesday", value: "tue" },
    { label: "Wednesday", value: "wed" },
    { label: "Thursday", value: "thu" },
    { label: "Friday", value: "fri" },
    { label: "Saturday", value: "sat" },
    { label: "Sunday", value: "sun" },
];

export const yearlyRenewalMonthOptions: SelectOption[] = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
];

export const yearlyRenewalDayOptions: SelectOption[] =
    Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}${['st', 'nd', 'rd'][((i + 1) % 10) - 1] || 'th'}`,
        value: (i + 1).toString(),
    }));