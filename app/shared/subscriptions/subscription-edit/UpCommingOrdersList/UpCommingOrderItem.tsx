import { Accordion, Badge, Box, Flex, Text } from "rizzui";
import { FaChevronDown } from "react-icons/fa6";
import { formatDate } from "app/packages/utils/shopifyIdUtils";
import OrdersActions from "./OrdersActions";
import UpcommingOrderDetails from "./UpcommingOrderDetails";
import { OtherAactionsUpCommingOrders } from "app/types/subscription/subscriptionQueryTypes";

interface UpCommingOrderItemProps {
    billingCycle: any;
    OtherAactions: OtherAactionsUpCommingOrders
}

const UpCommingOrderItem: React.FC<UpCommingOrderItemProps> = ({ billingCycle, OtherAactions }) => {
    const billingAttemptExpectedDateFormatted = formatDate(billingCycle.billingAttemptExpectedDate, false);

    return (
        <Accordion className="border-b last-of-type:border-b-0">
            <Accordion.Header>
                {({ open }) => (
                    <div className="flex gap-3 w-full cursor-pointer items-center justify-between py-2 text-xl font-semibold">
                        <FaChevronDown
                            className={`h-3 w-3 transform transition-transform duration-300 ${open ? "rotate-0" : "-rotate-90"}`}
                        />
                        <Flex justify="between" align="center">
                            <Box>
                                <Text className="text-sm">{billingAttemptExpectedDateFormatted}</Text>
                            </Box>
                            <Box className="flex items-center gap-2">
                                <Badge renderAsDot color="info" />
                                <Text className="text-sm">Queued</Text>
                            </Box>
                            <OrdersActions
                                OtherAactions={OtherAactions}
                                billingCycle={billingCycle}
                            />
                        </Flex>
                    </div>
                )}
            </Accordion.Header>
            <Accordion.Body>
                <UpcommingOrderDetails details={billingCycle} />
            </Accordion.Body>
        </Accordion>
    );
};

export default UpCommingOrderItem;
