import { Dropdown, Button } from "rizzui";
import { BsChevronDown } from "react-icons/bs";
import { FaArrowsRotate, FaPencil, FaPowerOff, FaRegCalendar, FaRegTrashCan } from "react-icons/fa6";
import DropdownActionItem from "./DropdownActionItem";
import { FaRegWindowClose } from "react-icons/fa";
import { OtherAactions, SubscriptionContractSubscriptionStatus, SubscriptionLineItem } from "app/types/subscription/subscriptionQueryTypes";
import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import { set } from "lodash";

export type SubscriptionLineItemActionsProps = {
    OtherAactions: OtherAactions,
    node: SubscriptionLineItem
};

const SubscriptionLineItemActions = (
    { OtherAactions, node }: SubscriptionLineItemActionsProps) => {
    const [subscriptionContract] = useAtom(subscriptionContractAtom);
    if (!subscriptionContract) return null;
    const { status } = subscriptionContract;

    const ACTIVE_ACTIONS = [
        {
            icon: FaRegCalendar,
            label: "Reschedule next charge",
            setState: OtherAactions.setIsRescheduleModalOpen
        },
        {
            icon: FaPencil,
            label: "Edit frequency",
            setState: OtherAactions.setIsEditOrderFrequencyModalOpen
        },
        {
            icon: FaPencil,
            label: "Edit subscription product", setState: (value: boolean) => {
                OtherAactions.setIsEditSubscriptionProductModalOpen(value);
                OtherAactions.setSubscriptionLine(node);
            }
        },
        {
            icon: FaArrowsRotate,
            label: "Swap Product", setState: (value: boolean) => {
                OtherAactions.setIsSwapProductModalOpen(value);
                OtherAactions.setSubscriptionLine(node);
            }
        },
        {
            icon: FaRegWindowClose,
            label: "Cancel subscription",
            setState: OtherAactions.setIsCancelSubscriptionModalOpen
        },
        {
            icon: FaRegTrashCan,
            label: "Delete"
        },
        {
            icon: FaPencil,
            label: "Edit line Item properties",
            setState: (value: boolean) => {
                OtherAactions.setIsEditLineItemAttributesModalOpen(value);
                OtherAactions.setSubscriptionLine(node);
            }
        },
    ];

    const CANCELLED_ACTIONS = [
        {
            icon: FaPowerOff,
            label: "Reactivate subscription",
            setState: OtherAactions.setIsReactiveSubscriptionModalOpen,
        },
        {
            icon: FaRegTrashCan,
            label: "Delete"
        },
        {
            icon: FaPencil,
            label: "Edit line Item properties",
            setState: (value: boolean) => {
                OtherAactions.setIsEditLineItemAttributesModalOpen(value);
                OtherAactions.setSubscriptionLine(node);
            }
        },
    ];

    const ACTIONS =
        status === SubscriptionContractSubscriptionStatus.CANCELLED
            ? CANCELLED_ACTIONS
            : ACTIVE_ACTIONS;

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button as="span" variant={"text" as any} color="primary" className="text-primary font-bold">
                    Action <BsChevronDown className="ml-2 w-5" />
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu className="min-w-[310px]">
                {ACTIONS.map((action, index) => (
                    <DropdownActionItem
                        key={index}
                        icon={action.icon}
                        label={action.label}
                        onClick={() => action.setState && action.setState(true)}
                    />
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SubscriptionLineItemActions;
