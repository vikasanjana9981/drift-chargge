import { Flex, Text, Dropdown, Button } from "rizzui";
import { BsChevronDown } from "react-icons/bs";
import { PiPencil } from "react-icons/pi";
import { FaBars } from "react-icons/fa6";
import DropdownActionItem from "./DropdownActionItem";
import { useState } from "react";
import { Customer } from "app/types/subscription/subscriptionQueryTypes";
import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import EditAddressModal from "./Modals/EditAddressModal";
import ViewOrderNoteAndAttributeModal from "./Modals/ViewOrderNoteAndAttributeModal";

const ACTIONS = [
    { icon: PiPencil, label: "Edit Address", action: "edit_address" },
    { icon: FaBars, label: "View order note & attributes", action: "edit_orderNote" },
];

const SubscriptionActions = ({
    customer
}: {
    customer: Customer
}) => {
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
    const [isViewOrderNoteModalOpen, setIsViewOrderNoteModalOpen] = useState(false);

    const [subscriptionContract] = useAtom(subscriptionContractAtom);

    if (!subscriptionContract) {
        return null; // Handle the case where subscriptionContract is undefined
    }

    const handleActionClick = (action: string) => {
        if (action === "edit_address") {
            setIsEditAddressOpen(true);
        } else {
            setIsViewOrderNoteModalOpen(true);
        }

    };

    const { deliveryMethod: { address } } = subscriptionContract;
    const customerAddress = subscriptionContract.customer.addressesV2?.edges[0].node
    return (
        <>
            <Dropdown>
                <Dropdown.Trigger>
                    <Button as="span" variant={"text" as any} color="primary" className="text-primary font-bold text-md">
                        Action <BsChevronDown className="ml-2 w-5" />
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu className="min-w-[280px]">
                    {ACTIONS.map((action, index) => (
                        <DropdownActionItem
                            key={index}
                            icon={action.icon}
                            label={action.label}
                            onClick={() => handleActionClick(action.action)}
                        />
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <EditAddressModal
                modalState={isEditAddressOpen}
                setModalState={setIsEditAddressOpen}
                defaultAddress={address} />
            <ViewOrderNoteAndAttributeModal
                modalState={isViewOrderNoteModalOpen}
                setModalState={setIsViewOrderNoteModalOpen}
                shippingAddress={address}
                customerAddress={customerAddress}
            />
        </>
    );
};

export default SubscriptionActions;
