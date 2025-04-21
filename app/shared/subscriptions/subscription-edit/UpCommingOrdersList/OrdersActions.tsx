import { Dropdown, Button } from "rizzui";
import { BsChevronDown } from "react-icons/bs";
import { PiPencil } from "react-icons/pi";
import { FaBars } from "react-icons/fa6";
import DropdownActionItem from "../SubscriptionDetails/DropdownActionItem";
import { BillingCycleNode, OtherAactionsUpCommingOrders } from "app/types/subscription/subscriptionQueryTypes";


interface OrdersActionsProps {
    OtherAactions: OtherAactionsUpCommingOrders
    billingCycle: BillingCycleNode
}

const OrdersActions: React.FC<OrdersActionsProps> = ({ OtherAactions, billingCycle }) => {
    const ACTIONS = [
        {
            icon: PiPencil,
            label: "Reschedule",
            setState: (value: boolean) => {
                OtherAactions.setIsRescheduleModalOpen(value)
                OtherAactions.setSelectedUpcommingOrders(billingCycle)
            }
        },
        {
            icon: FaBars,
            label: "Process now"
        },
    ];
    return (
        <Dropdown>
            <Dropdown.Trigger onClick={(e) => e.stopPropagation()}>
                <Button as="span" variant={"text" as any} color="primary" className="text-primary font-bold text-sm">
                    Actions <BsChevronDown className="ml-2 w-5" />
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu className="min-w-[280px]" onClick={(e) => e.stopPropagation()}>
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

export default OrdersActions;
