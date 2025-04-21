import { ActionFunctionArgs, json } from "@remix-run/node";
import { CUSTOMER_PAYMENT_METHOD_SEND_UPDATE_EMAIL } from "app/graphql/mutations/subscriptionContracts/customerPaymentMethodSendUpdateEmail";
import { SUBSCRIPTION_BILLING_CYCLE_SCHEDULE_EDIT } from "app/graphql/mutations/subscriptionContracts/subscriptionBillingCycleScheduleEdit";
import { UPDATE_SUBSCRIPTION_CONTRACT } from "app/graphql/mutations/subscriptionContracts/subscriptionContractUpdate";
import { SUBSCRIPTION_DRAFT_COMMIT } from "app/graphql/mutations/subscriptionContracts/subscriptionDraftCommit";
import { SUBSCRIPTION_DRAFT_DISCOUNT_CODE_APPLY } from "app/graphql/mutations/subscriptionContracts/subscriptionDraftDiscountCodeApply";
import { SUBSCRIPTION_DRAFT_DISCOUNT_CODE_REMOVE } from "app/graphql/mutations/subscriptionContracts/subscriptionDraftDiscountRemove";
import { SUBSCRIPTION_DRAFT_LINE_UPDATE } from "app/graphql/mutations/subscriptionContracts/subscriptionDraftLineUpdate";
import { SUBSCRIPTION_DRAFT_UPDATE } from "app/graphql/mutations/subscriptionContracts/subscriptionDraftUpdate";
import { PRODUCTS_QUERY } from "app/graphql/queries/products/queryProducts";
import { PRODUCT_SINGLE_QUERY } from "app/graphql/queries/products/querySingleProduct";
import { generateGraphQLId, ShopifyObjectType } from "app/packages/utils/shopifyIdUtils";
import { ERROR_MESSAGES } from "app/routes/merchant.products_.$productId_.plans";
import createPlanAPIUtils from "app/shared/products/create-plans/createPlanAPIUtils";
import { BillingPolicy } from "app/types/product/ProductNode";
import { Address, CustomAttributes, SubscriptionBillingCycleScheduleEditInputScheduleEditReason, SubscriptionLineItem } from "app/types/subscription/subscriptionQueryTypes";
import { AdminApiContextWithoutRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";

const handleUpdateAddress = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const addressString = formData.get('address');
    if (!addressString) {
        return json({ success: false, error: 'Address data missing' });
    }

    const address: Address = JSON.parse(addressString as string);

    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_UPDATE,
            admin,
            generateUpdateAddressVariables(subscriptionDraftId, address),
            'subscriptionDraftUpdate'
        );
    });

    return json(result);
};

async function performSubscriptionDraftUpdate(
    subscriptionId: string,
    admin: AdminApiContextWithoutRest,
    updateCallback: (subscriptionDraftId: string) => Promise<void>
) {
    try {
        // Step 1: Get GraphQL ID
        const contractGraphqlId = generateGraphQLId(
            parseInt(subscriptionId),
            ShopifyObjectType.SubscriptionContract
        );

        // Step 2: Create Draft
        const draftResult = await executeMutationWithErrors(
            UPDATE_SUBSCRIPTION_CONTRACT,
            admin,
            generateUpdateContractVarible(contractGraphqlId),
            'subscriptionContractUpdate'
        );

        const subscriptionDraftId = draftResult.draft.id;

        // Step 3: Custom update (e.g., address, attribute, etc.)
        await updateCallback(subscriptionDraftId);

        // Step 4: Commit Draft
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_COMMIT,
            admin,
            generateSubscriptionDraftCommitVariables(subscriptionDraftId),
            'subscriptionDraftCommit'
        );

        return { success: true };
    } catch (error: any) {
        console.error('performSubscriptionDraftUpdate error:', error);
        return { success: false, error: error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
    }
}

function serverError(message: string) {
    return json({ success: false, error: message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 200 });
}


async function executeMutationWithErrors(
    mutation: any,
    admin: AdminApiContextWithoutRest,
    variables: any,
    dataKey: string,
    returnData: boolean = false
): Promise<any> {
    const result = await createPlanAPIUtils.executeShopifyMutation(mutation, admin, variables);
    // console.log(`${dataKey} result:`, JSON.stringify(result.data));
    const userErrors = result?.data?.[dataKey]?.userErrors || [];
    if (userErrors.length > 0) {
        const errorMessage = userErrors
            .map((err: any) => {
                if (err.field?.length) {
                    return `${err.message}`;
                }
                return err.message;
            })
            .join('\n');

        throw new Error(`Failed: ${errorMessage}`);
    }

    if (returnData) {
        return result.data
    } else return result.data?.[dataKey];

}



