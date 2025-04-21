import { extractNumericId } from 'app/packages/utils/shopifyIdUtils';
import { SubscriptionContractSingleNode } from 'app/types/subscription/subscriptionQueryTypes';
import { Box, Flex, Text, Title } from "rizzui";
import SubscriptionStatusBadge from './SubscriptionStatusBadge';
import { useAtom } from 'jotai';
import { subscriptionContractAtom } from 'app/states/subscriptionContractAtom';


const SubscriptionTopBlock = () => {
    const [subscriptionContract] = useAtom(subscriptionContractAtom);

    if (!subscriptionContract) {
        return null; // Handle the case where subscriptionContract is undefined
    }

    const { status, customer: { displayName }, id } = subscriptionContract;
    const numbericSubscriptionId = extractNumericId(id);
    return (
        <Flex direction="col" gap="0">
            <Box className="flex gap-3">
                <Title className="text-md">Subscription #{numbericSubscriptionId}</Title>
                <SubscriptionStatusBadge status={status} />
            </Box>
            <Text className="text-sm text-primary">{displayName}</Text>
        </Flex>
    )
}

export default SubscriptionTopBlock