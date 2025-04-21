import { ActionFunctionArgs, json } from "@remix-run/node";
import { ERROR_MESSAGES } from "./merchant.products_.$productId_.plans";
import createPlanAPIUtils from "app/shared/products/create-plans/createPlanAPIUtils";
import { UPDATE_SELLING_PLAN_GROUP } from "app/graphql/mutations/sellingPlans/sellingPlanGroupUpdate";
import { generateGraphQLId, ShopifyObjectType } from "app/packages/utils/shopifyIdUtils";
import { useIsMounted } from "app/packages/hooks/use-is-mounted";
import { useAtom } from "jotai";
import { ProductSingleNode } from "app/types/product/ProductNode";
import { productAtom } from "app/states/productAtom";
import { Loader } from "rizzui/loader";
import EditVariantPlans from "app/shared/products/edit-variant-plans";

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
        const productId = formData.get("productId")?.toString();
        const appGraphqlId = formData.get("appId")?.toString();
        const variantData = formData.get("variantData")?.toString();
        if (!variantData || !productId || !appGraphqlId) return json({ error: ERROR_MESSAGES.REQUIRED_PARAMS_MISSING }, { status: 400 });
        const variantDataJson = JSON.parse(variantData) as Record<any, unknown>;
        const variables = generateRemoveVariantVariables(variantDataJson);
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

    } catch (error) {
        console.error("Unexpected error:", error);
        return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
    }
}

const generateRemoveVariantVariables = (variantData: Record<any, unknown>) => {
    const { groupId, transformedVariantData } = variantData;

    const graphqlGroupId = generateGraphQLId(Number(groupId), ShopifyObjectType.SellingPlanGroup);
    const sellingPlansToUpdate = prepareInputUpdateSellingPlans(transformedVariantData)
    return {
        variables: {
            id: graphqlGroupId,
            input: {
                sellingPlansToUpdate
            }
        }
    }
}

const prepareInputUpdateSellingPlans = (transformedVariantData: any) => {
    return transformedVariantData.map((plan: any) => ({
        id: plan.sellingPlanId,
        metafields: [
            {
                value:JSON.stringify(plan.restrictedVariants),
                type: "list.variant_reference",
                key: "restrictedVariants",
                namespace: "billion-grid-app"
            },
            {
                value: JSON.stringify(plan.addedVariants),
                type: "list.variant_reference",
                key: "addedVariants",
                namespace: "billion-grid-app"
            }
        ]
    }));
}

const SelectVariantPlansHome: React.FC = () => {
    const isMounted = useIsMounted();
    const [product] = useAtom<ProductSingleNode>(productAtom);

    if (!isMounted) return null;

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <Loader variant='spinner' className="h-8 w-8" />
                <span className="ml-2">Need to load data here...</span>
            </div>
        );
    }

    return <EditVariantPlans product={product} />
};


export default SelectVariantPlansHome;