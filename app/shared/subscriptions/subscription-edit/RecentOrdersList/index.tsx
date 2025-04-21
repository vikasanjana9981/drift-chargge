import { Accordion } from "rizzui";
import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import RecentOrdersListData from "./RecentOrdersListData";
import AccordionHeader from "../UpCommingOrdersList/AccordionHeader";

const RecentOrdersList = () => {
    const [subscriptionContract] = useAtom(subscriptionContractAtom);
    const { orders, billingAttempts } = subscriptionContract || {};

    return (
        <div className="my-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted lg:gap-y-6 p-3">
            <Accordion className="border-b last-of-type:border-b-0" defaultOpen>
                <Accordion.Header>
                    {({ open }) => <AccordionHeader open={open} title="Billing Attempts" />}
                </Accordion.Header>
                <Accordion.Body>{billingAttempts && <RecentOrdersListData billingAttempts={billingAttempts} />}</Accordion.Body>
            </Accordion>
        </div>
    );
};

export default RecentOrdersList;