const generateSubscriptionDraftCommitVariables = (draftId: string) => {
    return {
        variables: {
            draftId
        }
    }
}

const generateUpdateAddressVariables = (draftId: string, address: Address) => {
    const { id, name, ...rest } = address;
    return {
        variables: {
            draftId,
            input: {
                deliveryMethod: {
                    shipping: {
                        address: {
                            ...rest,
                        }
                    }
                }
            }
        }
    }
}

// const handle Generate Subscription contract update
const generateUpdateContractVarible = (contractId: string) => {
    return {
        variables: {
            contractId
        }
    }
}


const handleUpdateAttributes = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const attributesString = formData.get('attributes');
    if (!attributesString) {
        return json({ success: false, error: 'Attributes data missing' });
    }

    const customAttributes = JSON.parse(attributesString as string);

    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_UPDATE,
            admin,
            generateUpdateAttributesVariables(subscriptionDraftId, customAttributes),
            'subscriptionDraftUpdate'
        );
    });

    return json(result);
};

const handleUpdateOrderNote = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const note = formData.get('orderNote');
    if (!note) {
        return json({ success: false, error: 'note data missing' });
    }
    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_UPDATE,
            admin,
            generateUpdateOrderNoteVariables(subscriptionDraftId, note as string),
            'subscriptionDraftUpdate'
        );
    });

    return json(result);
};

const handleUpdateDiscount = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const discountCode = formData.get('discountCode');
    if (!discountCode) {
        return json({ success: false, error: 'Discount code data missing' });
    }
    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_DISCOUNT_CODE_APPLY,
            admin,
            generateUpdateDiscountVariables(subscriptionDraftId, discountCode as string),
            'subscriptionDraftUpdate'
        );
    });

    console.log(result);

    return json(result);
};

const handleRemoveDiscount = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const discountId = formData.get('discountId');
    if (!discountId) {
        return json({ success: false, error: 'Discount Id data missing' });
    }
    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_DISCOUNT_CODE_REMOVE,
            admin,
            generateRemoveDiscountVariables(subscriptionDraftId, discountId as string),
            'subscriptionDraftUpdate'
        );
    });

    console.log(result);

    return json(result);
};

const generateRemoveDiscountVariables = (draftId: string, discountId: string) => {
    const variables = {
        variables: {
            discountId,
            draftId
        }
    }

    console.log('variables', variables);
    return variables
}

const generateUpdateDiscountVariables = (draftId: string, discountCode: string) => {
    return {
        variables: {
            draftId,
            discountCode
        }
    }
}



const handleUpdatePaymentMethod = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const paymentMethodId = formData.get('paymentMethodId');
    if (!paymentMethodId) {
        return json({ success: false, error: 'note data missing' });
    }
    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_UPDATE,
            admin,
            generateUpdatePaymentMethodVariables(subscriptionDraftId, paymentMethodId as string),
            'subscriptionDraftUpdate'
        );
    });

    return json(result);
};

const generateUpdatePaymentMethodVariables = (draftId: string, paymentMethodId: string) => {
    return {
        variables: {
            draftId,
            input: {
                paymentMethodId
            }
        }
    }
}

const generateUpdateOrderNoteVariables = (draftId: string, note: string) => {
    return {
        variables: {
            draftId,
            input: {
                note
            }
        }
    }
}


const generateUpdateAttributesVariables = (draftId: string, customAttributes: CustomAttributes) => {
    return {
        variables: {
            draftId,
            input: {
                customAttributes
            }
        }
    }
}

const handleRescheduleNextOrderDate = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const nextBillingDate = formData.get('nextBillingDate');
    if (!nextBillingDate) {
        return json({ success: false, error: 'nextBillingDate data missing' });
    }
    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_UPDATE,
            admin,
            generateUpdateNextBillingDateVariables(subscriptionDraftId, nextBillingDate as string),
            'subscriptionDraftUpdate'
        );
    });

    return json(result);
};


