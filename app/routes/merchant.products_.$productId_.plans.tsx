import { ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useNavigate, useParams, useSearchParams } from "@remix-run/react";
import { useIsMounted } from "app/packages/hooks/use-is-mounted";
import createOnetimePlanUtils from "app/shared/products/create-plans/createOneTimePlanUtils";
import createPlanAPIUtils from "app/shared/products/create-plans/createPlanAPIUtils";
import createRecurringPlanUtils from "app/shared/products/create-plans/createRecurringPlanUtility";
import CreateSellingPlans from "app/shared/products/selling-plan-groups";
import { createPlanPageStates } from "app/states/plansAtom";
import { productAtom } from "app/states/productAtom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { oneTimeGroup, OneTimePlan } from "app/types/product/sellingPlans";
import { CREATE_SELLING_PLAN_GROUP } from "app/graphql/mutations/sellingPlans/sellingPlanGroupCreate";
import { UPDATE_SELLING_PLAN_GROUP } from "app/graphql/mutations/sellingPlans/sellingPlanGroupUpdate";
import { Loader } from "rizzui/loader";
import { logToFile } from "app/packages/utils/logUtils";

// Constants for group keys and error messages
const GROUP_KEYS = {
    ONE_TIME: "oneTimeGroup",
    PAY_PER_SHIPMENT: "payPerShipmentGroup",
    PRE_PAID: "prePaidSubscriptionsGroup",
} as const;

export const ERROR_MESSAGES = {
    UNAUTHORIZED: "Unauthorized",
    METHOD_NOT_ALLOWED: "Method not allowed",
    INVALID_REQUEST: "Invalid request data",
    INTERNAL_SERVER_ERROR: "Internal server error",
    PRODUCT_ID_NOT_FOUND: "Product ID not found",
    REQUIRED_PARAMS_MISSING: "Required parameters are missing",
    ACTION_NOT_FOUND: "Action not found",
    CONTRACTID_MISSING:"Subscription contract id missing"

} as const;

type SellingPlanResponse = any;

