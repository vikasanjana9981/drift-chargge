import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { AppProvider } from '@shopify/shopify-app-remix/react';
import { getAuthCookie, mergeQueryParams } from 'app/packages/utils/cookieAuth';
import { authenticate } from 'app/shopify.server';

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

const Home = () => {
  const { apiKey } = useLoaderData<typeof loader>();
  return (
    <h1>Home</h1>
  )
}

export default Home