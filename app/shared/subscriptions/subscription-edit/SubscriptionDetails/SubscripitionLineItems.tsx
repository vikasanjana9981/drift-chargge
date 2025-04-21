import { useTanStackTable } from "app/packages/components/table/custom/use-TanStack-Table";
import { formatDate } from "app/packages/utils/shopifyIdUtils";
import { OtherAactions, SubscripiontLinesTablesData, SubscriptionContractSingleNode, SubscriptionLineEdge, SubscriptionLineItem } from "app/types/subscription/subscriptionQueryTypes";
import { useEffect, useMemo, useState } from "react";
import { Flex } from "rizzui";
import { lineColumns } from "./column";
import MainTable from "app/packages/components/table";
import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import RescheduleBillingModal from "./Modals/RescheduleNextBillingDate";
import EditOrderFrequencyModal from "./Modals/EditOrderFrequencyModal";
import CancelSubscriptionModal from "./Modals/CancelSubscriptionModal";
import ReactiveSubscriptionModal from "./Modals/ReactiveSubscriptionModal";
import EditLineItemAttributeModal from "./Modals/EditLineItemAttributeModal";
import EditSubscriptionProductModal from "./Modals/EditSubscriptionProductModal";
import SwapProductModal from "./Modals/SwapProductModal";


const SubscriptionLineItems = () => {
    const [subscriptionContract] = useAtom(subscriptionContractAtom);
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [isEditOrderFrequencyModalOpen, setIsEditOrderFrequencyModalOpen] = useState(false);
    const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false);
    const [isReactiveSubscriptionModalOpen, setIsReactiveSubscriptionModalOpen] = useState(false);
    const [isEditLineItemAttributesModalOpen, setIsEditLineItemAttributesModalOpen] = useState(false);
    const [isEditSubscriptionProductModalOpen, setIsEditSubscriptionProductModalOpen] = useState(false);
    const [isSwapProductModalOpen, setIsSwapProductModalOpen] = useState(false);
    const [subscriptionLine, setSubscriptionLine] = useState<SubscriptionLineItem | undefined>(undefined);
    if (!subscriptionContract) return null;
    const { nextBillingDate } = subscriptionContract

    const otherActions: OtherAactions = {
        setIsRescheduleModalOpen,
        setIsEditOrderFrequencyModalOpen,
        setIsCancelSubscriptionModalOpen,
        setIsReactiveSubscriptionModalOpen,
        setIsEditLineItemAttributesModalOpen,
        setSubscriptionLine,
        setIsEditSubscriptionProductModalOpen,
        setIsSwapProductModalOpen
    }
    const tableData = useMemo(
        () => transformShopifyContractLines(
            subscriptionContract?.lines?.edges || [],
            subscriptionContract,
            otherActions
        ),
        [subscriptionContract?.lines]
    );

    const { table, setData } = useTanStackTable<SubscripiontLinesTablesData>({
        tableData,
        columnConfig: lineColumns,
        options: {
            initialState: { pagination: { pageIndex: 0, pageSize: 20 } },
            enableColumnResizing: false,
        },
    });

    useEffect(() => {
        setData(tableData)
    }, [tableData, setData]);


    return (
        <Flex className="w-full">
            <MainTable table={table} variant="classic" />
            <RescheduleBillingModal
                modalState={isRescheduleModalOpen}
                setModalState={setIsRescheduleModalOpen}
                nextBillingDate={nextBillingDate}
            />
            <EditOrderFrequencyModal
                modalState={isEditOrderFrequencyModalOpen}
                setModalState={setIsEditOrderFrequencyModalOpen}
                billingPolicy={subscriptionContract.billingPolicy}
            />
            <CancelSubscriptionModal
                modalState={isCancelSubscriptionModalOpen}
                setModalState={setIsCancelSubscriptionModalOpen}
            />
            <ReactiveSubscriptionModal
                modalState={isReactiveSubscriptionModalOpen}
                setModalState={setIsReactiveSubscriptionModalOpen}
            />
            <EditLineItemAttributeModal
                modalState={isEditLineItemAttributesModalOpen}
                setModalState={setIsEditLineItemAttributesModalOpen}
                subscriptionLine={subscriptionLine}
            />
            <EditSubscriptionProductModal 
                modalState={isEditSubscriptionProductModalOpen}
                setModalState={setIsEditSubscriptionProductModalOpen}
                subscriptionLine={subscriptionLine}
            />

            <SwapProductModal
                modalState={isSwapProductModalOpen}
                setModalState={setIsSwapProductModalOpen}
                subscriptionLine={subscriptionLine}
            />

        </Flex>
    );
};

const transformShopifyContractLines = (
    lines: SubscriptionLineEdge[],
    subscriptionContract: SubscriptionContractSingleNode,
    otherActions: OtherAactions
) => {
    const { nextBillingDate, deliveryPolicy, billingPolicy, shop, status, note } = subscriptionContract
    return lines.map(({ node }: { node: SubscriptionLineItem }) => ({
        id: node.id ?? null,
        title: node.title ?? "Untitled",
        variantTitle: node.variantTitle,
        quantity: node.quantity,
        lineDiscountedPrice: {
            amount: node.lineDiscountedPrice.amount,
            currencyCode: node.lineDiscountedPrice.currencyCode
        },
        variantImage: node.variantImage ? { url: node.variantImage.url } : undefined,
        nextBillingDate: formatDate(nextBillingDate, false),
        deliveryPolicyInterval: deliveryPolicy?.interval || "N/A",
        deliveryPolicyIntervalCount: deliveryPolicy?.intervalCount || 0,
        billingPolicyInterval: billingPolicy?.interval || "N/A",
        billingPolicyIntervalCount: billingPolicy?.intervalCount || 0,
        shop: shop,
        status: status,
        otherActions: otherActions,
        note: note,
        node: node
    }));
};

export default SubscriptionLineItems