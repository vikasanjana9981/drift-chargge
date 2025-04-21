import SubscriptionDetailsHeader from "./SubscriptionDetailsHeader"
import { Box } from "rizzui";
import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import SubscriptionLineItems from "./SubscripitionLineItems";

const SubscriptionDetails = () => {
    const [subscriptionContract] = useAtom(subscriptionContractAtom);

    if (!subscriptionContract) {
        return null; // Handle the case where subscriptionContract is undefined
    }

    return (
        <div className="my-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted lg:gap-y-6">
            <SubscriptionDetailsHeader />
            <Box className="text-sm text-gray-600 w-full">
                <SubscriptionLineItems />
            </Box>
        </div>
    )
}

export default SubscriptionDetails