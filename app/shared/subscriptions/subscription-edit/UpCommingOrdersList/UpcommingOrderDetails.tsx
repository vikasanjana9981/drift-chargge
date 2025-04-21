import { Box, Flex, Text, Title } from "rizzui";
import { BillingCycleNode } from "app/types/subscription/subscriptionQueryTypes";
import { useAtom } from "jotai";
import { shopObject } from "app/states/shopAtom";
import { calculateTotalDiscountedPrice, extractNumericId, formatPrice } from "app/packages/utils/shopifyIdUtils";
import OrderItem from "./OrderItem";
import ShippingDetails from "./ShippingDetails";

const UpcommingOrderDetails = ({ details }: { details: BillingCycleNode }) => {
    const [shop] = useAtom(shopObject);
    const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
    
    const { sourceContract: { lines: { edges }, deliveryMethod, deliveryPrice, customer } } = details;
    
    const formatedDeliveryPrice = formatPrice(deliveryPrice?.amount || 0, moneyWithCurrencyFormat);
    const totalPrice = calculateTotalDiscountedPrice(details.sourceContract.lines);
    const formatedTotalPrice = formatPrice(totalPrice, moneyWithCurrencyFormat);
    
    const { displayName, addressesV2 } = customer;
    const address = addressesV2?.edges?.[0]?.node;
    const addressId = extractNumericId(address?.id || "");

    return (
        <Flex className="w-full">
            {/* Order Summary Section */}
            <Flex className="w-[70%]" direction="col">
                <Box className="rounded-[10px] border border-muted w-full p-3 mb-2">
                    <Title as="h6" className="text-md font-semibold mb-3">Summary</Title>
                    <Flex direction="col">
                        {edges.map((edge, index) => (
                            <OrderItem key={index} node={edge.node} moneyWithCurrencyFormat={moneyWithCurrencyFormat} />
                        ))}
                        <hr className="my-2 text-gray-800 w-full" />
                        <Box className="flex justify-between w-full">
                            <Text className="text-sm">Shipping</Text>
                            <Text className="text-sm">{deliveryMethod?.shippingOption?.title}</Text>
                            <Text className="text-sm">{formatedDeliveryPrice}</Text>
                        </Box>
                        <hr className="my-2 text-gray-800 w-full" />
                        <Box className="flex justify-between w-full">
                            <Text className="text-sm font-bold">Total</Text>
                            <Text className="text-sm font-bold">{formatedTotalPrice}</Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex>

            {/* Shipping Address Section */}
            <Flex className="w-[30%]">
                <ShippingDetails address={address} displayName={displayName} addressId={addressId} />
            </Flex>
        </Flex>
    );
};

export default UpcommingOrderDetails;
