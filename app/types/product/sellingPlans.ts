// types.ts
export interface Plan {
    orderFrequency: number;
    frequencyUnit: 'day' | 'week' | 'month' | 'year';
    frequencyName: string;
    showDescription: boolean;
    descriptionContent: string;
    subscriptionRenewalDayType: string;
    subscriptionCuttOffDate: string;
    yearlyRenewalDay: string;
    offerDiscount: boolean;
    discountValue: number;
    discountType: 'FIXED_AMOUNT' | 'PERCENTAGE' | 'PRICE';
    changeDiscountAfterChargeEnable: boolean;
    changeDiscountAfterCharge: number;
    changeDiscountAfterChargeValue: number;
    changeDiscountafterChargeDiscountType: 'FIXED' | 'PERCENTAGE' | 'FIXED_PRICE';
    inventoryPolicy: 'ON_SALE' | 'ON_FULFILMENT';
    cancelationPolicy: number;
    enableAutomaticExpiration: boolean;
    automaticExpiration: number;
    OfferFreeTrial: boolean;
    freeTrialEndsPeriod: number;
    freeTrialEndsPeriodUnit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
    freeTrialDiscountEnable: boolean;
    freeTrialDiscountValue: number;
    freeTrialDiscountType: 'FIXED' | 'PERCENTAGE' | 'FIXED_PRICE';
    planType: string;
    allowCancelAfterCharge: number;
    autoCancelAfterCharge: number;
    billingFrequency: number;
}

export interface PayPerShipmentSellingPlan {
    planName: string;
    showDescription: boolean;
    category: SellingPlanCategory;
    descriptionContent: string;
    pricingPolicyEnable: boolean;
    pricingPolicyAdjustmentType: SellingPlanPricingPolicyAdjustmentType;
    pricingPolicyAdjustmentValue: number;
    pricingPolicyAfterCycleEnable: boolean;
    pricingPolicyAfterCycle: number;
    pricingPolicyAfterCycleAdjustmentType: SellingPlanPricingPolicyAdjustmentType;
    pricingPolicyAfterCycleAdjustmentValue: number;
    inventoryPolicyEnable: boolean;
    inventoryPolicyReserve: 'ON_FULFILLMENT' | 'ON_SALE';
    deliveryPolicyEnable: boolean;
    deliveryPolicyAnchorsCutoffDay: number;
    deliveryPolicyAnchorsDay: number;
    deliveryPolicyAnchorsMonth: number;
    deliveryPolicyAnchorsType: 'MONTHDAY' | 'WEEKDAY' | 'YEARDAY';
    deliveryPolicyCutoff: number;
    deliveryPolicyFulfillmentExactTime: string | null;
    deliveryPolicyFulfillmentTrigger: 'ANCHOR' | 'ASAP' | 'EXACT_TIME' | 'UNKNOWN';
    deliveryPolicyIntent: 'FULFILLMENT_BEGIN';
    deliveryPolicyPreAnchorBehavior: 'ASAP' | 'NEXT';
    deliveryRecurringPolicyEnable: boolean;
    preAnchorBehavior: PreAnchorBehavior,
    deliveryRecurringPolicyAnchorsCutoffDay: number;
    deliveryRecurringPolicyAnchorsDay: number;
    deliveryRecurringPolicyAnchorsMonth: number;
    deliveryRecurringPolicyAnchorsType: 'MONTHDAY' | 'WEEKDAY' | 'YEARDAY';
    deliveryRecurringPolicyCutoff: number;
    deliveryRecurringPolicyIntent: 'FULFILLMENT_BEGIN';
    deliveryRecurringPolicyInterval: SellingPlanInterval | null;
    deliveryRecurringPolicyIntervalCount: number | null;
    deliveryRecurringPreAnchorBehavior: 'ASAP' | 'NEXT';
    billingRecurringPolicyEnable: boolean,
    billingRecurringPolicyInterval: SellingPlanInterval;
    billingRecurringPolicyIntervalCount: number;
    billingRecurringPolicyMinCycles: number;
    billingRecurringPolicyMaxCycles: number;
    billingRecurringPolicyAnchorsCutoffDay: number;
    billingRecurringPolicyAnchorsDay: number;
    billingRecurringPolicyAnchorsMonth: number;
    billingRecurringPolicyAnchorsType: 'MONTHDAY' | 'WEEKDAY' | 'YEARDAY';
}

export type SellingPlanPricingPolicyAdjustmentType = 'FIXED_AMOUNT' | 'PERCENTAGE' | 'PRICE'

export interface PrePaidSubscriptionSellingPlan
    extends PayPerShipmentSellingPlan {
}

export type SellingPlanCategory = 'OTHER' | 'PRE_ORDER' | 'SUBSCRIPTION' | 'TRY_BEFORE_YOU_BUY'

export type SellingPlanInterval = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'

