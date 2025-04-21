import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CURRENT_APP_INSTALLATION } from 'app/graphql/queries/queryCurrentAppInstallation';
import { CURRENT_SHOP } from 'app/graphql/queries/queryShop';
import { SUBSCRIPTION_CONTRACTS_QUERY } from 'app/graphql/queries/subscriptions/subscriptionContracts';
import { useIsMounted } from 'app/packages/hooks/use-is-mounted';
import {
  getAuthCookie,
  mergeQueryParams
} from 'app/packages/utils/cookieAuth';
import SubscriptionsList from 'app/shared/subscriptions';
import { authenticate } from 'app/shopify.server';
import { MainAppFilters } from 'app/types/product/filtersData';
import {
  SubscriptionContractsFilterQuery,
  SubscriptionContractsNextParams,
  SubscriptionContractsVariables
} from 'app/types/subscription/subscriptionQueryTypes';
import { AdminApiContextWithoutRest } from 'node_modules/@shopify/shopify-app-remix/dist/ts/server/clients';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }

  const url = new URL(request.url);
  const first = Number(url.searchParams.get("first")) || 10;
  const action = url.searchParams.get("action");
  const cursor = url.searchParams.get("cursor") || null;

  // Determine whether to use `after` or `before`
  const after = action === "next" ? cursor : null;
  const before = action === "prev" ? cursor : null;

  // Extract query filters from URL
  const filters: SubscriptionContractsFilterQuery = {
    query: url.searchParams.get("query") || undefined,
    onlineStoreStatus: url.searchParams.get("onlineStoreStatus") || undefined,
    customerEmail: url.searchParams.get("customer_email") || undefined,
    id: url.searchParams.get("id") || undefined,
    status: url.searchParams.get("status") || undefined,
    updatedAt: url.searchParams.get("updatedAt") || undefined,
    createdAt: url.searchParams.get("createdAt") || undefined,
    lastBillingAttemptError: url.searchParams.get("lastBillingAttemptError") || undefined,
  };

  // Generate Shopify-compatible query string
  const shopifyQuery = generateShopifyQuery(filters);

  console.log(shopifyQuery, "shopifyQuery");

  // Create a new request with merged query parameters
  const updatedRequest = mergeQueryParams(request, authData.query);
  const response = await authenticate.admin(updatedRequest);

  if (!response || !response.admin) {
    throw new Error("Authentication failed: Admin data missing");
  }
  const { admin } = response;
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(admin, { first, after, before }, shopifyQuery);
  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    response: criticalData,
    first
  };
};


const generateShopifyQuery = (filters: SubscriptionContractsFilterQuery): string | null => {
  const queryParts: string[] = [];
  let queryFilter = "";

  console.log(filters, "filters>>>>>>>>>>>");

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    console.log('key', key, 'value', value);
    console.log('key', MainAppFilters.CUSTOMEREMAIL);
    switch (key) {
      case MainAppFilters.CUSTOMEREMAIL:
        queryFilter = `email:${value}`;
      case MainAppFilters.ID:
        queryFilter = `id:${value}`;
        break;
      case MainAppFilters.STATUS:
        queryFilter = `status:${value}`;
        break;
      case MainAppFilters.UPDATEDATE:
        queryFilter = `updated_at:${value}`;
        break;
      case MainAppFilters.CREATEDATE:
        queryFilter = `created_at:${value}`;
        break;
      case MainAppFilters.LASTBILLINGATTEMPTERROR:
        queryFilter = `last_billing_attempt_error_type:${value}`;
        break;
    }
  });

  if (queryFilter) {
    queryParts.push(queryFilter);
  }

  console.log(queryParts, "queryParts");

  return queryParts.length ? queryParts.join(" ") : null;
};


/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {AdminInstance}
 */
const loadCriticalData = async (
  admin: AdminApiContextWithoutRest,
  pagination: SubscriptionContractsNextParams,
  query?: string | null
) => {
  //  Generate variables dynamically in the required format
  const variables = generatePaginationVariables(pagination, query);
  console.log('Fetch Subscripionts Variables', variables);
  const [
    response,
    appResponse,
    shopResponse
  ] = await Promise.all([
    admin.graphql(SUBSCRIPTION_CONTRACTS_QUERY, variables),
    admin.graphql(CURRENT_APP_INSTALLATION),
    admin.graphql(CURRENT_SHOP),
  ]);
  const [
    { data: { subscriptionContracts }, extensions },
    { data: { currentAppInstallation } },
    { data: { shop } }
  ] = await Promise.all([
    response.json(),
    appResponse.json(),
    shopResponse.json(),
  ]);

  console.log(JSON.stringify(extensions));

  // Attach `currentAppInstallation` to the product
  return { response: { subscriptionContracts: subscriptionContracts, currentAppInstallation, shop } };
};

/**
 * Utility function to generate the correct GraphQL variables dynamically
 *  Ensures correct `first` or `last` usage
 *  Removes unnecessary keys from the GraphQL query
 */
const generatePaginationVariables = (
  pagination: SubscriptionContractsNextParams,
  query?: string | null
): { variables: SubscriptionContractsVariables } => {
  const isGoingBack = !!pagination.before; // Check if navigating backward

  //  Create partial object first, only setting necessary properties
  let partialVariables: Partial<SubscriptionContractsVariables> = {
    reverse: true,
    query: query || undefined,
  };

  if (isGoingBack) {
    partialVariables = {
      ...partialVariables,
      last: pagination.first,
      before: pagination.before,

    };
  } else {
    partialVariables = {
      ...partialVariables,
      first: pagination.first,
      after: pagination.after,
    };
  }

  return { variables: partialVariables as SubscriptionContractsVariables };
};



const Subscriptions = () => {
  const { apiKey, response, first } = useLoaderData<any>();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  return (
    <SubscriptionsList responseData={response} first={first} />
  )
}

export default Subscriptions