const handleUpdateOrderFrequency = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const intervalCount = formData.get('intervalCount');
    const interval = formData.get('interval');
    if (!intervalCount || !interval) {
        return json({ success: false, error: 'Some data missing' });
    }

    const billingPolicy: BillingPolicy = {
        intervalCount: Number(intervalCount),
        interval: interval as BillingPolicy['interval']
    };
    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_UPDATE,
            admin,
            generateUpdateNextOrderFrequencyVariables(subscriptionDraftId, billingPolicy),
            'subscriptionDraftUpdate'
        );
    });

    return json(result);
};

const handleUpdateStatus = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const status = formData.get('status');
    const note = formData.get('reason');
    if (!status && !note) {
        return json({ success: false, error: 'Status data missing' });
    }

    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_UPDATE,
            admin,
            generateUpdateStatusVariables(subscriptionDraftId, status as string, note as string),
            'subscriptionDraftUpdate'
        );
    });

    return json(result);
};

const handleUpdateItemAttribute = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const lineId = formData.get('lineId');
    const attributesString = formData.get('attributes');
    if (!lineId && !attributesString) {
        return json({ success: false, error: 'Line Id or Attributes data missing' });
    }
    const customAttributes = JSON.parse(attributesString as string);
    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_LINE_UPDATE,
            admin,
            generateUpdateItemAttributeVariables(subscriptionDraftId, lineId as string, customAttributes),
            'subscriptionDraftUpdate'
        );
    });

    return json(result);
};


const generateUpdateItemAttributeVariables = (
    draftId: string,
    lineId: string,
    customAttributes: CustomAttributes
) => {
    const variables = {
        variables: {
            draftId,
            lineId,
            input: {
                customAttributes
            }
        }
    }
    console.log('generateUpdateItemAttributeVariables', JSON.stringify(variables));
    return variables
}

const generateUpdateStatusVariables = (draftId: string, status: string, note: string) => {
    return {
        variables: {
            draftId,
            input: {
                status,
                note
            }
        }
    }
}

const generateUpdateNextOrderFrequencyVariables = (draftId: string, billingPolicy: BillingPolicy) => {
    const deliveryPolicy = billingPolicy
    const variables = {
        variables: {
            draftId,
            input: {
                billingPolicy,
                deliveryPolicy
            }
        }
    }
    console.log('variables', JSON.stringify(variables));
    return variables
}

const generateUpdateNextBillingDateVariables = (draftId: string, nextBillingDate: string) => {
    return {
        variables: {
            draftId,
            input: {
                nextBillingDate
            }
        }
    }
}

const handleUpdatePaymentMethodEmailSend = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
) => {
    const customerPaymentMethodId = formData.get('paymentMethodId');

    if (!customerPaymentMethodId) {
        return json({ success: false, error: 'Payment method ID missing' });
    }

    const sendEmailMutation = CUSTOMER_PAYMENT_METHOD_SEND_UPDATE_EMAIL;
    const variables = generateUpdatePaymentMethodEmailSendVariables(customerPaymentMethodId as string);

    const result = await executeMutationWithErrors(sendEmailMutation, admin, variables, '');

    if (result?.data?.customerPaymentMethodSendUpdateEmail?.userErrors?.length > 0) {
        return json({ success: false, error: 'Failed to update payment method' });
    }

    return json({ success: true });

}

const generateUpdatePaymentMethodEmailSendVariables = (customerPaymentMethodId: string) => {
    return {
        variables: {
            customerPaymentMethodId
        }
    }
}

const handleGetProductData = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
) => {
    const productId = formData.get('productId');
    if (!productId) {
        return json({ success: false, error: 'Product ID missing' });
    }
    const gerProductQuery = PRODUCT_SINGLE_QUERY;
    const variables = generateGetProductVariables(productId as string);
    const result = await executeMutationWithErrors(gerProductQuery, admin, variables, 'product', true);
    console.log('result here', result);
    return json({ success: true, product: result?.product });
}

const generateGetProductVariables = (id: string) => {
    return {
        variables: {
            id
        }
    }
}

const handleSubscriptionLineUpdate = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const updatedLineString = formData.get('updatedLine');
    if (!updatedLineString) {
        return json({ success: false, error: 'Line Id or Attributes data missing' });
    }
    const updatedLine = JSON.parse(updatedLineString as string);
    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_LINE_UPDATE,
            admin,
            generateUpdateSubscritptionLine(subscriptionDraftId, updatedLine),
            'subscriptionDraftUpdate'
        );
    });
    return json(result);
}

