import { extractNumericId } from "app/packages/utils/shopifyIdUtils";
import { oneTimeGroup, OneTimePlan } from "app/types/product/sellingPlans";

const getsellingPlansToCreateOneTimeVariables = (oneTimeGroup: OneTimePlan) => {
    const billingPolicy = generateOneTimeBillingPolicy(oneTimeGroup)
    const deliveryPolicy = generateOneTimeDeliveryPolicy(oneTimeGroup);
    const inventoryPolicy = generateInventoryPolicy(oneTimeGroup);
    const pricingPolicies = generateOneTimePricingPolicies(oneTimeGroup)
    return [
        {
            name: oneTimeGroup.planName || "One-Time Purchase",
            id: oneTimeGroup.sellingPlanId,
            options: [oneTimeGroup.planName || "One-Time Purchase"],
            category: "OTHER",
            billingPolicy: billingPolicy,
            inventoryPolicy: inventoryPolicy,
            deliveryPolicy: deliveryPolicy,
            pricingPolicies: pricingPolicies,
        },
    ];
}

const generateInventoryPolicy = (plan: any) => {
    const {
        inventoryPolicyEnable,
        inventoryPolicyReserve
    } = plan;

    if (!inventoryPolicyEnable) {
        return { reserve: "ON_FULFILLMENT" }
    }

    return { reserve: inventoryPolicyReserve }

}

const generateOneTimeDeliveryPolicy = (plan: any) => {
    const {
        deliveryPolicyAnchorsCutoffDay,
        deliveryPolicyAnchorsDay,
        deliveryPolicyAnchorsMonth,
        deliveryPolicyAnchorsType,
        deliveryPolicyCutoff,
        deliveryPolicyFulfillmentExactTime,
        deliveryPolicyFulfillmentTrigger,
        deliveryPolicyIntent,
        deliveryPolicyPreAnchorBehavior
    } = plan;


    // Retrun default delivery policy
    if (deliveryPolicyFulfillmentTrigger === 'ASAP') {
        return {
            fixed: {
                fulfillmentTrigger: "ASAP",
            },
        }
    }

    // Construct the delivery policy object
    const deliveryPolicy: any = {
        fixed: {
            fulfillmentTrigger: deliveryPolicyFulfillmentTrigger,
            ...(deliveryPolicyFulfillmentTrigger === "EXACT_TIME" && deliveryPolicyFulfillmentExactTime
                ? { fulfillmentExactTime: deliveryPolicyFulfillmentExactTime }
                : {}),
            ...(deliveryPolicyFulfillmentTrigger === "ANCHOR"
                ? {
                    anchors: {
                        cutoffDay: deliveryPolicyAnchorsType === "YEARDAY" ? null : deliveryPolicyAnchorsCutoffDay,
                        day: deliveryPolicyAnchorsDay,
                        ...(deliveryPolicyAnchorsType === "YEARDAY" ? { month: deliveryPolicyAnchorsMonth } : {}), // Conditionally include month
                        type: deliveryPolicyAnchorsType,
                    },
                }
                : {}),
            cutoff: deliveryPolicyCutoff,
            intent: deliveryPolicyIntent,
            preAnchorBehavior: deliveryPolicyPreAnchorBehavior,
        },
    };
    return deliveryPolicy;
}

const generateOneTimeBillingPolicy = (plan: any) => {
    const {
        billingPolicyEnable,
        billingPolicyCheckoutChargeType,
        billingPolicyCheckoutChargeValue,
        billingPolicyRemainingBalanceChargeTrigger,
        billingPolicyRemainingBalanceChargeTimeAfterCheckout,
        billingPolicyRemainingBalanceChargeExactTime,
    } = plan;

    // Return default policy if billing policy is disabled
    if (!billingPolicyEnable) {
        return {
            fixed: {
                checkoutCharge: { type: 'PERCENTAGE', value: { percentage: 100 } },
                remainingBalanceChargeTrigger: 'NO_REMAINING_BALANCE',
            },
        };
    }

    // Validate and set checkout charge value
    let checkoutChargeValue;
    if (billingPolicyCheckoutChargeType === 'PERCENTAGE') {
        checkoutChargeValue = { percentage: billingPolicyCheckoutChargeValue };
    } else if (billingPolicyCheckoutChargeType === 'PRICE') {
        checkoutChargeValue = { fixedValue: billingPolicyCheckoutChargeValue };
    } else {
        throw new Error('Invalid checkout charge value');
    }

    // Construct the policy object
    const policy = {
        fixed: {
            checkoutCharge: { type: billingPolicyCheckoutChargeType, value: checkoutChargeValue },
            remainingBalanceChargeTrigger: billingPolicyRemainingBalanceChargeTrigger,
            ...(billingPolicyRemainingBalanceChargeTimeAfterCheckout
                ? { remainingBalanceChargeTimeAfterCheckout: billingPolicyRemainingBalanceChargeTimeAfterCheckout }
                : {}),
            ...(billingPolicyRemainingBalanceChargeTrigger === 'EXACT_TIME' && billingPolicyRemainingBalanceChargeExactTime
                ? { remainingBalanceChargeExactTime: billingPolicyRemainingBalanceChargeExactTime }
                : {}),
        },
    };

    return policy;
};

const generateOneTimePricingPolicies = (plan: any) => {
    const {
        pricingPolicyAdjustmentType,
        pricingPolicyAdjustmentValue
    } = plan

    const adjustmentValue = {} as any;

    switch (pricingPolicyAdjustmentType) {
        case "FIXED_AMOUNT":
        case "PRICE":
            adjustmentValue.fixedValue = pricingPolicyAdjustmentValue;
            break;
        case "PERCENTAGE":
            adjustmentValue.percentage = pricingPolicyAdjustmentValue;
            break;
        default:
            throw new Error(`Invalid discountType: ${pricingPolicyAdjustmentType}`);
    }

    return [
        {
            fixed: {
                adjustmentType: pricingPolicyAdjustmentType,
                adjustmentValue,
            },
        },
    ];
}

const createGraphQLVariablesOneTimesUpdate = (
    group: OneTimePlan
) => {
    const sellingPlansToUpdate = getsellingPlansToCreateOneTimeVariables(group);
    return {
        variables: {
            id: group.groupId,
            input: {
                name: group.planName || "Default Plan Group",
                sellingPlansToUpdate,
            },
        },
    };
}


const createGraphQLVariablesOneTimes = (
    group: oneTimeGroup,
    appGraphqlId: any,
    productId: any,
    isUpdate: boolean = false
) => {
    const appId = extractNumericId(appGraphqlId) as any;
    let sellingPlansToCreate = getsellingPlansToCreateOneTimeVariables(group.sellingPlansToCreate[0]);
    return {
        variables: {
            input: {
                appId: `${appId}` || "",
                name: group.groupName || "Default Plan Group",
                merchantCode: "Onetime Plan Group",
                options: [group.groupName],
                position: 1,
                sellingPlansToCreate,
            },
            resources: {
                productIds: [`gid://shopify/Product/${productId}`],
            },
        },
    };
}


const createOnetimePlanUtils = {
    createGraphQLVariablesOneTimesUpdate,
    getsellingPlansToCreateOneTimeVariables,
    generateOneTimeBillingPolicy,
    generateOneTimeDeliveryPolicy,
    generateOneTimePricingPolicies,
    createGraphQLVariablesOneTimes
}

export default createOnetimePlanUtils