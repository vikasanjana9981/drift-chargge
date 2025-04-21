import { extractNumericId } from "app/packages/utils/shopifyIdUtils";
import { PayPerShipmentPlanGroup, PayPerShipmentSellingPlan } from "app/types/product/sellingPlans";
import createOnetimePlanUtils from "./createOneTimePlanUtils";
import { group } from "console";


const createGraphQLVariablesPayPerShipment = (
    group: any,
    productId: any,
    appGraphqlId: any,
    prePaidPlan: boolean = false
) => {
    const appId = extractNumericId(appGraphqlId) as any;
    const sellingPlansToCreate = getsellingPlansToCreatePayPerShipment(group);
    return {
        variables: {
            input: {
                appId: `${appId}` || "",
                name: group.groupName || "Default Plan Group",
                merchantCode: prePaidPlan ? "PrePaid Plan Group" : "PayPerShipment Plan Group",
                options: [group.groupName],
                position: 1,
                sellingPlansToCreate,
              
            },
            resources: {
                productIds: [`gid://shopify/Product/${productId}`],
                productVariantIds: [],
            },
        },
    };
}

const getsellingPlansToCreatePayPerShipment = (payPerShipmentGroup: PayPerShipmentPlanGroup) => {

    const plans = payPerShipmentGroup?.sellingPlansToCreate;

    if(!plans){
        return [];
    }

    if (plans?.length === 0) {
        return []
    }

    const sellingPlansToCreate = plans.map((plan: PayPerShipmentSellingPlan, index: number) => {
        const billingPolicy = generateSubscriptionBillingPolicy(plan);
        const deliveryPolicy = generateSubscriptionDeliveryPolicy(plan);
        const inventoryPolicy = generateInventoryPolicy(plan);
        const pricingPolicies = generateSubscriptionPricingPolicy(plan);
        const {
            planName,
            category,
            showDescription,
            descriptionContent
        } = plan
        return {
            category,
            ...(showDescription ? { description: descriptionContent } : {}),
            name: planName,
            options: [planName],
            billingPolicy,
            deliveryPolicy,
            inventoryPolicy,
            pricingPolicies
        }
    })
    return sellingPlansToCreate;
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

const generateSubscriptionPricingPolicy = (plan: any) => {
    try {
        const pricingPolicies = createOnetimePlanUtils.generateOneTimePricingPolicies(plan);
        const pricingRecurringPolicy = generateRecurringPricingPolicy(plan);

        if (!pricingRecurringPolicy) {
            return [{
                fixed: pricingPolicies[0].fixed
            }];
        }

        return [{
            fixed: pricingPolicies[0].fixed,
            recurring: pricingRecurringPolicy[0].recurring

        }]

    } catch (error) {
        console.error("Error in generateSubscriptionPricingPolicy:");
    }
}

const generateSubscriptionDeliveryPolicy = (plan: any) => {
    try {
        // const deliveryPolicy = generateOneTimeDeliveryPolicy(plan);
        const deliveryPolicyRecurring = generateRecurringDeliveryPolicy(plan);

        return {
            // fixed: deliveryPolicy.fixed,
            recurring: deliveryPolicyRecurring.recurring
        }

    } catch (error) {
        console.error("Error in generateSubscriptionDeliveryPolicy:");
    }
}

const generateSubscriptionBillingPolicy = (plan: any) => {
    try {
        const billingRecurringPolicy = generateRecurringBillingPolicy(plan)
        return {
            recurring: billingRecurringPolicy.recurring
        }
    } catch (error) {
        console.error("Error in generateSubscriptionBillingPolicy:");
    }


}

const generateRecurringBillingPolicy = (plan: any) => {
    const {
        billingRecurringPolicyEnable,
        billingRecurringPolicyInterval,
        billingRecurringPolicyIntervalCount,
        billingRecurringPolicyMinCycles,
        billingRecurringPolicyMaxCycles,
    } = plan;

    // Return default policy if billing policy is disabled
    if (!billingRecurringPolicyEnable) {
        return {
            recurring: {
                interval: billingRecurringPolicyInterval,
                intervalCount: billingRecurringPolicyIntervalCount,
            },
        };
    }

    // Construct the policy object
    const policy = {
        recurring: {
            interval: billingRecurringPolicyInterval,
            intervalCount: billingRecurringPolicyIntervalCount,
            ...(billingRecurringPolicyMinCycles === 0 ? {} : { minCycles: billingRecurringPolicyMinCycles }),
            ...(billingRecurringPolicyMaxCycles === 0 ? {} : { maxCycles: billingRecurringPolicyMaxCycles })
        },
    };

    return policy;
}

const generateRecurringPricingPolicy = (plan: any) => {
    const {
        pricingPolicyAfterCycleEnable,
        pricingPolicyAfterCycle,
        pricingPolicyAfterCycleAdjustmentType,
        pricingPolicyAfterCycleAdjustmentValue,
    } = plan;

    if (!pricingPolicyAfterCycleEnable) {
        return false;
    }

    const adjustmentValue = {} as any;

    switch (pricingPolicyAfterCycleAdjustmentType) {
        case "FIXED_AMOUNT":
        case "PRICE":
            adjustmentValue.fixedValue = pricingPolicyAfterCycleAdjustmentValue;
            break;
        case "PERCENTAGE":
            adjustmentValue.percentage = pricingPolicyAfterCycleAdjustmentValue;
            break;
        default:
            throw new Error(`Invalid discountType: ${pricingPolicyAfterCycleAdjustmentType}`);
    }

    return [
        {
            recurring: {
                adjustmentType: pricingPolicyAfterCycleAdjustmentType,
                adjustmentValue,
                afterCycle: pricingPolicyAfterCycle
            },
        },
    ];
}

const generateRecurringDeliveryPolicy = (plan: any) => {
    const {
        deliveryRecurringPolicyAnchorsCutoffDay,
        deliveryRecurringPolicyAnchorsDay,
        deliveryRecurringPolicyAnchorsMonth,
        deliveryRecurringPolicyAnchorsType,
        deliveryRecurringPolicyCutoff,
        deliveryRecurringPolicyFulfillmentExactTime,
        deliveryRecurringPolicyFulfillmentTrigger,
        deliveryRecurringPolicyIntent,
        deliveryRecurringPolicyInterval,
        deliveryRecurringPolicyIntervalCount,
        deliveryRecurringPreAnchorBehavior,
        billingRecurringPolicyInterval,
        billingRecurringPolicyIntervalCount,
        category
    } = plan;


    // Retrun default delivery policy
    if (deliveryRecurringPolicyFulfillmentTrigger === 'ASAP') {
        return {
            recurring: {
                interval: category === 'SUBSCRIPTION' ? billingRecurringPolicyInterval : deliveryRecurringPolicyInterval,
                intervalCount: category === 'SUBSCRIPTION' ? billingRecurringPolicyIntervalCount : deliveryRecurringPolicyIntervalCount
            },
        }
    }

    // Construct the delivery policy object
    const deliveryPolicy: any = {
        recurring: {
            fulfillmentTrigger: deliveryRecurringPolicyFulfillmentTrigger,
            ...(deliveryRecurringPolicyFulfillmentTrigger === "ANCHOR"
                ? {
                    anchors: {
                        cutoffDay: deliveryRecurringPolicyAnchorsType === "YEARDAY" ? null : deliveryRecurringPolicyAnchorsCutoffDay,
                        day: deliveryRecurringPolicyAnchorsDay,
                        ...(deliveryRecurringPolicyAnchorsType === "YEARDAY" ? { month: deliveryRecurringPolicyAnchorsMonth } : {}), // Conditionally include month
                        type: deliveryRecurringPolicyAnchorsType,
                    },
                }
                : {}),
            cutoff: deliveryRecurringPolicyCutoff,
            intent: deliveryRecurringPolicyIntent,
            preAnchorBehavior: deliveryRecurringPreAnchorBehavior,
            interval: category === 'SUBSCRIPTION' ? billingRecurringPolicyInterval : deliveryRecurringPolicyInterval,
            intervalCount: category === 'SUBSCRIPTION' ? billingRecurringPolicyIntervalCount : deliveryRecurringPolicyIntervalCount
        },
    };
    return deliveryPolicy;
}


const createVariablesSellingPlanReorder = (groupId: string, sellingPlans: any[]) => {
    // Map the selling plans to the required format
    const sellingPlansToUpdate = sellingPlans.map((plan, index) => ({
        id: plan.id, // Use the plan's ID
        position: index + 1, // Position starts from 1
    }));

    // Return the final structure
    return {
        variables: {
            id: groupId, // The group ID
            input: {
                sellingPlansToUpdate, // The mapped selling plans
            },
        }
    };
};



const createVariablesSellingPlanUpdate = (groupId: string, sellingPlan: any) => {
    console.log(groupId)
    const billingPolicy = generateSubscriptionBillingPolicy(sellingPlan);
    const deliveryPolicy = generateSubscriptionDeliveryPolicy(sellingPlan);
    const inventoryPolicy = generateInventoryPolicy(sellingPlan);
    const pricingPolicies = generateSubscriptionPricingPolicy(sellingPlan);
    const {
        planName,
        category,
        showDescription,
        descriptionContent
    } = sellingPlan

    const sellingPlansToUpdate = [{
        id: sellingPlan.id,
        category,
        ...(showDescription ? { description: descriptionContent } : {}),
        name: planName,
        options: [planName],
        billingPolicy,
        deliveryPolicy,
        inventoryPolicy,
        pricingPolicies
    }]

    return {
        variables: {
            id: groupId,
            input: {
                sellingPlansToUpdate,
            },
        },
    };
}

const getsellingPlansToUpdate = (group: any) => {

    const plans = group.sellingPlansToUpdate;

    if (plans.length === 0) {
        return []
    }

    const sellingPlansToUpdate = plans.map((plan: any, index: number) => {
        const billingPolicy = generateSubscriptionBillingPolicy(plan);
        const deliveryPolicy = generateSubscriptionDeliveryPolicy(plan);
        const inventoryPolicy = generateInventoryPolicy(plan);
        const pricingPolicies = generateSubscriptionPricingPolicy(plan);
        const {
            planName,
            showDescription,
            descriptionContent
        } = plan
        return {
            id: plan.id,
            ...(showDescription ? { description: descriptionContent } : {}),
            name: planName,
            options: [planName],
            billingPolicy,
            deliveryPolicy,
            inventoryPolicy,
            pricingPolicies,

        }
    })
    return sellingPlansToUpdate;
}

const updateGraphQLVariables = (group: any) => {
    const sellingPlansToUpdate = getsellingPlansToUpdate(group);
    const sellingPlansToCreate = getsellingPlansToCreatePayPerShipment(group);
    return {
        variables: {
            id: group.groupId,
            input: {
                name: group.groupName || "Default Plan Group",
                sellingPlansToUpdate,
                sellingPlansToCreate
            },
        },
    };
}

const createRecurringPlanUtils = {
    generateRecurringBillingPolicy,
    generateRecurringDeliveryPolicy,
    generateRecurringPricingPolicy,
    generateSubscriptionDeliveryPolicy,
    generateSubscriptionPricingPolicy,
    generateSubscriptionBillingPolicy,
    createGraphQLVariablesPayPerShipment,
    createVariablesSellingPlanReorder,
    createVariablesSellingPlanUpdate,
    updateGraphQLVariables
}

export default createRecurringPlanUtils
