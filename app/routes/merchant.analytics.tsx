import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { AppProvider } from '@shopify/shopify-app-remix/react';
import { routes } from 'app/config/routes';
import { getAuthCookie, mergeQueryParams } from 'app/packages/utils/cookieAuth';
import ExportButton from 'app/shared/export-button';
import PageHeader from 'app/shared/page-header';
import ProductsTable from 'app/shared/products/product-list/table';
import { authenticate } from 'app/shopify.server';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui/button';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }

  // Create a new request with merged query parameters
  const updatedRequest = mergeQueryParams(request, authData.query);
  await authenticate.admin(updatedRequest);

  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: routes.products.products,
      name: 'Products',
    },
    {
      name: 'List',
    },
  ],
};

const Analytics = ({ Products = [] }) => {
  const { apiKey } = useLoaderData<typeof loader>();
  return <h1>Analytics</h1>
}

export default Analytics