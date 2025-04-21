import { createCookie } from "@remix-run/node";

// Create a cookie for authentication
export const authCookie = createCookie("auth", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
});

/**
 * Save data to the auth cookie.
 * @param data - The data to store in the cookie.
 * @returns Serialized cookie string to set in the headers.
 */
export const setAuthCookie = async (data: Record<string, any>) => {
    const encodedData = encodeURIComponent(JSON.stringify(data));
    return authCookie.serialize({ query: encodedData });
};

/**
 * Read data from the auth cookie.
 * @param cookieHeader - The Cookie header from the request.
 * @returns Decoded data stored in the cookie, or null if not found.
 */
export const getAuthCookie = async (cookieHeader: string | null) => {
    if (!cookieHeader) return null;

    const cookieData = await authCookie.parse(cookieHeader);
    if (!cookieData?.query) return null;

    return JSON.parse(decodeURIComponent(cookieData.query));
};


/**
 * Merges the stored query string from cookies with the current request query parameters.
 * Creates a new `Request` instance with the updated URL.
 * @param {Request} request - The original request.
 * @param {string | null} storedQuery - The stored query string from authentication cookie.
 * @returns {Request} - A new `Request` instance with the updated query parameters.
 */
export function mergeQueryParams(request: Request, storedQuery: string | null): Request {
    const url = new URL(request.url);
    const existingQueryParams = new URLSearchParams(url.search);
    const storedQueryParams = new URLSearchParams(storedQuery || "");

    // Merge stored query params into existing ones
    storedQueryParams.forEach((value, key) => {
        existingQueryParams.set(key, value);
    });

    // Construct the updated URL
    url.search = existingQueryParams.toString();

    // Create and return a new Request with the updated URL
    return new Request(url.toString(), request);
}