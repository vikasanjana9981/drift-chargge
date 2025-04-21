import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { redirect } from "@remix-run/react";
import { setAuthCookie } from "app/packages/utils/cookieAuth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const queryString = url.searchParams.toString();
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host");

  if (shop && host) {
    // Prepare cookie data
    const cookieData = {
      shop,
      host,
      query: queryString,
    };

    // Set the cookie
    const cookieHeader = await setAuthCookie(cookieData);

    // Redirect to /merchant/home
    return redirect("/merchant/home", {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    });
  } else {
    throw redirect("/auth/login");
  }
};
