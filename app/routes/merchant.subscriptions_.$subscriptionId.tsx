import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CURRENT_APP_INSTALLATION } from 'app/graphql/queries/queryCurrentAppInstallation';
import { CURRENT_SHOP } from 'app/graphql/queries/queryShop';
import { SUBSCRIPTION_BILLING_CYCLES_QUERY } from 'app/graphql/queries/subscriptions/subscriptionBillingCycles';
import { SUBSCRIPTION_CONTRACT_QUERY } from 'app/graphql/queries/subscriptions/subscriptionContract';
import { useIsMounted } from 'app/packages/hooks/use-is-mounted';
import { getAuthCookie, mergeQueryParams } from 'app/packages/utils/cookieAuth';
import { generateGraphQLId, ShopifyObjectType } from 'app/packages/utils/shopifyIdUtils';
import SubscriptionEditMain from 'app/shared/subscriptions/subscription-edit';
import { authenticate } from 'app/shopify.server';
import { shopObject } from 'app/states/shopAtom';
import { subscriptionContractAtom } from 'app/states/subscriptionContractAtom';
import { SubscriptionContractSingleNode } from 'app/types/subscription/subscriptionQueryTypes';
import { useAtom } from 'jotai';
import { AdminApiContextWithoutRest } from 'node_modules/@shopify/shopify-app-remix/dist/ts/server/clients';
import { useEffect } from 'react';
import { ERROR_MESSAGES } from './merchant.products_.$productId_.plans';
import createPlanAPIUtils from 'app/shared/products/create-plans/createPlanAPIUtils';
import updateSubscriptionUtils from 'app/shared/subscriptions/subscription-edit/SubscriptionEditUtils';

export const loader = async ({
  request,
  params
}: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }
  const updatedRequest = mergeQueryParams(request, authData.query);
  await authenticate.admin(updatedRequest);
  const response = await authenticate.admin(updatedRequest);
  const { subscriptionId } = params;
  if (!response || !response.admin || !subscriptionId) {
    throw new Error("Authentication failed: Admin data missing");
  }
  const { admin } = response;
  const criticalData = await loadCriticalData(admin, parseInt(subscriptionId));

  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    subscriptionContract: criticalData.subscriptionContract as SubscriptionContractSingleNode,
  };

};

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {AdminInstance}
 */
const loadCriticalData = async (
  admin: AdminApiContextWithoutRest,
  subscriptionContractId: number
) => {
  try {
    const variables = generateVariables(subscriptionContractId);

    const billingCycleVariables = generateBillingCycleVariables(subscriptionContractId);
    // Run both GraphQL queries in parallel
    const [
      subscriptionContractResponse,
      appResponse,
      shopResponse,
      subscriptionBillingCyclesResponse
    ] = await Promise.all([
      admin.graphql(SUBSCRIPTION_CONTRACT_QUERY, variables),
      admin.graphql(CURRENT_APP_INSTALLATION),
      admin.graphql(CURRENT_SHOP),
      admin.graphql(SUBSCRIPTION_BILLING_CYCLES_QUERY, billingCycleVariables)
    ]);
    const [
      { data: { subscriptionContract } },
      { data: { currentAppInstallation } },
      { data: { shop } },
      { data: { subscriptionBillingCycles } }
    ] = await Promise.all([
      subscriptionContractResponse.json(),
      appResponse.json(),
      shopResponse.json(),
      subscriptionBillingCyclesResponse.json(),
    ]);

    // Attach `currentAppInstallation` to the product
    return { subscriptionContract: { ...subscriptionContract, currentAppInstallation, shop, subscriptionBillingCycles } };

  } catch (error) {
    console.error("Error loading critical data:", error);
    throw new Error("Failed to load critical subscriptionContractId data");
  }
};

const generateBillingCycleVariables = (subscriptionContractId: number) => {
  const graphqlProductId = generateGraphQLId(
    subscriptionContractId,
    ShopifyObjectType.SubscriptionContract
  );
  const currentIsoDate = new Date().toISOString();
  const oneMonthLater = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
  return {
    variables: {
      subscriptionContractId: graphqlProductId,
      billingCyclesDateRangeSelector: {
        startDate: currentIsoDate,
        endDate: oneMonthLater
      }
    }
  }
}

