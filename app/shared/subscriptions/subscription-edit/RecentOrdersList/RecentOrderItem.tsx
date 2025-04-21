import { Accordion, Badge, Box, Flex, Text } from "rizzui";
import { FaChevronDown, FaShopify } from "react-icons/fa6";
import { formatDate, formatPrice } from "app/packages/utils/shopifyIdUtils";
import RecentOrderDetails from "./RecentOrderDetails";
import { BillingAttempt } from "app/types/subscription/subscriptionQueryTypes";

interface RecentOrderItemProps {
    billingAttempt: BillingAttempt;
    moneyWithCurrencyFormat: string;
}

const RecentOrderItem: React.FC<RecentOrderItemProps> = ({ billingAttempt, moneyWithCurrencyFormat }) => {
    const formattedDate = formatDate(billingAttempt.createdAt, false);
    const formattedTotalPrice = formatPrice(billingAttempt.order.currentTotalPriceSet.presentmentMoney.amount, moneyWithCurrencyFormat);
    const { order, errorCode, errorMessage } = billingAttempt;
    return (
        <Accordion className="border-b last-of-type:border-b-0">
            <Accordion.Header>
                {({ open }) => (
                    <div className="flex gap-3 w-full cursor-pointer items-center justify-between py-2 text-xl font-semibold">
                        <FaChevronDown className={`h-3 w-3 transform transition-transform duration-300 ${open ? "rotate-0" : "-rotate-90"}`} />
                        <Flex justify="between" align="center">
                            <Box>
                                <Text className="text-sm">{formattedDate}</Text>
                            </Box>
                            <Box className="flex items-center gap-2">
                                <FaShopify className="text-primary" />
                                <Text className="text-sm text-primary">{order.name}</Text>
                            </Box>
                            <Box>
                                <Text className="text-sm">{formattedTotalPrice}</Text>
                            </Box>
                            {
                                errorCode == null ? (
                                    <Box className="flex items-center gap-2">
                                        <Badge renderAsDot color="success" />
                                        <Text className="text-sm">Success</Text>
                                    </Box>
                                ) : (
                                    <Box className="flex items-center gap-2">
                                        <Badge renderAsDot color="danger" />
                                        <Text className="text-sm">{errorMessage}</Text>
                                    </Box>
                                )
                            }
                        </Flex>
                    </div>
                )}
            </Accordion.Header>
            <Accordion.Body className="mt-3">
                <RecentOrderDetails details={order} />
            </Accordion.Body>
        </Accordion>
    );
};

export default RecentOrderItem;
