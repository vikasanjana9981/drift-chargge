import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAuthCookie, mergeQueryParams } from 'app/packages/utils/cookieAuth';
import { authenticate } from 'app/shopify.server';
import { AdminApiContextWithoutRest } from 'node_modules/@shopify/shopify-app-remix/dist/ts/server/clients';
import { PRODUCT_SINGLE_QUERY } from 'app/graphql/queries/products/querySingleProduct';
import { generateGraphQLId, ShopifyObjectType } from 'app/packages/utils/shopifyIdUtils';
import { ProductSingleNode } from 'app/types/product/ProductNode';
import ProductEditMain from 'app/shared/products/product-edit';
import { useIsMounted } from 'app/packages/hooks/use-is-mounted';
import { CURRENT_APP_INSTALLATION } from 'app/graphql/queries/queryCurrentAppInstallation';
import { useAtom } from 'jotai';
import { productAtom } from 'app/states/productAtom';
import { useEffect } from 'react';
import { CURRENT_SHOP } from 'app/graphql/queries/queryShop';
import { ERROR_MESSAGES } from './merchant.products_.$productId_.plans';
import createPlanAPIUtils from 'app/shared/products/create-plans/createPlanAPIUtils';
import createRecurringPlanUtils from 'app/shared/products/create-plans/createRecurringPlanUtility';
import { UPDATE_SELLING_PLAN_GROUP } from 'app/graphql/mutations/sellingPlans/sellingPlanGroupUpdate';
import createOnetimePlanUtils from 'app/shared/products/create-plans/createOneTimePlanUtils';
import { shopObject } from 'app/states/shopAtom';
import { DELETE_SELLING_PLAN_GROUP } from 'app/graphql/mutations/sellingPlans/sellingPlanGroupDelete';

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
  const { productId } = params;
  if (!response || !response.admin || !productId) {
    throw new Error("Authentication failed: Admin data missing");
  }
  const { admin } = response;
  const criticalData = await loadCriticalData(admin, parseInt(productId));

  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    product: criticalData.product as ProductSingleNode,
  };

};

const handleUpdatePlanOrder = async (
  admin: AdminApiContextWithoutRest,
  formData: FormData
) => {
  const variables = generateReOrderVariables(formData);
  const result = await createPlanAPIUtils.executeShopifyMutation(
    UPDATE_SELLING_PLAN_GROUP,
    admin,
    variables
  );
  const userErrors = result?.data?.sellingPlanGroupCreate?.userErrors || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }

  return json({ success: true }, { status: 200 });

}

const generateReOrderVariables = (
  formData: FormData
) => {
  const plansString = formData.get("plans")?.toString();
  const groupId = formData.get("groupId")?.toString();
  const sellingPlans = plansString ? JSON.parse(plansString) : [];
  const variables = createRecurringPlanUtils.createVariablesSellingPlanReorder(groupId as string, sellingPlans);
  return variables;
}

const generateUpdateOneTimeVariables = (
  formData: FormData
) => {
  const plansString = formData.get("plans")?.toString();

  if (!plansString) {
    return json({ error: ERROR_MESSAGES.REQUIRED_PARAMS_MISSING }, { status: 400 });
  }

  const sellingPlanGroup = JSON.parse(plansString)
  const variables = createOnetimePlanUtils.createGraphQLVariablesOneTimesUpdate(sellingPlanGroup);
  return variables;
}

const handleUpdateOneTimePlan = async (
  admin: AdminApiContextWithoutRest,
  formData: FormData
) => {
  const variables = generateUpdateOneTimeVariables(formData);
  const result = await createPlanAPIUtils.executeShopifyMutation(
    UPDATE_SELLING_PLAN_GROUP,
    admin,
    variables
  );
  const userErrors = result?.data?.sellingPlanGroupUpdate?.userErrors || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }

  return json({ success: true }, { status: 200 });
}

const generateDeleteGroupVariables = (
  formData: FormData
) => {
  const sellingPlanGroupId = formData.get("groupId")?.toString();
  return {
    variables: {
      id: sellingPlanGroupId
    }
  }
}

const handleDeleteOneTimePlan = async (
  admin: AdminApiContextWithoutRest,
  formData: FormData
) => {
  const variables = generateDeleteGroupVariables(formData);
  const result = await createPlanAPIUtils.executeShopifyMutation(
    DELETE_SELLING_PLAN_GROUP,
    admin,
    variables
  );
  const userErrors = result?.data?.sellingPlanGroupUpdate?.userErrors || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }

  return json({ success: true }, { status: 200 });
}

