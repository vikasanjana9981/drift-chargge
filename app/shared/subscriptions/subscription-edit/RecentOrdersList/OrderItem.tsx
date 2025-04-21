import { Box, Text } from "rizzui";
import { formatPrice } from "app/packages/utils/shopifyIdUtils";
import { LineItemNode } from "app/types/subscription/subscriptionQueryTypes";

const OrderItem = ({ node, moneyWithCurrencyFormat }: { node: LineItemNode, moneyWithCurrencyFormat: string }) => {
    const formattedPrice = formatPrice(node.originalTotalSet.presentmentMoney.amount, moneyWithCurrencyFormat);

    return (
        <Box className="w-full flex gap-4">
            <img
                src={node.variant?.image?.url || node?.product?.featuredMedia?.preview?.image?.url || ""}
                alt={node.title}
                className="w-12 h-12 object-cover rounded-md"
            />
            <div className="flex-1">
                <Text className="text-sm font-semibold">{node.title}</Text>
                <Text className="text-sm text-gray-400">{node.variantTitle}</Text>
                <Text className="text-sm text-gray-400">SKU: {node.sku}</Text>
            </div>
            <div className="text-right">
                <Text>{node.quantity} x {formattedPrice}</Text>
            </div>
        </Box>
    );
};

export default OrderItem;
