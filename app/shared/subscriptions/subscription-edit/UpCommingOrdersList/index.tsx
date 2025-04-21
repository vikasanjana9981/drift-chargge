import { Accordion } from "rizzui";
import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import UpCommingOrdersListData from "./UpCommingOrdersListData";
import AccordionHeader from "./AccordionHeader";
import { useState } from "react";
import { BillingCycleNode, OtherAactionsUpCommingOrders } from "app/types/subscription/subscriptionQueryTypes";
import RescheduleNextOrder from "./Modals/RescheduleNextOrder";

const UpCommingOrdersList = () => {
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedUpcommingOrder, setSelectedUpcommingOrders] = useState<BillingCycleNode | null>(null);
    const OtherAactions: OtherAactionsUpCommingOrders = {
        setIsRescheduleModalOpen,
        setSelectedUpcommingOrders
    }
    return (
        <div className="my-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted lg:gap-y-6 p-3">
            <Accordion className="border-b last-of-type:border-b-0" defaultOpen>
                <Accordion.Header>
                    {({ open }) => <AccordionHeader
                        open={open}
                        title="Upcoming Orders"
                    />}
                </Accordion.Header>
                <Accordion.Body>
                    <UpCommingOrdersListData
                        OtherAactions={OtherAactions}
                    />
                </Accordion.Body>
            </Accordion>
            <RescheduleNextOrder
                modalState={isRescheduleModalOpen}
                setModalState={setIsRescheduleModalOpen}
                selectedUpcommingOrder={selectedUpcommingOrder}
            />
        </div>
    );
};

export default UpCommingOrdersList;
