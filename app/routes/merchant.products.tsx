import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData, useMatches } from '@remix-run/react';
import { PRODUCTS_QUERY } from 'app/graphql/queries/products/queryProducts';
import { CURRENT_APP_INSTALLATION } from 'app/graphql/queries/queryCurrentAppInstallation';
import { CURRENT_SHOP } from 'app/graphql/queries/queryShop';
import { useIsMounted } from 'app/packages/hooks/use-is-mounted';
import { getAuthCookie, mergeQueryParams } from 'app/packages/utils/cookieAuth';
import Products from 'app/shared/products';
import { authenticate } from 'app/shopify.server';
import { MainAppFilters, ProductStatus } from 'app/types/product/filtersData';
import { ProductFilterQuery } from 'app/types/product/productFilterQuery';
import { ProductsQueryResponse } from 'app/types/product/ProductNode';
import { ProductPaginationNextParams } from 'app/types/product/productPagination';
import { ProductQueryVariables, ProductSortKeys } from 'app/types/product/productQueryTypes';
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
  const filters: ProductFilterQuery = {
    status: url.searchParams.get("status") as ProductStatus || undefined,
    query: url.searchParams.get("query") || undefined,
    onlineStoreStatus: url.searchParams.get("onlineStoreStatus") || undefined
  };

  // Generate Shopify-compatible query string
  const shopifyQuery = generateShopifyQuery(filters);

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

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {AdminInstance}
 */
const loadCriticalData = async (
  admin: AdminApiContextWithoutRest,
  pagination: ProductPaginationNextParams,
  query?: string | null
) => {
  //  Generate variables dynamically in the required format
  const variables = generatePaginationVariables(pagination, query);
  const [
    response,
    appResponse,
    shopResponse
  ] = await Promise.all([
    admin.graphql(PRODUCTS_QUERY, variables),
    admin.graphql(CURRENT_APP_INSTALLATION),
    admin.graphql(CURRENT_SHOP),
  ]);
  const [
    { data: { products } },
    { data: { currentAppInstallation } },
    { data: { shop } }
  ] = await Promise.all([
    response.json(),
    appResponse.json(),
    shopResponse.json(),
  ]);

  // Attach `currentAppInstallation` to the product
  return { response: { products: products, currentAppInstallation, shop } };
};

const generateShopifyQuery = (filters: ProductFilterQuery): string | null => {
  const queryParts: string[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    switch (key) {
      case MainAppFilters.QUERY:
        queryParts.push(`${value}`);
        break;
      case MainAppFilters.STORESTATUS:
      default:
        queryParts.push(`published_status:"${value}"`);
        break;
    }
  });

  return queryParts.length ? queryParts.join(" ") : null;
};

/**
 * Utility function to generate the correct GraphQL variables dynamically
 *  Ensures correct `first` or `last` usage
 *  Removes unnecessary keys from the GraphQL query
 */
const generatePaginationVariables = (
  pagination: ProductPaginationNextParams,
  query?: string | null
): { variables: ProductQueryVariables } => {
  const isGoingBack = !!pagination.before; // Check if navigating backward

  //  Create partial object first, only setting necessary properties
  let partialVariables: Partial<ProductQueryVariables> = {
    reverse: true,
    sortKey: ProductSortKeys.PUBLISHED_AT,
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

  // Ensure `first` exists by asserting to `ProductQueryVariables`
  return { variables: partialVariables as ProductQueryVariables };
};


const Home = () => {
  const { apiKey, response, first } = useLoaderData<typeof loader>();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  return <Products responseData={response} first={first} />
}

export default Home