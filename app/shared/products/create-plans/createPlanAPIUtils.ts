
// createPlanAPIUtils.ts
import { CREATE_SELLING_PLAN_GROUP } from "app/graphql/mutations/sellingPlans/sellingPlanGroupCreate";
import { getAuthCookie, mergeQueryParams } from "app/packages/utils/cookieAuth";
import { authenticate } from "app/shopify.server";

export interface AuthAdmin {
    graphql: (query: any, variables: any) => Promise<any>;
    // you can add more methods if needed
}

interface AuthResult {
    admin: AuthAdmin;
}

export class MissingDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MissingDataError";
    }
}

// Optionally inject the function that does the Shopify call
export const authenticateAction = async (
    request: Request,
    doShopifyAuth: typeof authenticate.admin = authenticate.admin
): Promise<AuthResult | false> => {
    try {
        const cookieHeader = request.headers.get("Cookie");
        const authData = await getAuthCookie(cookieHeader);
        if (!authData) return false;

        const updatedRequest = mergeQueryParams(request, authData.query);
        const response = await doShopifyAuth(updatedRequest);
        if (!response || !response.admin) return false;

        return { admin: response.admin };
    } catch (error) {
        console.error("Authentication Error:", error);
        return false;
    }
};

export const authenticateRequest = async (request: Request): Promise<AuthAdmin | null> => {
    const authResult = await authenticateAction(request);
    return authResult ? authResult.admin : null;
};

export const extractFormData = async (
    request: Request,
    params: any
): Promise<{ plansString: string; productId: string; appGraphqlId: string }> => {
    const body = await request.formData();
    const plansString = body.get("plans") as string;
    const appGraphqlId = body.get("appId") as string;

    if (!plansString || !params.productId || !appGraphqlId) {
        throw new MissingDataError("Missing required data: plans, productId, or appId");
    }

    return { plansString, productId: params.productId, appGraphqlId };
};

export const parsePlansJson = <T = any>(plansString: string): T => {
    try {
        return JSON.parse(plansString) as T;
    } catch (error) {
        throw new Error("Invalid JSON format in plans");
    }
};

const executeShopifyMutation = async (
    query: string,
    admin: any,
    variables: Record<string, any>
): Promise<any> => {
    try {
        // Perform the GraphQL request
        const createResponse = await admin.graphql(query, variables);
        // Parse and return JSON
        const jsonData = await createResponse.json();
        return jsonData as any;
    } catch (error) {
        console.error("Error executing Shopify mutation:", error);
        throw new Error("Failed to execute Shopify mutation");
    }
};

const createPlanAPIUtils = {
    authenticateRequest,
    authenticateAction,
    extractFormData,
    parsePlansJson,
    executeShopifyMutation
};

export default createPlanAPIUtils;