const generateVariables = (subscriptionContractId: number) => {
  const graphqlProductId = generateGraphQLId(
    subscriptionContractId,
    ShopifyObjectType.SubscriptionContract
  );
  return {
    variables: {
      subscriptionContractId: graphqlProductId
    }
  }
}

export async function action({
  request,
  params
}: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: ERROR_MESSAGES.METHOD_NOT_ALLOWED }, { status: 405 });
  }
  try {
    const admin = await createPlanAPIUtils.authenticateRequest(request);
    if (!admin) return json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    const formData = await request.formData();
    const action = formData.get("action")?.toString();
    if (!action) return json({ error: ERROR_MESSAGES.REQUIRED_PARAMS_MISSING }, { status: 400 });
    let response;
    switch (action) {
      case 'updateAddress':
        response = await updateSubscriptionUtils.handleUpdateAddress(admin, formData, params);
        break;
      case 'updateAttribute':
        response = await updateSubscriptionUtils.handleUpdateAttributes(admin, formData, params);
        break;
      case 'updateOrderNote':
        response = await updateSubscriptionUtils.handleUpdateOrderNote(admin, formData, params);
        break;
      case 'sendUpdatePaymentMethodEmail':
        response = await updateSubscriptionUtils.handleUpdatePaymentMethodEmailSend(admin, formData);
        break;
      case 'updatePaymentMethod':
        response = await updateSubscriptionUtils.handleUpdatePaymentMethod(admin, formData, params);
        break;
      case 'updateDiscount':
        response = await updateSubscriptionUtils.handleUpdateDiscount(admin, formData, params);
        break;
      case 'removeDiscount':
        response = await updateSubscriptionUtils.handleRemoveDiscount(admin, formData, params);
        break;
      case 'rescheduleBillingDate':
        response = await updateSubscriptionUtils.handleRescheduleNextOrderDate(admin, formData, params);
        break;
      case 'updateOrderFrequency':
        response = await updateSubscriptionUtils.handleUpdateOrderFrequency(admin, formData, params);
        break;
      case 'updateStatus':
        response = await updateSubscriptionUtils.handleUpdateStatus(admin, formData, params);
        break;
      case 'updateLineItemAttribute':
        response = await updateSubscriptionUtils.handleUpdateItemAttribute(admin, formData, params);
        break;
      case 'getProductData':
        response = await updateSubscriptionUtils.handleGetProductData(admin, formData);
        break;
      case 'subscriptionLineUpdate':
        response = await updateSubscriptionUtils.handleSubscriptionLineUpdate(admin, formData, params);
        break;
      case 'subscriptionLineProductUpdate':
        response = await updateSubscriptionUtils.handleSubscriptionLineProductUpdate(admin, formData, params);
        break;
      case 'getProducts':
        response = await updateSubscriptionUtils.handleGetProducts(admin, formData, params);
        break;
      case 'rescheduleBillingCycleDate':
        response = await updateSubscriptionUtils.handleRescheduleBillingCycleDate(admin, formData, params);
        break;
      default:
        response = json({ error: ERROR_MESSAGES.ACTION_NOT_FOUND }, { status: 500 });
        break;
    }
    console.log('response>>>>action', response);
    return response
  } catch (error) {
    console.error("Unexpected error:", error);
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
}



const SubscriptionSingle = () => {
  const { apiKey, subscriptionContract } = useLoaderData<typeof loader>();
  const [, setShopObject] = useAtom(shopObject);
  const [, setSubscriptionContract] = useAtom(subscriptionContractAtom);


  useEffect(() => {
    if (subscriptionContract) {
      setShopObject(subscriptionContract.shop);
      setSubscriptionContract(subscriptionContract as unknown as SubscriptionContractSingleNode);
    }
  }, [subscriptionContract]);

  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }

  return (
    <SubscriptionEditMain />
  )
}

export default SubscriptionSingle