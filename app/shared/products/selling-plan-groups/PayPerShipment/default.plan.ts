import { OneTimePlan, PayPerShipmentPlanGroup, PayPerShipmentSellingPlan, Plan, PrePaidSubscriptionSellingPlan, prePaidSubscriptionsGroupPlanGroup } from "app/types/product/sellingPlans";

const defaultPlan: Plan = {
    orderFrequency: 1,
    frequencyUnit: "month",
    frequencyName: "1 Month Subscription",
    showDescription: false,
    descriptionContent: '',
    subscriptionRenewalDayType: "SAME_DAY",
    yearlyRenewalDay: '',
    subscriptionCuttOffDate: '',
    offerDiscount: false,
    discountValue: 0,
    discountType: 'FIXED_AMOUNT',
    changeDiscountAfterChargeEnable: false,
    changeDiscountAfterCharge: 0,
    changeDiscountAfterChargeValue: 0,
    changeDiscountafterChargeDiscountType: 'FIXED',
    inventoryPolicy: 'ON_SALE',
    cancelationPolicy: 0,
    allowCancelAfterCharge: 0,
    enableAutomaticExpiration: false,
    automaticExpiration: 0,
    autoCancelAfterCharge: 0,
    OfferFreeTrial: false,
    freeTrialEndsPeriod: 0,
    freeTrialEndsPeriodUnit: 'DAY',
    freeTrialDiscountEnable: false,
    freeTrialDiscountValue: 0,
    freeTrialDiscountType: 'FIXED',
    planType: "Pay Per Shipment",
    billingFrequency: 1
};

export const defaultPayPerShipmentPlan: PayPerShipmentSellingPlan = {
    planName: '2 Week Subscription',
    showDescription: false,
    descriptionContent: '',
    category:'SUBSCRIPTION',
    pricingPolicyEnable: true,
    pricingPolicyAdjustmentType: 'PERCENTAGE',
    pricingPolicyAdjustmentValue: 10,
    pricingPolicyAfterCycleEnable: false,
    pricingPolicyAfterCycle: 0,
    pricingPolicyAfterCycleAdjustmentType: 'PERCENTAGE',
    pricingPolicyAfterCycleAdjustmentValue: 0,
    inventoryPolicyEnable: true,
    inventoryPolicyReserve: 'ON_FULFILLMENT',
    deliveryPolicyEnable: true,
    deliveryPolicyAnchorsCutoffDay: 2,
    deliveryPolicyAnchorsDay: 1,
    deliveryPolicyAnchorsMonth: 1,
    deliveryPolicyAnchorsType: 'WEEKDAY',
    deliveryPolicyCutoff: 2,
    deliveryPolicyFulfillmentExactTime: '',
    deliveryPolicyFulfillmentTrigger: 'ASAP',
    deliveryPolicyIntent: 'FULFILLMENT_BEGIN',
    deliveryPolicyPreAnchorBehavior: 'ASAP',
    deliveryRecurringPolicyEnable: true,
    preAnchorBehavior: 'ASAP',
    deliveryRecurringPolicyAnchorsCutoffDay: 1,
    deliveryRecurringPolicyAnchorsDay: 1,
    deliveryRecurringPolicyAnchorsMonth: 1,
    deliveryRecurringPolicyAnchorsType: 'WEEKDAY',
    deliveryRecurringPolicyCutoff: 1,
    deliveryRecurringPolicyIntent: 'FULFILLMENT_BEGIN',
    deliveryRecurringPolicyInterval: 'WEEK',
    deliveryRecurringPolicyIntervalCount: 1,
    deliveryRecurringPreAnchorBehavior: 'ASAP',
    billingRecurringPolicyEnable: true,
    billingRecurringPolicyInterval: 'WEEK',
    billingRecurringPolicyIntervalCount: 2,
    billingRecurringPolicyMinCycles: 0,
    billingRecurringPolicyMaxCycles: 0,
    billingRecurringPolicyAnchorsCutoffDay: 1,
    billingRecurringPolicyAnchorsDay: 1,
    billingRecurringPolicyAnchorsMonth: 1,
    billingRecurringPolicyAnchorsType: 'WEEKDAY',
}

export const defaultPrePaidSubscriptionPlan: PrePaidSubscriptionSellingPlan = {
    ...defaultPayPerShipmentPlan, 
    category:"PRE_ORDER"
};

export const defaultPrePaidShipmentGroup: PayPerShipmentPlanGroup = {
    groupName: "Pre Paid Shipment Plan Group",
    sellingPlansToCreate: [defaultPrePaidSubscriptionPlan]
}

export const defaultPayPerShipmentGroup: PayPerShipmentPlanGroup = {
    groupName: "Pay Per Shipment Plan Group",
    sellingPlansToCreate: [defaultPayPerShipmentPlan]
}

export const defaultPrePaidGroup: prePaidSubscriptionsGroupPlanGroup = { groupName: "PrePaid Subscription Plan Group" }

export const defaultOneTimePlan: OneTimePlan = {
    enable: false,
    planName: '',
    pricingPolicyEnable: true,
    pricingPolicyAdjustmentType: 'PERCENTAGE',
    pricingPolicyAdjustmentValue: 10,
    inventoryPolicyEnable: false,
    inventoryPolicyReserve: "ON_FULFILLMENT",
    deliveryPolicyEnable: false,
    deliveryPolicyAnchorsCutoffDay: 0,
    deliveryPolicyAnchorsDay: 1,
    deliveryPolicyAnchorsMonth: 0,
    deliveryPolicyAnchorsType: 'MONTHDAY',
    deliveryPolicyCutoff: 0,
    deliveryPolicyFulfillmentExactTime: (new Date()).toISOString(),
    deliveryPolicyFulfillmentTrigger: "ASAP",
    deliveryPolicyIntent: 'FULFILLMENT_BEGIN',
    deliveryPolicyPreAnchorBehavior: 'ASAP',
    preAnchorBehavior: "ASAP",
    billingPolicyEnable: false,
    billingPolicyCheckoutChargeType: 'PERCENTAGE',
    billingPolicyCheckoutChargeValue: 100,
    billingPolicyRemainingBalanceChargeExactTime: '',
    billingPolicyRemainingBalanceChargeTimeAfterCheckout: '',
    billingPolicyRemainingBalanceChargeTrigger: 'NO_REMAINING_BALANCE'
}

export default defaultPlan