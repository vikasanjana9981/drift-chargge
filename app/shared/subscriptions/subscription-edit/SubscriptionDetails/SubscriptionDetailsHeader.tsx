import { SubscriptionContractSingleNode } from "app/types/subscription/subscriptionQueryTypes"
import { Box, Flex, Text, Button } from "rizzui";
import { FaLocationDot, FaRegCreditCard, FaTag } from "react-icons/fa6";
import SubscriptionActions from "./SubscriptionActions";
import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import PaymentMethodButton from "./PaymentMethodButton";
import DiscountButton from "./DiscountButton";
import UpdatePaymentMethodModal from "./Modals/UpdatePaymentMethodModal";
import { useState } from "react";
import AddDiscountModal from "./Modals/AddDiscountModal";

const SubscriptionDetailsHeader = () => {
    const [subscriptionContract] = useAtom(subscriptionContractAtom);
    const [isUpdatePaymentMethodModalOpen, setIsUpdatePaymentMethodModalOpen] = useState(false);
    const [isAddDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
    if (!subscriptionContract) return null;
    const { customer, customerPaymentMethod, discounts, deliveryMethod: { address } } = subscriptionContract;
    if (!address) return null;

    return (
        <Flex direction="col" gap="2" className="rounded-lg">
            <Box className="flex gap-2 text-lg justify-between w-full p-3 [&>div:nth-child(3)]:hidden">
                <Box>
                    <Box className="flex gap-2">
                        <FaLocationDot className="mt-1" />
                        <Box>

                            {/* Address 1 & 2 */}
                            {address.address1 && <Text className="font-bold">{address.address1}</Text>}
                            {address.address2 && <Text className="font-bold">{address.address2}</Text>}

                            {/* City, State, Country, ZIP */}
                            {(address.city || address.province || address.country || address.zip) && (
                                <Text className="font-bold">
                                    {[address.city, address.province, address.country]
                                        .filter(Boolean)
                                        .join(", ")}{" "}
                                    {address.zip ? `- ${address.zip}` : ""}
                                </Text>
                            )}
                            {/* Company */}
                            {address.company && <Text className="font-bold">{address.company}</Text>}
                            {/* Phone */}
                            {address.phone && <Text className="font-bold">📞 {address.phone}</Text>}
                        </Box>
                    </Box>

                    <Box className="mt-3 flex gap-4">
                        {customerPaymentMethod && (
                            <PaymentMethodButton
                                brand={customerPaymentMethod.instrument.brand}
                                lastDigits={customerPaymentMethod.instrument.lastDigits}
                                onClick={() => setIsUpdatePaymentMethodModalOpen(true)}
                            />
                        )}
                        <DiscountButton
                            discountTitle={discounts?.edges?.[0]?.node?.title}
                            onClick={() => setIsDiscountModalOpen(true)}
                        />
                    </Box>
                </Box>
                <SubscriptionActions customer={customer} />
                <UpdatePaymentMethodModal
                    modalState={isUpdatePaymentMethodModalOpen}
                    setModalState={setIsUpdatePaymentMethodModalOpen}
                    customer={customer}
                    activePaymentMethod={customerPaymentMethod}
                />
                <AddDiscountModal
                    modalState={isAddDiscountModalOpen}
                    setModalState={setIsDiscountModalOpen}
                    discounts={discounts}
                />

            </Box>
        </Flex>
    );
};

export default SubscriptionDetailsHeader;