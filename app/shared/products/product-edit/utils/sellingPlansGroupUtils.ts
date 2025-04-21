import { OneTimePlan, PayPerShipmentSellingPlan } from "app/types/product/sellingPlans";

export interface SellingPlanGroup {
    appId: string;
    createdAt: string;
    id: string;
    merchantCode: string;
    name: string;
    options: string[];
    position: number;
    sellingPlans: {
        edges: Array<{
            cursor: string;
            node: {
                category: string;
                createdAt: string;
                description: string | null;
                position: number | null;
                name: string;
                options: string[];
                id: string;
                deliveryPolicy: {
                    cutoff: number | null;
                    interval?: string;
                    intervalCount?: number;
                    preAnchorBehavior?: string;
                    intent?: string;
                    createdAt?: string;
                    anchors?: any[];
                    fulfillmentExactTime?: string | null;
                };
            };
        }>;
    };
}

export interface SellingPlanGroupEdge {
    cursor: string;
    node: SellingPlanGroup;
}

export interface PayPerShipmentSellingPlanFrontend extends PayPerShipmentSellingPlan {
    id: string
    position: number,
    createdAt?: string,
}

export interface PayPerShipmentPlanGroup {
    groupName: string;
    id: string;
    sellingPlans: PayPerShipmentSellingPlanFrontend[]
}

export const getSellingPlanGroup = (
    sellingPlanGroups: SellingPlanGroupEdge[], // Accepts an array of SellingPlanGroupEdge
    planGroupName: string
): SellingPlanGroup | any => {
    for (const group of sellingPlanGroups) {
        if (group.node.merchantCode === planGroupName) {
            return group.node; // Return the matching SellingPlanGroup
        }
    }
    return null; // Return null if no matching plan group is found
};

export const processOneTimeGroup = (sellingPlanGroup: any): OneTimePlan => {
    const sellingPlan = sellingPlanGroup.sellingPlans.edges[0]?.node;

    return {
        enable: !!sellingPlan,
        planName: sellingPlan?.name || '',
        groupId: sellingPlanGroup?.id,
        sellingPlanId: sellingPlan?.id,

        // Combine all policy processors
        ...processPricingPolicy(sellingPlan),
        ...processInventoryPolicy(sellingPlan),
        ...processDeliveryPolicy(sellingPlan),
        ...processBillingPolicy(sellingPlan)
    };
}


// Pricing Policy Processor
const processPricingPolicy = (sellingPlan: any) => ({
    pricingPolicyEnable: !!sellingPlan?.pricingPolicies?.length,
    pricingPolicyAdjustmentType:
        sellingPlan?.pricingPolicies?.[0]?.adjustmentType || 'FIXED_AMOUNT',
    pricingPolicyAdjustmentValue:
        sellingPlan?.pricingPolicies?.[0]?.adjustmentValue?.percentage || sellingPlan?.pricingPolicies?.[0]?.adjustmentValue?.amount,
});

// Inventory Policy Processor
const processInventoryPolicy = (sellingPlan: any) => ({
    inventoryPolicyEnable: !!sellingPlan?.inventoryPolicy,
    inventoryPolicyReserve:
        sellingPlan?.inventoryPolicy?.reserve || 'ON_FULFILLMENT',
});

// Delivery Policy Processor
const processDeliveryPolicy = (sellingPlan: any) => ({
    deliveryPolicyEnable: !!sellingPlan?.deliveryPolicy,
    deliveryPolicyAnchorsCutoffDay: sellingPlan?.deliveryPolicy?.cutoff || 0,
    deliveryPolicyAnchorsDay: 1,
    deliveryPolicyAnchorsMonth: 1,
    deliveryPolicyAnchorsType: 'MONTHDAY' as 'MONTHDAY' | 'WEEKDAY' | 'YEARDAY',
    deliveryPolicyCutoff: sellingPlan?.deliveryPolicy?.cutoff || 0,
    deliveryPolicyFulfillmentExactTime:
        sellingPlan?.deliveryPolicy?.fulfillmentExactTime || null,
    deliveryPolicyFulfillmentTrigger:
        sellingPlan?.deliveryPolicy?.fulfillmentTrigger || 'ANCHOR',
    deliveryPolicyIntent:
        sellingPlan?.deliveryPolicy?.intent || 'FULFILLMENT_BEGIN',
    deliveryPolicyPreAnchorBehavior:
        sellingPlan?.deliveryPolicy?.preAnchorBehavior || 'ASAP',
    preAnchorBehavior:
        sellingPlan?.deliveryPolicy?.preAnchorBehavior || 'ASAP',
});

