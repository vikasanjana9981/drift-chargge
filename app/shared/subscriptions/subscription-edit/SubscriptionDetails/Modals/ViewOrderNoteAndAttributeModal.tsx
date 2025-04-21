import { useEffect, useState } from "react";
import { FaHashtag, FaXmark } from "react-icons/fa6";
import {
    Modal,
    Button,
    Title,
    Text,
    ActionIcon,
    Input,
    Password,
    Checkbox,
    Flex,
    Select,
    Loader,
    Box,
} from "rizzui";

import toast from "react-hot-toast";
import { useFetcher } from "@remix-run/react";
import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import CopyToClipboard from "app/shared/CopyToClipboard";
import { Address } from "app/types/subscription/subscriptionQueryTypes";
import { extractNumericId } from "app/packages/utils/shopifyIdUtils";
import EditAttrModal from "./EditAttrModal";
import EditOrderNoteModal from "./EditOrderNoteModal";

type ViewOrderNoteAndAttributeModalProp = {
    modalState: boolean,
    setModalState: (state: boolean) => void
    shippingAddress?: Address;
    customerAddress?: Address;
}

const ViewOrderNoteAndAttributeModal = ({
    modalState,
    setModalState,
    shippingAddress,
    customerAddress
}: ViewOrderNoteAndAttributeModalProp) => {
    const addressId = customerAddress?.id
    const adressNumericId = extractNumericId(addressId || '');
    const [subscriptionContract] = useAtom(subscriptionContractAtom);
    if (!subscriptionContract) return null;
    const { customAttributes, note } = subscriptionContract
    const [isEditAttrModalOpen, setIsEditAttrModalOpen] = useState(false);
    const [isEditOrderNoteModalOpen, setEditOrderNoteModalOpen] = useState(false);

    return (
        <Modal isOpen={modalState} onClose={() => setModalState(false)} containerClassName="min-w-[525px] max-h-[400px] overflow-y-auto">
            <div className="m-auto px-7 pt-6 pb-8">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Address details</Title>
                    <ActionIcon size="sm" variant={"text" as any} onClick={() => setModalState(false)}>
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>
                <div className="[&_label>span]:font-medium">
                    <Flex direction="col" className="w-full">
                        <Box>
                            <Title as="h6" className="text-md font-semibold uppercase text-[#848BD4] flex items-center gap-1">
                                <FaHashtag />
                                Address ID
                            </Title>
                            <Text className="flex items-center gap-2 text-sm ms-3 mt-2">#{adressNumericId}
                                <CopyToClipboard text={adressNumericId} className="" />
                            </Text>
                        </Box>
                        <hr className="w-full col-span-1" />

                        <Box className="w-full">
                            <Box className="flex w-full justify-between">
                                <Title as="h6" className="text-md font-semibold uppercase text-[#848BD4] flex items-center gap-1">
                                    <FaHashtag />
                                    Order Attributes
                                </Title>

                                <Button
                                    variant={"text" as any}
                                    className="font-bold text-primary"
                                    onClick={() => setIsEditAttrModalOpen(true)}
                                >
                                    Edit
                                </Button>
                            </Box>

                            <Box className="ms-3 mt-2 space-y-1 w-full">
                                {customAttributes && customAttributes.length > 0 ? (
                                    customAttributes.map((attr, index) => (
                                        <Text key={index} className="flex items-center gap-2 text-sm">
                                            <span className="font-semibold">{attr.key}:</span> {attr.value}
                                        </Text>
                                    ))
                                ) : (
                                    <Text className="text-sm">None</Text>
                                )}
                            </Box>
                        </Box>

                        <hr className="w-full col-span-1" />

                        <Box className="w-full">
                            <Box className="flex w-full justify-between">
                                <Title as="h6" className="text-md font-semibold uppercase text-[#848BD4] flex items-center gap-1">
                                    <FaHashtag />
                                    Order Note
                                </Title>

                                <Button
                                    variant={"text" as any}
                                    className="font-bold text-primary"
                                    onClick={() => setEditOrderNoteModalOpen(true)}
                                >
                                    Edit
                                </Button>
                            </Box>

                            <Box className="ms-3 mt-2 space-y-1 w-full">
                                <Text className="text-sm">{note ? note : 'None'}</Text>
                            </Box>
                        </Box>
                    </Flex>
                </div>
            </div>
            <EditAttrModal
                isEditAttrModalOpen={isEditAttrModalOpen}
                setIsEditAttrModalOpen={setIsEditAttrModalOpen}
                customAttributes={customAttributes}
            />
            <EditOrderNoteModal
                isEditOrderNoteModalOpen={isEditOrderNoteModalOpen}
                setEditOrderNoteModalOpen={setEditOrderNoteModalOpen}
                orderNoteDefault={note}
            />

        </Modal>
    )
}


export default ViewOrderNoteAndAttributeModal