export interface OneTimePlan {
    enable: boolean;
    groupId?: string;
    sellingPlanId?: string;
    planName: string;
    pricingPolicyEnable: boolean;
    pricingPolicyAdjustmentType: 'FIXED_AMOUNT' | 'PERCENTAGE' | 'PRICE';
    pricingPolicyAdjustmentValue: number;
    inventoryPolicyEnable: boolean;
    inventoryPolicyReserve: 'ON_FULFILLMENT' | 'ON_SALE';
    deliveryPolicyEnable: boolean;
    deliveryPolicyAnchorsCutoffDay: number;
    deliveryPolicyAnchorsDay: number;
    deliveryPolicyAnchorsMonth: number;
    deliveryPolicyAnchorsType: 'MONTHDAY' | 'WEEKDAY' | 'YEARDAY';
    deliveryPolicyCutoff: number;
    deliveryPolicyFulfillmentExactTime: string | null;
    deliveryPolicyFulfillmentTrigger: 'ANCHOR' | 'ASAP' | 'EXACT_TIME' | 'UNKNOWN';
    deliveryPolicyIntent: 'FULFILLMENT_BEGIN';
    deliveryPolicyPreAnchorBehavior: 'ASAP' | 'NEXT';
    preAnchorBehavior: PreAnchorBehavior,
    billingPolicyEnable: boolean,
    billingPolicyCheckoutChargeType: 'PERCENTAGE' | 'PRICE',
    billingPolicyCheckoutChargeValue: number,
    billingPolicyRemainingBalanceChargeExactTime: string,
    billingPolicyRemainingBalanceChargeTimeAfterCheckout: string,
    billingPolicyRemainingBalanceChargeTrigger: RemainingBalanceChargeTrigger
}

export type RemainingBalanceChargeTrigger = 'EXACT_TIME' | 'NO_REMAINING_BALANCE' | 'TIME_AFTER_CHECKOUT'

export interface InventoryPolicy {
    reserve: 'ON_FULFILLMENT' | 'ON_SALE';
}

// Enum for Anchor Type
export type AnchorType = 'MONTHDAY' | 'WEEKDAY' | 'YEARDAY';

export type PreAnchorBehaviorBehavior = 'ASAP' | 'NEXT';

// Interface for Anchors
export interface DeliveryAnchor {
    cutoffDay: number;
    day: number;
    month: number;
    type: AnchorType;
}

// Enum for Fulfillment Trigger
export type FulfillmentTrigger = 'ANCHOR' | 'ASAP' | 'EXACT_TIME' | 'UNKNOWN';

// Enum for Intent
export type FulfillmentIntent = 'FULFILLMENT_BEGIN';

// Interface for Intent
export interface DeliveryIntent {
    intent: FulfillmentIntent;
}

// Enum for Pre-Anchor Behavior
export type PreAnchorBehavior = 'ASAP' | 'NEXT';

// Interface for Pre-Anchor Behavior
export interface DeliveryPreAnchorBehavior {
    preAnchorBehavior: PreAnchorBehavior;
}

// Interface for Fixed Delivery Policy
export interface FixedDeliveryPolicy {
    anchors: DeliveryAnchor;
    cutoff: number;
    fulfillmentExactTime: string;
    fulfillmentTrigger: FulfillmentTrigger;
    intent: DeliveryIntent;
    preAnchorBehavior: DeliveryPreAnchorBehavior;
}

// Main Delivery Policy Interface
export interface DeliveryPolicy {
    fixed: FixedDeliveryPolicy;
}

export interface oneTimeGroup {
    groupName: string;
    sellingPlansToCreate: OneTimePlan[]
}

export interface PayPerShipmentPlanGroup {
    groupName: string;
    descriptionContent?:string;
    sellingPlansToCreate: PayPerShipmentSellingPlan[]
    sellingPlansToUpdate?: PayPerShipmentSellingPlan[]
}

export interface PrePaidShipmentPlanGroup {
    groupName: string;
    descriptionContent?:string;
    sellingPlansToCreate: PrePaidSubscriptionSellingPlan[]
    sellingPlansToUpdate?: PrePaidSubscriptionSellingPlan[]
}

export interface prePaidSubscriptionsGroupPlanGroup {
    groupName: string;
}

export interface CreatePlanPageState {
    payPerShipmentGroup: {
        groupName: string;
        groupId?:string;
        descriptionContent?:string;
        sellingPlansToCreate: PayPerShipmentSellingPlan[];
        sellingPlansToUpdate?: PayPerShipmentSellingPlan[];
    };
    oneTimeGroup: {
        groupName: string;
        sellingPlansToCreate: OneTimePlan[];
        groupId?:string;
    }
    prePaidSubscriptionsGroup: {
        groupName: string;
        descriptionContent?:string;
        groupId?:string;
        sellingPlansToCreate: PrePaidSubscriptionSellingPlan[];
        sellingPlansToUpdate?: PayPerShipmentSellingPlan[];
    };

}

export interface PlanActions {
    onEdit: (index: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
}

export interface PlanFormProps {
    plan: Plan;
    onChange: (updatedPlan: Plan) => void;
}


// Selling Plans Group ENUMS
