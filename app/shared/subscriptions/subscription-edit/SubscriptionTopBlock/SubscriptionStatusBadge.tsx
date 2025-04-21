import { SubscriptionContractSubscriptionStatus } from "app/types/subscription/subscriptionQueryTypes";
import { Badge, Box, Text } from "rizzui";
const SubscriptionStatusBadge = ({
    status
}: {
    status: SubscriptionContractSubscriptionStatus
}) => {
    // Map status to badge colors
    const statusColors: Record<SubscriptionContractSubscriptionStatus, string> = {
        [SubscriptionContractSubscriptionStatus.ACTIVE]: "success",
        [SubscriptionContractSubscriptionStatus.CANCELLED]: "danger",
        [SubscriptionContractSubscriptionStatus.EXPIRED]: "gray",
        [SubscriptionContractSubscriptionStatus.FAILED]: "warning",
        [SubscriptionContractSubscriptionStatus.PAUSED]: "info",
    };
    return (
        <Box className='flex gap-1 items-center'>
            <Badge renderAsDot color={statusColors[status] as any} />
            <Text className='capitalize'>{status}</Text>
        </Box>
    )
}

export default SubscriptionStatusBadge