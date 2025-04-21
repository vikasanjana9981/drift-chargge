import { useAtom } from "jotai";
import { shopObject } from "app/states/shopAtom";
import { BillingAttempts } from "app/types/subscription/subscriptionQueryTypes";
import RecentOrderItem from "./RecentOrderItem";

const RecentOrdersListData = ({ billingAttempts }: { billingAttempts: BillingAttempts }) => {
    const { edges } = billingAttempts;
    const [shop] = useAtom(shopObject);
    const { currencyFormats: { moneyWithCurrencyFormat } } = shop;

    return (
        <div className="space-y-4">
            {edges.map((edge, index) => (
                <RecentOrderItem key={index} billingAttempt={edge.node} moneyWithCurrencyFormat={moneyWithCurrencyFormat} />
            ))}
        </div>
    );
};

export default RecentOrdersListData;