const handleSubscriptionLineProductUpdate = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const updatedLineString = formData.get('updatedLine');
    if (!updatedLineString) {
        return json({ success: false, error: 'Line Id or Attributes data missing' });
    }
    const updatedLine = JSON.parse(updatedLineString as string);
    const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
        await executeMutationWithErrors(
            SUBSCRIPTION_DRAFT_LINE_UPDATE,
            admin,
            generateUpdateSubscritptionLineProuct(subscriptionDraftId, updatedLine),
            'subscriptionDraftUpdate'
        );
    });
    return json(result);
}

const generateUpdateSubscritptionLineProuct = (
    draftId: string,
    updatedLine: SubscriptionLineItem
) => {
    const { id, quantity, variantId } = updatedLine
    const variables = {
        variables: {
            draftId,
            lineId: id,
            input: {
                quantity: quantity,
                productVariantId: variantId,
            }
        }
    }

    return variables
}

const generateUpdateSubscritptionLine = (
    draftId: string,
    updatedLine: SubscriptionLineItem
) => {
    const { id, quantity, variantId, lineDiscountedPrice: { amount } } = updatedLine
    const variables = {
        variables: {
            draftId,
            lineId: id,
            input: {
                currentPrice: amount,
                quantity: quantity,
                productVariantId: variantId,
            }
        }
    }

    return variables
}

const handleGetProducts = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const cursor = formData.get("cursor")?.toString() || "";
    const query = formData.get("query")?.toString() || null;

    const gerProductQuery = PRODUCTS_QUERY;
    const variables = generateFetchProductVariables(query, cursor);

    const result = await executeMutationWithErrors(gerProductQuery, admin, variables, 'product', true);

    return json({ success: true, products: result?.products });
};

const generateFetchProductVariables = (query: string | null = 'status:ACTIVE', cursor = '') => {
    const variables = {
        first: 10,
        ...(typeof query === 'string' && { query }),
        ...(cursor && { after: cursor }),
    };

    return { variables };
};


const handleRescheduleBillingCycleDate = async (
    admin: AdminApiContextWithoutRest,
    formData: FormData,
    params: ActionFunctionArgs['params']
) => {
    const subscriptionId = params.subscriptionId;
    if (!subscriptionId) {
        return json({ success: false, error: 'Subscription ID missing' });
    }

    const index = formData.get('index');
    const date = formData.get('date');
    if (!date || !index) {
        return json({ success: false, error: 'Date or Index missing' });
    }
    const variables = generateBillingCycleEditVariables(
        subscriptionId,
        index as string,
        date as string
    );
    const result = await executeMutationWithErrors(SUBSCRIPTION_BILLING_CYCLE_SCHEDULE_EDIT, admin, variables, 'product', true);
    console.log("result handleRescheduleBillingCycleDate1", JSON.stringify(result));
    if (result?.subscriptionBillingCycleScheduleEdit?.userErrors?.length > 0) {
        const errorMessages = result.subscriptionBillingCycleScheduleEdit.userErrors
            .map((err: any) => err.message)
            .join(' | ');

        return json({ success: false, error: errorMessages });
    }
    return json({ success: true });
};

const generateBillingCycleEditVariables = (
    contractId: string,
    index: string,
    date: string,
    reason: SubscriptionBillingCycleScheduleEditInputScheduleEditReason
        = SubscriptionBillingCycleScheduleEditInputScheduleEditReason.MERCHANT_INITIATED,
) => {
    const contractGraphqlId = generateGraphQLId(
        parseInt(contractId),
        ShopifyObjectType.SubscriptionContract
    );
    const variables = {
        variables: {
            billingCycleInput: {
                contractId: contractGraphqlId,
                selector: {
                    index: parseInt(index)
                }
            },
            input: {
                billingDate: "2025-04-15T00:00:00Z",
                reason,
                skip:false
            }
        }
    }
    console.log('generateBillingCycleEditVariables', JSON.stringify(variables));
    return variables
}



const updateSubscriptionUtils = {
    handleUpdateAddress,
    handleUpdateAttributes,
    handleUpdateOrderNote,
    handleUpdatePaymentMethodEmailSend,
    handleUpdatePaymentMethod,
    handleUpdateDiscount,
    handleRemoveDiscount,
    handleRescheduleNextOrderDate,
    handleUpdateOrderFrequency,
    handleUpdateStatus,
    handleUpdateItemAttribute,
    handleGetProductData,
    handleSubscriptionLineUpdate,
    handleGetProducts,
    handleSubscriptionLineProductUpdate,
    handleRescheduleBillingCycleDate
};

export default updateSubscriptionUtils;