// Billing Policy Processor
const processBillingPolicy = (sellingPlan: any) => ({
    billingPolicyEnable: !!sellingPlan?.billingPolicy,
    billingPolicyCheckoutChargeType:
        sellingPlan?.billingPolicy?.checkoutCharge?.type || 'PRICE',
    billingPolicyCheckoutChargeValue:
        sellingPlan?.billingPolicy?.checkoutCharge?.value?.percentage || 0,
    billingPolicyRemainingBalanceChargeExactTime:
        sellingPlan?.billingPolicy?.remainingBalanceChargeExactTime || '',
    billingPolicyRemainingBalanceChargeTimeAfterCheckout:
        sellingPlan?.billingPolicy?.remainingBalanceChargeTimeAfterCheckout || '',
    billingPolicyRemainingBalanceChargeTrigger:
        sellingPlan?.billingPolicy?.remainingBalanceChargeTrigger || "NO_REMAINING_BALANCE"
});

export const processPayPerShipmentGroup = (sellingPlanGroup: any): PayPerShipmentPlanGroup => {
    return {
        groupName: sellingPlanGroup?.name || "Unnamed Group",
        id: sellingPlanGroup?.id,
        sellingPlans: sellingPlanGroup.sellingPlans.edges.map(({ node }: any, index: number): PayPerShipmentSellingPlanFrontend => ({
            id: node.id,
            createdAt: node?.createdAt || '',
            position: node?.position || index + 1,
            planName: node?.name || "Unnamed Plan",
            showDescription: !!node.description,
            category: node.category || "SUBSCRIPTION",
            descriptionContent: node.description || "",

            // Pricing Policy
            pricingPolicyEnable: !!node.pricingPolicies?.length,
            pricingPolicyAdjustmentType: node.pricingPolicies?.[0]?.adjustmentType || "FIXED_AMOUNT",
            pricingPolicyAdjustmentValue: node.pricingPolicies?.[0]?.adjustmentValue?.percentage || 0,
            pricingPolicyAfterCycleEnable: false,
            pricingPolicyAfterCycle: 0,
            pricingPolicyAfterCycleAdjustmentType: "FIXED_AMOUNT",
            pricingPolicyAfterCycleAdjustmentValue: 0,

            // Inventory Policy
            inventoryPolicyEnable: !!node.inventoryPolicy,
            inventoryPolicyReserve: node.inventoryPolicy?.reserve || "ON_FULFILLMENT",

            // Delivery Policy
            deliveryPolicyEnable: !!node.deliveryPolicy,
            deliveryPolicyAnchorsCutoffDay: node.deliveryPolicy?.cutoff || 0,
            deliveryPolicyAnchorsDay: 1,
            deliveryPolicyAnchorsMonth: 1,
            deliveryPolicyAnchorsType: "WEEKDAY", // Assuming it's a weekly plan, update logic if needed
            deliveryPolicyCutoff: node.deliveryPolicy?.cutoff || 0,
            deliveryPolicyFulfillmentExactTime: node.deliveryPolicy?.fulfillmentExactTime || null,
            deliveryPolicyFulfillmentTrigger: node.deliveryPolicy?.fulfillmentTrigger || "ANCHOR",
            deliveryPolicyIntent: node.deliveryPolicy?.intent || "FULFILLMENT_BEGIN",
            deliveryPolicyPreAnchorBehavior: node.deliveryPolicy?.preAnchorBehavior || "ASAP",

            // Recurring Delivery Policy
            deliveryRecurringPolicyEnable: !!node.deliveryPolicy?.interval,
            preAnchorBehavior: node.deliveryPolicy?.preAnchorBehavior || "ASAP",
            deliveryRecurringPolicyAnchorsCutoffDay: node.deliveryPolicy?.cutoff || 0,
            deliveryRecurringPolicyAnchorsDay: 1,
            deliveryRecurringPolicyAnchorsMonth: 1,
            deliveryRecurringPolicyAnchorsType: "WEEKDAY",
            deliveryRecurringPolicyCutoff: node.deliveryPolicy?.cutoff || 0,
            deliveryRecurringPolicyIntent: node.deliveryPolicy?.intent || "FULFILLMENT_BEGIN",
            deliveryRecurringPolicyInterval: node.deliveryPolicy?.interval || null,
            deliveryRecurringPolicyIntervalCount: node.deliveryPolicy?.intervalCount || 0,
            deliveryRecurringPreAnchorBehavior: node.deliveryPolicy?.preAnchorBehavior || "ASAP",

            // Recurring Billing Policy
            billingRecurringPolicyEnable: !!node.billingPolicy?.interval,
            billingRecurringPolicyInterval: node.billingPolicy?.interval || "WEEK",
            billingRecurringPolicyIntervalCount: node.billingPolicy?.intervalCount || 0,
            billingRecurringPolicyMinCycles: node.billingPolicy?.minCycles || 0,
            billingRecurringPolicyMaxCycles: node.billingPolicy?.maxCycles || 0,
            billingRecurringPolicyAnchorsCutoffDay: 0, // Default, update as needed
            billingRecurringPolicyAnchorsDay: 1,
            billingRecurringPolicyAnchorsMonth: 1,
            billingRecurringPolicyAnchorsType: "WEEKDAY",
        }))
    };
};