const generateDeleteSellingPlanVariables = (formData: FormData, isDeleteGroup: boolean) => {
  if (isDeleteGroup) {
    return generateDeleteGroupVariables(formData)
  }
  const sellingPlanId = formData.get("sellingPlanId");
  const groupId = formData.get("groupId");
  return {
    variables: {
      id: groupId,
      input: {
        sellingPlansToDelete: [sellingPlanId]
      }
    }
  }

}

const handleDeletePayPerShipmentPlan = async (
  admin: AdminApiContextWithoutRest,
  formData: FormData,
  isDeleteGroup: boolean = false
) => {
  const variables = generateDeleteSellingPlanVariables(formData, isDeleteGroup);
  console.log('variables for delete' ,variables);
  const query = isDeleteGroup ? DELETE_SELLING_PLAN_GROUP : UPDATE_SELLING_PLAN_GROUP
  const result = await createPlanAPIUtils.executeShopifyMutation(
    query,
    admin,
    variables
  );

  console.log('result for delete' ,result);
  const userErrors = result?.data?.sellingPlanGroupUpdate?.userErrors || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }

  return json({ success: true }, { status: 200 });
}

const handleUpdatePayPerShipmentPlan = async (
  admin: AdminApiContextWithoutRest,
  formData: FormData,
) => {
  const variables = generateUpdatePlanVariables(formData);
  const result = await createPlanAPIUtils.executeShopifyMutation(
    UPDATE_SELLING_PLAN_GROUP,
    admin,
    variables
  );

  console.log('result', JSON.stringify(result))
  const userErrors = result?.data?.sellingPlanGroupCreate?.userErrors || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }

  return json({ success: true }, { status: 200 });
}

const generateUpdatePlanVariables = (
  formData: FormData
) => {
  const plansString = formData.get("plans")?.toString();
  const groupId = formData.get("groupId")?.toString();
  const sellingPlans = plansString ? JSON.parse(plansString) : [];
  const variables = createRecurringPlanUtils.createVariablesSellingPlanUpdate(groupId as string, sellingPlans);
  return variables;
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
      case 'updatePlanOrder':
        response = await handleUpdatePlanOrder(admin, formData);
        break;
      case 'updateOneTimePlan':
        response = await handleUpdateOneTimePlan(admin, formData);
        break;
      case 'deleteOneTimePlan':
        response = await handleDeleteOneTimePlan(admin, formData);
        break;
      case 'deletePayPerShipmentPlan':
        response = await handleDeletePayPerShipmentPlan(admin, formData);
        break;
      case 'deletePayPerShipmentPlanGroup':
        response = await handleDeletePayPerShipmentPlan(admin, formData, true);
        break;
      case 'updatePayPerShipmentPlan':
        response = await handleUpdatePayPerShipmentPlan(admin, formData);
        break;
      default:
        return json({ error: ERROR_MESSAGES.ACTION_NOT_FOUND }, { status: 402 });
    }

    return response;

  } catch (error) {
    console.error("Unexpected error:", error);
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }

}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {AdminInstance}
 */
const loadCriticalData = async (
  admin: AdminApiContextWithoutRest,
  productId: number
) => {
  try {
    const variables = generateVariables(productId);
    // Run both GraphQL queries in parallel
    const [
      productResponse,
      appResponse,
      shopResponse
    ] = await Promise.all([
      admin.graphql(PRODUCT_SINGLE_QUERY, variables),
      admin.graphql(CURRENT_APP_INSTALLATION),
      admin.graphql(CURRENT_SHOP),
    ]);
    const [
      { data: { product } },
      { data: { currentAppInstallation } },
      { data: { shop } }
    ] = await Promise.all([
      productResponse.json(),
      appResponse.json(),
      shopResponse.json(),
    ]);

    // Attach `currentAppInstallation` to the product
    return { product: { ...product, currentAppInstallation, shop } };

  } catch (error) {
    console.error("Error loading critical data:", error);
    throw new Error("Failed to load critical product data");
  }
};

const generateVariables = (productId: number) => {
  const graphqlProductId = generateGraphQLId(
    productId,
    ShopifyObjectType.Product
  );
  return {
    variables: {
      id: graphqlProductId
    }
  }
}

const ProductEdit = () => {
  const { apiKey, product } = useLoaderData<typeof loader>();
  const [, setProduct] = useAtom(productAtom);
  const [, setShopObject] = useAtom(shopObject);
  useEffect(() => {
    if (product) {
      setProduct(product);
      setShopObject(product.shop);
    }
  }, [product, setProduct]);

  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }

  if (!product) {
    return <div>Product not found</div>
  }
  return <ProductEditMain
    productResponse={product}
  />
}

export default ProductEdit