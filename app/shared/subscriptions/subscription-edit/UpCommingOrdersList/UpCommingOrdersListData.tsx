import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import UpCommingOrderItem from "./UpCommingOrderItem";
import { OtherAactionsUpCommingOrders } from "app/types/subscription/subscriptionQueryTypes";
interface UpCommingOrdersListDataProps {
    OtherAactions: OtherAactionsUpCommingOrders
}
const UpCommingOrdersListData: React.FC<UpCommingOrdersListDataProps> = ({ OtherAactions }) => {
    const [subscriptionContract] = useAtom(subscriptionContractAtom);
    if (!subscriptionContract) return null;
    const { edges } = subscriptionContract.subscriptionBillingCycles;
    const unbilledCycles = edges.filter(edge => edge.node.status === 'UNBILLED');
    return (
        <div className="space-y-4">
            {unbilledCycles.map((edge, index) => (
                <UpCommingOrderItem
                    key={index}
                    billingCycle={edge.node}
                    OtherAactions={OtherAactions}
                />
            ))}
        </div>
    );
};

export default UpCommingOrdersListData;
