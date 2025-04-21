import { Link, useNavigate, useParams } from "@remix-run/react";
import { extractNumericId } from "app/packages/utils/shopifyIdUtils";
import { ProductSingleNode } from "app/types/product/ProductNode";
import { useEffect, useState } from "react";
import {
    getSellingPlanGroup,
    processOneTimeGroup,
    processPayPerShipmentGroup
} from "../utils/sellingPlansGroupUtils";
import OneTimePlansList from "./OneTimePlans";
import { Button, Flex, Text } from "rizzui";
import { PiGear } from "react-icons/pi";
import { ConfigureSettingsLabels } from "../dropdownConfig";
import PayperShipmentPlansList from "./PayperShipmentPlansList";
import { useAtom } from "jotai";
import { createPlanPageStates } from "app/states/plansAtom";

export const PlansGroupsInformation = ({ productResponse }: {
    productResponse: ProductSingleNode
}) => {
    // State to store filtered selling plans
    const [filteredSellingPlans, setFilteredSellingPlans] = useState<any[]>([]);
    const navigate = useNavigate();
    const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);

    useEffect(() => {
        if (!productResponse) return;
        const { sellingPlanGroups, currentAppInstallation } = productResponse as any;
        const appIdGraphQL = currentAppInstallation?.app?.id || "";
        const appIdNumeric = extractNumericId(appIdGraphQL); // Convert GraphQL ID to numeric
        // Filter selling plan groups that belong to this app
        if (sellingPlanGroups && sellingPlanGroups.edges) {
            const filteredPlans = sellingPlanGroups.edges.filter(
                (edge: any) => extractNumericId(edge.node.appId) === appIdNumeric
            );
            setFilteredSellingPlans(filteredPlans);
        }
    }, [productResponse]);

    const OneTimeGroups = getSellingPlanGroup(filteredSellingPlans, "Onetime Plan Group");
    const processedOneTimeGroup = OneTimeGroups ? processOneTimeGroup(OneTimeGroups) : null;
    const PayPerShipmentGroup = getSellingPlanGroup(filteredSellingPlans, "PayPerShipment Plan Group");
    const processedPayPerShipmentGroup = PayPerShipmentGroup ? processPayPerShipmentGroup(PayPerShipmentGroup) : null;
    const PrePaidShipmentGroup = getSellingPlanGroup(filteredSellingPlans, "PrePaid Plan Group");
    const processedPrePaidShipmentGroup = PrePaidShipmentGroup ? processPayPerShipmentGroup(PrePaidShipmentGroup) : null;
    const [refreshKey, setRefreshKey] = useState(0);


    useEffect(() => {
        const newState = {
            payPerShipmentGroup: {
                groupName: processedPayPerShipmentGroup?.groupName || "",
                sellingPlansToUpdate: processedPayPerShipmentGroup?.sellingPlans || [],
                groupId: processedPayPerShipmentGroup?.id
            },
            oneTimeGroup: {
                groupName: processedOneTimeGroup?.planName || "",
                sellingPlansToCreate: [processedOneTimeGroup],
                groupId: processedOneTimeGroup?.groupId
            },
            prePaidSubscriptionsGroup: {
                groupName: processedPrePaidShipmentGroup?.groupName || "PrePaid Subscription Plan Group",
                sellingPlansToUpdate: processedPrePaidShipmentGroup?.sellingPlans || [],
                groupId: processedPrePaidShipmentGroup?.id
            },
        };

        // Compare new state with the previous state to prevent unnecessary updates
        if (JSON.stringify(createPlanPageState) !== JSON.stringify(newState)) {
            setCreatePlanPageState(newState as any);
        }
    }, [processedOneTimeGroup, processedPayPerShipmentGroup, processedPrePaidShipmentGroup]);

    return (
        <Flex gap="5">
            {filteredSellingPlans.length > 0 ? (
                <div className="w-full flex flex-col gap-5">
                    {processedOneTimeGroup && <OneTimePlansList
                        OneTimeGroup={processedOneTimeGroup}
                    />}
                    {processedPayPerShipmentGroup && <PayperShipmentPlansList
                        plansKey={`payper-${refreshKey}`}
                        shipmentGroup={processedPayPerShipmentGroup}
                        setRefreshKey={setRefreshKey}
                    />}
                    {processedPrePaidShipmentGroup && <PayperShipmentPlansList
                        shipmentGroup={processedPrePaidShipmentGroup}
                        plansKey={`prepaid-${refreshKey}`}
                        setRefreshKey={setRefreshKey}
                    />}
                </div>
            ) : (
                <Flex direction="col" gap="7">
                    <Text className="mt-2">No selling plans found.</Text>
                    <Link
                        to={`/merchant/products/${extractNumericId(productResponse?.id)}/plans`}
                        className="rounded-md text-sm font-bold flex items-center text-primary"
                    >
                        <PiGear />
                        <Text className="ms-2">{ConfigureSettingsLabels.manage_plans}</Text>
                    </Link>
                </Flex>
            )
            }
        </Flex >
    )
}