// Server-Side Action
export async function action({
    request,
    params
}: ActionFunctionArgs) {
    if (request.method !== "POST") {
        return json({ error: ERROR_MESSAGES.METHOD_NOT_ALLOWED }, { status: 405 });
    }

    try {
        const admin = await createPlanAPIUtils.authenticateRequest(request);
        console.log(admin);
        if (!admin) return json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
        const formData = await request.formData();
        const plansString = formData.get("plans")?.toString();
        const productId = formData.get("productId")?.toString();
        const appGraphqlId = formData.get("appId")?.toString();
        if (!plansString || !productId || !appGraphqlId) {
            return json({ error: ERROR_MESSAGES.INVALID_REQUEST }, { status: 400 });
        }
        const groups = JSON.parse(plansString) as Record<any, unknown>;
        const response: Partial<SellingPlanResponse> = {};
        let hasPartialFailure = false;

        // get is update
        const isUpdate = formData.get("plansUpdate")?.toString() === "yes";

        for (const [groupKey, groupData] of Object.entries(groups) as any) {
            try {
                if (!Object.values(GROUP_KEYS).includes(groupKey as any)) {
                    continue;
                }

                if (!groupData) continue;

                const plansToUpdate = groupData?.sellingPlansToUpdate || [];
                const plansToCreate = groupData?.sellingPlansToCreate || [];

                const plans = isUpdate ? [...plansToUpdate, ...plansToCreate] : plansToCreate;

                // Remove null values from the array
                const filteredPlans = plans.filter((plan : any) => plan !== null);

                if (filteredPlans.length === 0) {
                    continue; // Skip if both arrays are empty
                }

                const variables = await createVariablesForGroup(
                    groupKey as any,
                    groupData,
                    productId,
                    appGraphqlId,
                    isUpdate
                );

                console.log('variables here', groupKey, JSON.stringify(variables));
                // logToFile(variables, `Mutation Variables for ${groupKey} :- ${groupKey}`);

                const query = (isUpdate && (groupData?.groupId || groupData?.sellingPlansToCreate[0]?.groupId))
                    ? UPDATE_SELLING_PLAN_GROUP
                    : CREATE_SELLING_PLAN_GROUP;
                console.log('query here', groupKey, JSON.stringify(query));

                const result = await createPlanAPIUtils.executeShopifyMutation(
                    query,
                    admin, variables
                );

                console.log('result here', groupKey, JSON.stringify(result));
                const userErrors = result?.data?.sellingPlanGroupCreate?.userErrors || result?.data?.sellingPlanGroupUpdate?.userErrors;
                if (userErrors.length > 0) {
                    hasPartialFailure = true;
                    response[groupKey] = {
                        success: false,
                        errors: userErrors.map((err: { message: string }) => err.message),
                    };
                } else {
                    response[groupKey] = { success: true };
                }
            } catch (error) {
                hasPartialFailure = true;
                response[groupKey] = {
                    success: false,
                    errors: [ERROR_MESSAGES.INTERNAL_SERVER_ERROR],
                };
                console.error(`Error processing ${groupKey}:`, error);
            }
        }
        return json(response, { status: hasPartialFailure ? 207 : 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
    }
}

async function createVariablesForGroup(
    groupKey: any,
    groupData: any,
    productId: string,
    appGraphqlId: string,
    isUpdate: boolean
) {
    switch (groupKey) {
        case GROUP_KEYS.ONE_TIME:
            var groupId = groupData?.sellingPlansToCreate[0]?.groupId
            if (isUpdate && groupId) {
                const oneTimeGroup = groupData.sellingPlansToCreate ? groupData.sellingPlansToCreate[0] : groupData
                return createOnetimePlanUtils.createGraphQLVariablesOneTimesUpdate(oneTimeGroup);
            }
            return createOnetimePlanUtils.createGraphQLVariablesOneTimes(
                groupData as oneTimeGroup,
                appGraphqlId,
                productId
            );
        case GROUP_KEYS.PAY_PER_SHIPMENT:
            var groupId = groupData?.groupId
            if (isUpdate && groupId) {
                return createRecurringPlanUtils.updateGraphQLVariables(
                    groupData
                );
            }
            return createRecurringPlanUtils.createGraphQLVariablesPayPerShipment(
                groupData,
                productId,
                appGraphqlId
            );
        case GROUP_KEYS.PRE_PAID:
            var groupId = groupData?.groupId
            if (isUpdate && groupId) {
                return createRecurringPlanUtils.updateGraphQLVariables(
                    groupData
                );
            }
            return createRecurringPlanUtils.createGraphQLVariablesPayPerShipment(
                groupData,
                productId,
                appGraphqlId,
                true
            );
        default:
            throw new Error(`Unsupported group type: ${groupKey}`);
    }
}


// Client Component
const CreatePlansHome = () => {
    const isMounted = useIsMounted();
    const fetcher = useFetcher<Partial<SellingPlanResponse>>();
    const { productId } = useParams();

    const [searchParams] = useSearchParams();
    const plansUpdate = searchParams.get('plansUpdate') === 'yes';
    const [
        createPlanLoader,
        setCreatePlanLoader
    ] = useState(false);
    const [createPlanPageState] = useAtom(createPlanPageStates);
    const [product] = useAtom(productAtom);

    useEffect(() => {
        if (!fetcher.data) return;
        setCreatePlanLoader(false);
        const response = fetcher.data;

        if ("error" in response) {
            toast.error(response.error as unknown as string);
            return;
        }

        let successMessages: string[] = [];
        let errorMessages: string[] = [];

        Object.entries(response).forEach(([group, result]) => {
            const groupName = formatGroupName(group);
            if (result?.success) {
                successMessages.push(`${groupName} created successfully!`);
            } else if (result?.errors) {
                result.errors.forEach((err: string) => {
                    errorMessages.push(`${groupName}: ${err}`);
                });
            }
        });

        if (errorMessages.length > 0) {
            toast.error(errorMessages.join("\n"));
        } else if (successMessages.length > 0) {
            toast.success(successMessages.join("\n"));
            window.history.back(); // Redirect only if there are no errors
        }
    }, [fetcher.data]);


    const organizeSellingPlans = (planData: any) => {
        const updatedPlanData = { ...planData };

        Object.keys(updatedPlanData).forEach((groupKey) => {
            const group = updatedPlanData[groupKey];

            if (!group || (!group.sellingPlansToCreate && !group.sellingPlansToUpdate)) {
                return;
            }

            const sellingPlansToCreate = group.sellingPlansToCreate || [];
            const sellingPlansToUpdate = group.sellingPlansToUpdate || [];

            // Separate plans into update vs create based on the presence of an ID
            const newSellingPlansToUpdate = sellingPlansToCreate.filter((plan: any) => plan?.id);
            const newSellingPlansToCreate = sellingPlansToCreate.filter((plan: any) => !plan?.id);

            // Assign the updated arrays back to the group
            updatedPlanData[groupKey] = {
                ...group,
                sellingPlansToCreate: newSellingPlansToCreate,
                sellingPlansToUpdate: [...sellingPlansToUpdate, ...newSellingPlansToUpdate]
            };
        });

        return updatedPlanData;
    };

    const handleSavePlans = () => {
        if (!product?.currentAppInstallation?.app) {
            toast.error("Missing required product information");
            return;
        }

        const updatedPlans = plansUpdate ? createPlanPageState : organizeSellingPlans(createPlanPageState);
        setCreatePlanLoader(true);
        const formData = new FormData();
        formData.append("plans", JSON.stringify(updatedPlans));
        formData.append("productId", productId!);
        formData.append("appId", product.currentAppInstallation.app.id);

        if (plansUpdate) {
            formData.append("plansUpdate", "yes");
        }

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };
    if (!isMounted) return null;

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <Loader variant='spinner' className="h-8 w-8" />
                <span className="ml-2">Need to load data here...</span>
            </div>
        );
    }
    return (
        <div className="position-relative">
            <CreateSellingPlans
                handleSavePlans={handleSavePlans}
                createPlanLoader={createPlanLoader}
            />
        </div>
    );
};

// Helper function to format group names for display
function formatGroupName(groupKey: string) {
    return groupKey
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, str => str.toUpperCase())
        .replace(" Group", "");
}

export default CreatePlansHome;