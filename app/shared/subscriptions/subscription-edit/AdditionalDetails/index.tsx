import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import { Box, Button, Flex, Text, Title } from "rizzui";
import type { Customer, PaymentMethod } from "app/types/subscription/subscriptionQueryTypes";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { useState } from "react";
import CopyToClipboard from "app/shared/CopyToClipboard";
import { Link } from "@remix-run/react";
import { extractNumericId, formatDate } from "app/packages/utils/shopifyIdUtils";
import ShippingDetails from "../RecentOrdersList/ShippingDetails";

const AdditionalDetails = () => {
    const [subscriptionContract] = useAtom(subscriptionContractAtom);

    console.log('subscriptionContract', subscriptionContract)

    if (!subscriptionContract) return null;

    const { displayName, addressesV2 } = subscriptionContract.customer;
    const address = addressesV2?.edges?.[0]?.node;
    const addressId = extractNumericId(address?.id || "");
    const shippingAddress = subscriptionContract.deliveryMethod.address
    return (
        <Flex direction="col">
            <Flex gap="0" className="flex w-full cursor-pointer flex-col rounded-[10px] border border-muted">
                <div className="px-4 mt-4">
                    <CustomerDetails customer={subscriptionContract.customer} />
                </div>
                <hr className="w-full" />
                <div className="px-4 mt-4">
                    <ShippingDetails address={shippingAddress} displayName={shippingAddress.name || ''} addressId={addressId} className="" />
                    <Button
                        as="span"
                        className="text-[#2e3685] p-0 font-bold"
                        variant={"text" as any}
                    >Edit Address</Button>
                </div>
                <hr className="w-full" />
                <div className="px-4 w-full mt-4">
                    <PaymentMethod customerPaymentMethod={subscriptionContract.customerPaymentMethod} />
                </div>
            </Flex>
            <OtherDetails />
        </Flex>

    );
};


const OtherDetails = () => {
    const [subscriptionContract] = useAtom(subscriptionContractAtom);
    if (!subscriptionContract) return null;
    const { id, customer, lines, createdAt } = subscriptionContract;
    const { productId, variantId } = lines.edges[0]?.node;
    const subscriptionId = extractNumericId(id);
    const customerId = extractNumericId(customer?.id || '')
    const productIdNumeric = extractNumericId(productId || '');
    const variantIdNumeric = extractNumericId(variantId || '');
    const formatedDate = formatDate(createdAt || '', false);
    return (
        <Flex gap="3" className="flex w-full cursor-pointer flex-col rounded-[10px] border border-muted p-4">
            <Box>
                <Title as="h6" className="text-md font-semibold uppercase text-[#848BD4]">Subscription ID</Title>
                <Text className="flex items-center gap-2 text-sm">#{subscriptionId} <CopyToClipboard text={subscriptionId} className="" /></Text>
            </Box>
            <Box>
                <Title as="h6" className="text-md font-semibold uppercase text-[#848BD4]">Customer ID</Title>
                <Text className="flex items-center gap-2 text-sm">#{customerId} <CopyToClipboard text={customerId} className="" /></Text>
            </Box>
            <Box>
                <Title as="h6" className="text-md font-semibold uppercase text-[#848BD4]">Product ID</Title>
                <Text className="flex items-center gap-2 text-sm">#{productIdNumeric} <CopyToClipboard text={productIdNumeric} className="" /></Text>
            </Box>
            <Box>
                <Title as="h6" className="text-md font-semibold uppercase text-[#848BD4]">Variant ID</Title>
                <Text className="flex items-center gap-2 text-sm">#{variantIdNumeric} <CopyToClipboard text={variantIdNumeric} className="" /></Text>
            </Box>

            <Box>
                <Title as="h6" className="text-md font-semibold uppercase text-[#848BD4]">Created Date</Title>
                <Text className="flex items-center text-sm">{formatedDate}</Text>
            </Box>
        </Flex>
    )
}

const PaymentMethod = ({
    customerPaymentMethod
}: {
    customerPaymentMethod: PaymentMethod
}) => {
    const { instrument: { brand, lastDigits, expiryMonth, expiryYear } } = customerPaymentMethod
    return (
        <Flex gap="1" align="start" direction="col">
            <Title as="h6" className="text-md font-semibold uppercase">Payment Method</Title>
            <div className="flex">
                <Text className="capitalize">{brand}</Text>
                <Text>••••{lastDigits}</Text>
            </div>
            <Text className="text-sm">Expires {expiryMonth}/{expiryYear}</Text>
            <Button
                as="span"
                className="text-[#2e3685] p-0 font-bold"
                variant={"text" as any}
            >Update Payment Method</Button>
        </Flex>
    )
}

const CustomerDetails = ({
    customer
}: {
    customer: Customer
}) => {
    const { displayName, email } = customer
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };
    return (
        <Flex direction="col" gap="1">
            <Title as="h6" className="text-md font-semibold uppercase">Customer</Title>
            <Text className="text-primary">{displayName}</Text>
            <Text className="text-black">
                {email}
                <CopyToClipboard text={email} className="mt-3" />
            </Text>
            <Link to={'/'} target="_blank" className="my-3">View in Shopify</Link>
        </Flex>
    )
}

export default AdditionalDetails;
