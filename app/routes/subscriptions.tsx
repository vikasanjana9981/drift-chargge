import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { setAuthCookie } from "app/packages/utils/cookieAuth";
import { authenticate } from "app/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticate.admin(request);
    const url = new URL(request.url);
    const queryString = url.searchParams.toString();
    const shop = url.searchParams.get("shop");
    const host = url.searchParams.get("host");
    const subscriptionId = url.searchParams.get("id");

    if (shop && host && subscriptionId) {

        // Prepare cookie data
        const cookieData = {
            shop,
            host,
            query: queryString,
        };

        // Set the cookie
        const cookieHeader = await setAuthCookie(cookieData);

        // Redirect to /merchant/home
        return redirect(`/merchant/subscriptions/${subscriptionId}`, {
            headers: {
                "Set-Cookie": cookieHeader,
            },
        });
    } else {
        throw redirect("/auth/login");
    }
};
